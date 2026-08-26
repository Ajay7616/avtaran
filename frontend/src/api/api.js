const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://avtaran.onrender.com";

const apiRequest = async (endpoint, options = {}) => {
  const isFormData =
    options.body instanceof FormData;

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      credentials: "include",

      headers: {
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),

        ...(options.headers || {}),
      },
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    data = {
      success: false,
      message: "Invalid server response.",
    };
  }

  if (!response.ok) {
    const error = new Error(
      data?.message ||
        "Something went wrong."
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

// ==============================
// PUBLIC
// ==============================

export const submitContact = (formData) =>
  apiRequest("/api/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });

export const submitCareerApplication = (
  formData
) =>
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

export const getAdminProfile = () =>
  apiRequest("/api/admin/profile");

export const changeAdminPassword = (
  payload
) =>
  apiRequest("/api/admin/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

// ==============================
// ADMIN DASHBOARD
// ==============================

export const getAdminDashboard = () =>
  apiRequest("/api/admin/dashboard");

// ==============================
// CONTACTS
// ==============================

export const getContacts = (params = {}) => {
  const query = new URLSearchParams(params);

  return apiRequest(
    `/api/admin/contacts?${query.toString()}`
  );
};

export const getContact = (id) =>
  apiRequest(
    `/api/admin/contacts/${id}`
  );

export const updateContactStatus = (
  id,
  status
) =>
  apiRequest(
    `/api/admin/contacts/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  );

export const deleteContact = (id) =>
  apiRequest(
    `/api/admin/contacts/${id}`,
    {
      method: "DELETE",
    }
  );

// ==============================
// CAREER APPLICATIONS
// ==============================

export const getCareerApplications = (
  params = {}
) => {
  const query = new URLSearchParams(params);

  return apiRequest(
    `/api/admin/careers?${query.toString()}`
  );
};

export const getCareerApplication = (
  id
) =>
  apiRequest(
    `/api/admin/careers/${id}`
  );

export const updateCareerStatus = (
  id,
  status
) =>
  apiRequest(
    `/api/admin/careers/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  );

export const deleteCareerApplication = (
  id
) =>
  apiRequest(
    `/api/admin/careers/${id}`,
    {
      method: "DELETE",
    }
  );

// ==============================
// RESUME DOWNLOAD
// ==============================

export const getResumeDownloadUrl = (id) =>
  `${API_URL}/api/admin/careers/${id}/resume`;

export { API_URL };