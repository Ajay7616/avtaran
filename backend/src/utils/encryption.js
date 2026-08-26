const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

const getKey = () => {
  const key = process.env.API_ENCRYPTION_KEY;

  if (!key) {
    throw new Error(
      "API_ENCRYPTION_KEY is not configured."
    );
  }

  const buffer = Buffer.from(
    key,
    "base64"
  );

  if (buffer.length !== 32) {
    throw new Error(
      "API_ENCRYPTION_KEY must decode to exactly 32 bytes."
    );
  }

  return buffer;
};

// ==============================
// ENCRYPT
// ==============================

const encryptPayload = (payload) => {
  const key = getKey();

  const iv = crypto.randomBytes(
    IV_LENGTH
  );

  const cipher =
    crypto.createCipheriv(
      ALGORITHM,
      key,
      iv
    );

  const plaintext =
    JSON.stringify(payload);

  const encrypted = Buffer.concat([
    cipher.update(
      plaintext,
      "utf8"
    ),
    cipher.final(),
  ]);

  const authTag =
    cipher.getAuthTag();

  // Web Crypto expects ciphertext + authTag
  const encryptedWithTag =
    Buffer.concat([
      encrypted,
      authTag,
    ]);

  return {
    iv: iv.toString("base64"),
    data:
      encryptedWithTag.toString(
        "base64"
      ),
    tagLength: 128,
  };
};

// ==============================
// DECRYPT
// ==============================

const decryptPayload = (
  payload
) => {
  if (
    !payload ||
    !payload.iv ||
    !payload.data
  ) {
    throw new Error(
      "Invalid encrypted payload."
    );
  }

  const key = getKey();

  const iv = Buffer.from(
    payload.iv,
    "base64"
  );

  const encryptedWithTag =
    Buffer.from(
      payload.data,
      "base64"
    );

  if (
    iv.length !== IV_LENGTH
  ) {
    throw new Error(
      "Invalid encryption IV."
    );
  }

  if (
    encryptedWithTag.length <=
    TAG_LENGTH
  ) {
    throw new Error(
      "Invalid encrypted data."
    );
  }

  const authTag =
    encryptedWithTag.subarray(
      encryptedWithTag.length -
        TAG_LENGTH
    );

  const encrypted =
    encryptedWithTag.subarray(
      0,
      encryptedWithTag.length -
        TAG_LENGTH
    );

  const decipher =
    crypto.createDecipheriv(
      ALGORITHM,
      key,
      iv
    );

  decipher.setAuthTag(
    authTag
  );

  const decrypted =
    Buffer.concat([
      decipher.update(
        encrypted
      ),
      decipher.final(),
    ]);

  return JSON.parse(
    decrypted.toString("utf8")
  );
};

module.exports = {
  encryptPayload,
  decryptPayload,
};