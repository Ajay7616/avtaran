const API_ENCRYPTION_KEY =
  import.meta.env.VITE_API_ENCRYPTION_KEY;

const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12;
const TAG_LENGTH = 128;

const getKey = async () => {
  if (!API_ENCRYPTION_KEY) {
    throw new Error(
      "VITE_API_ENCRYPTION_KEY is not configured."
    );
  }

  const keyBytes = base64ToUint8Array(
    API_ENCRYPTION_KEY
  );

  if (keyBytes.length !== 32) {
    throw new Error(
      "Encryption key must be exactly 32 bytes."
    );
  }

  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    {
      name: ALGORITHM,
    },
    false,
    ["encrypt", "decrypt"]
  );
};

const base64ToUint8Array = (base64) => {
  const binary = atob(base64);

  const bytes = new Uint8Array(
    binary.length
  );

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
};

const uint8ArrayToBase64 = (bytes) => {
  let binary = "";

  const chunkSize = 0x8000;

  for (
    let i = 0;
    i < bytes.length;
    i += chunkSize
  ) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, i + chunkSize)
    );
  }

  return btoa(binary);
};

// ==============================
// ENCRYPT
// ==============================

export const encryptPayload = async (payload) => {
  const key = await getKey();

  const iv = crypto.getRandomValues(
    new Uint8Array(IV_LENGTH)
  );

  const plaintext = JSON.stringify(payload);

  const encoded = new TextEncoder().encode(
    plaintext
  );

  const encrypted = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv,
      tagLength: TAG_LENGTH,
    },
    key,
    encoded
  );

  return {
    iv: uint8ArrayToBase64(iv),
    data: uint8ArrayToBase64(
      new Uint8Array(encrypted)
    ),
    tagLength: TAG_LENGTH,
  };
};

// ==============================
// DECRYPT
// ==============================

export const decryptPayload = async (
  payload
) => {
  if (
    !payload ||
    !payload.iv ||
    !payload.data
  ) {
    throw new Error(
      "Invalid encrypted response."
    );
  }

  const key = await getKey();

  const iv = base64ToUint8Array(
    payload.iv
  );

  const encrypted = base64ToUint8Array(
    payload.data
  );

  const decrypted =
    await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv,
        tagLength:
          payload.tagLength || TAG_LENGTH,
      },
      key,
      encrypted
    );

  const plaintext =
    new TextDecoder().decode(decrypted);

  return JSON.parse(plaintext);
};