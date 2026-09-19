import { encryptPayload, decryptPayload } from "../utils/encryption";

// const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";
const API_URL = import.meta.env.REACT_APP_API_URL || "https://avtaran.onrender.com";

// Ensures concurrent 401s only trigger ONE /refresh call, not one per
// in-flight request. Every caller awaits the same promise.
let refreshPromise = null;

const doRefresh = async () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Refresh failed");
        return true;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

const apiRequest = async (endpoint, options = {}, _isRetry = false) => {
  const isFormData = options.body instanceof FormData;

  let body = options.body;

  // Encrypt JSON bodies before sending. Harmless to do for every
  // non-FormData request — the backend's decryptRequest middleware is
  // mounted globally and only acts when { encrypted: true } is present,
  // so unprotected routes (login, contact form, etc.) decrypt it
  // straight back to the original plain object and continue as normal.
  if (!isFormData && typeof body === "string") {
    try {
      const payload = await encryptPayload(JSON.parse(body));
      body = JSON.stringify({ encrypted: true, payload });
    } catch (err) {
      console.error("Request encryption failed:", err.message);
      // Fall back to sending the original unencrypted body rather than
      // hard-failing the request — decryptRequest only decrypts when
      // `encrypted: true` is present, so a plain body still works for
      // any route that isn't a strict encrypted-only endpoint.
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    body,

    credentials: "include",

    headers: {
      ...(isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),

      ...(options.headers || {}),
    },
  });

  // 304 Not Modified: no body to parse, not an error — caller decides what to do.
  if (response.status === 304) {
    return { notModified: true, status: 304 };
  }

  let data;

  try {
    data = await response.json();
  } catch {
    data = {
      success: false,
      message: "Invalid server response.",
    };
  }

  // Transparently decrypt encrypted responses (currently: /api/admin/*).
  if (data?.encrypted && data?.payload) {
    try {
      data = await decryptPayload(data.payload);
    } catch (err) {
      console.error("Response decryption failed:", err.message);
      data = {
        success: false,
        message: "Unable to decrypt server response.",
      };
    }
  }

  if (!response.ok) {
    // Access token expired (not invalid, not missing) — try one silent
    // refresh, then retry the original request exactly once.
    if (
      response.status === 401 &&
      data?.code === "TOKEN_EXPIRED" &&
      !_isRetry &&
      endpoint !== "/api/auth/refresh"
    ) {
      try {
        await doRefresh();
        return apiRequest(endpoint, options, true);
      } catch {
        window.dispatchEvent(new CustomEvent("auth:expired"));
        const error = new Error("Session expired. Please log in again.");
        error.status = 401;
        error.code = "SESSION_EXPIRED";
        throw error;
      }
    }

    // Any other auth failure (invalid token, no token, or a failed
    // retry) — surface it so the caller/router can redirect to login.
    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent("auth:expired"));
    }

    const error = new Error(data?.message || "Something went wrong.");
    error.status = response.status;
    error.code = data?.code;
    throw error;
  }

  return { ...data, etag: response.headers.get("ETag") || null };
};

// ==============================
// PUBLIC
// ==============================

export const submitContact = (formData) =>
  apiRequest("/api/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });

export const submitCareerApplication = (formData) =>
  apiRequest("/api/careers/apply", {
    method: "POST",
    body: formData,
  });

// ==============================
// ADMIN AUTH
// ==============================

export const adminLogin = (credentials) =>
  apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const adminLogout = () =>
  apiRequest("/api/auth/logout", {
    method: "POST",
  });

export const getAdminProfile = () => apiRequest("/api/admin/profile");

export const changeAdminPassword = (payload) =>
  apiRequest("/api/admin/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

// ==============================
// ADMIN DASHBOARD
// ==============================

// Pass the last-known ETag to get a cheap 304 when nothing has changed.
export const getAdminDashboard = (etag) =>
  apiRequest("/api/admin/dashboard", {
    headers: etag ? { "If-None-Match": etag } : {},
  });

// ==============================
// CONTACTS
// ==============================

export const getContacts = (params = {}) => {
  const query = new URLSearchParams(params);

  return apiRequest(`/api/admin/contacts?${query.toString()}`);
};

export const getContact = (id) => apiRequest(`/api/admin/contacts/${id}`);

export const updateContactStatus = (id, status, extra = {}) =>
  apiRequest(`/api/admin/contacts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, ...extra }),
  });

export const deleteContact = (id) =>
  apiRequest(`/api/admin/contacts/${id}`, {
    method: "DELETE",
  });

// ==============================
// CAREER APPLICATIONS
// ==============================

export const getCareerApplications = (params = {}) => {
  const query = new URLSearchParams(params);

  return apiRequest(`/api/admin/careers?${query.toString()}`);
};

export const getCareerApplication = (id) =>
  apiRequest(`/api/admin/careers/${id}`);

export const updateCareerStatus = (id, status, extra = {}) =>
  apiRequest(`/api/admin/careers/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, ...extra }),
  }).then((res) => res.data);

export const deleteCareerApplication = (id) =>
  apiRequest(`/api/admin/careers/${id}`, {
    method: "DELETE",
  });

// ==============================
// RESUME DOWNLOAD
// ==============================

export const getResumeDownloadUrl = (id) =>
  `${API_URL}/api/admin/careers/${id}/resume`;

export { API_URL };