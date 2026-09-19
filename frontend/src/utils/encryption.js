// Mirrors backend/utils/encryption.js exactly: AES-256-GCM, 12-byte IV,
// ciphertext+tag combined and base64-encoded, so payloads produced by
// one side decrypt cleanly on the other.

const RAW_KEY = process.env.REACT_APP_API_ENCRYPTION_KEY;

if (!RAW_KEY) {
  console.warn(
    "REACT_APP_API_ENCRYPTION_KEY is not set — encrypted admin requests will fail.",
  );
}

const base64ToBytes = (b64) =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

const bytesToBase64 = (bytes) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)));

let keyPromise = null;

const getKey = () => {
  if (!RAW_KEY) {
    return Promise.reject(new Error("Encryption key not configured."));
  }

  if (!keyPromise) {
    keyPromise = crypto.subtle.importKey(
      "raw",
      base64ToBytes(RAW_KEY),
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"],
    );
  }

  return keyPromise;
};

export const encryptPayload = async (payload) => {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encoded = new TextEncoder().encode(JSON.stringify(payload));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, tagLength: 128 },
    key,
    encoded,
  );

  return {
    iv: bytesToBase64(iv),
    data: bytesToBase64(encrypted), // SubtleCrypto appends the auth tag already
    tagLength: 128,
  };
};

export const decryptPayload = async (payload) => {
  if (!payload || !payload.iv || !payload.data) {
    throw new Error("Invalid encrypted payload.");
  }

  const key = await getKey();
  const iv = base64ToBytes(payload.iv);
  const data = base64ToBytes(payload.data);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv, tagLength: payload.tagLength || 128 },
    key,
    data,
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
};