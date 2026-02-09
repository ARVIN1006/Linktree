# Informasi Login

Sistem autentikasi telah berhasil diimplementasikan.

## Akses Admin

Halaman admin (`/admin`) sekarang dilindungi password.

- **URL Login**: `/login` (Otomatis redirect jika membuka admin tanpa auth)
- **Password Default**: `admin`

## Cara Mengganti Password

Buka file `src/context/AppContext.jsx` dan ubah variabel `ADMIN_PASSWORD` (Baris 3).

```javascript
const ADMIN_PASSWORD = 'password_baru_anda';
```
