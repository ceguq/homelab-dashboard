# Homelab Dashboard

Dashboard monitoring homelab dengan React + Vite di frontend dan Node.js + Express di backend.

## Fitur

- Login session dengan `express-session` dan password hash `bcryptjs`.
- Endpoint monitoring terlindungi login.
- Dashboard dark mode dengan sidebar, topbar, metric cards, service monitoring, quick access, dan grafik realtime.
- Monitoring CPU, RAM, disk, temperatur CPU, network RX/TX, uptime, system info, dan status service.
- Error handling saat backend tidak merespons atau service offline.
- Konfigurasi service terpusat di satu file: `backend/src/config/services.js`.

## Kredensial Default

Default untuk development:

```txt
username: admin
password: admin123
```

Untuk penggunaan publik, ganti hash password dan session secret:

```bash
SESSION_SECRET=isi-secret-panjang
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD_HASH=hash-bcrypt-baru
```

Membuat hash bcrypt baru:

```bash
cd backend
node -e "import bcrypt from 'bcryptjs'; console.log(bcrypt.hashSync('password-baru', 12));"
```

## Service Monitoring

Service default:

| Service | Host default | Port |
| --- | --- | --- |
| CasaOS | `192.168.100.80` | `82` |
| Portainer | `192.168.100.80` | `9000` |
| AdGuard Home | `192.168.100.80` | `8081` |
| Nginx Proxy Manager | `192.168.100.80` | `81` |
| Nextcloud | `192.168.100.80` | `8085` |
| Netdata | `192.168.100.80` | `19999` |
| Dashboard Frontend | `127.0.0.1` | `5173` |
| Backend API | `127.0.0.1` | `3001` |

Ubah IP dan port dari:

```txt
backend/src/config/services.js
```

Atau override lewat environment variable:

```bash
HOMELAB_HOST=192.168.100.80
CASAOS_PORT=82
PORTAINER_PORT=9000
DASHBOARD_FRONTEND_HOST=127.0.0.1
DASHBOARD_FRONTEND_PORT=5173
BACKEND_API_HOST=127.0.0.1
BACKEND_API_PORT=3001
```

## Cara Menjalankan Development

Terminal 1:

```bash
cd backend
npm install
npm run dev
```

Backend berjalan di `http://localhost:3001`.

Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di `http://127.0.0.1:5173`.

## Cara Menjalankan Production

Build frontend:

```bash
cd frontend
npm install
npm run build
```

Jalankan backend yang juga akan menyajikan `frontend/dist`:

```bash
cd backend
npm install
npm start
```

PowerShell dengan env aman:

```powershell
$env:SESSION_SECRET="isi-secret-panjang"
$env:HOMELAB_HOST="192.168.100.80"
npm start
```

Buka dashboard dari `http://localhost:3001` atau reverse proxy/Cloudflare Tunnel yang kamu gunakan.

## Endpoint API

Public:

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| POST | `/api/login` | Login dan membuat session |
| POST | `/api/logout` | Logout dan hapus session |
| GET | `/api/auth/check` | Cek status session |

Butuh login:

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| GET | `/api/stats` | CPU, RAM, temperatur, network, uptime |
| GET | `/api/disk` | Ringkasan dan detail disk |
| GET | `/api/services` | Status service homelab |
| GET | `/api/sysinfo` | Hostname, IP, OS, uptime, RAM total, disk total/free/used |
