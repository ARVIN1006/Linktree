/**
 * Menghasilkan hash SHA-256 dari string input.
 * @param {string} message - Teks yang akan di-hash (misal: password).
 * @returns {Promise<string>} - String hex dari hash.
 */
export async function hashPassword(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

/**
 * Memverifikasi apakah input cocok dengan hash yang tersimpan.
 */
export async function verifyPassword(input, storedHash) {
  const inputHash = await hashPassword(input);
  return inputHash === storedHash;
}
