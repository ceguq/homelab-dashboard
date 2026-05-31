# Server Dashboard

Portal monitoring server pribadi — CasaOS, Netdata, Portainer, dan lainnya.

## Struktur

```
server-dashboard/
├── backend/          ← Node.js + Express + systeminformation
│   ├── server.js
│   └── package.json
└── frontend/         ← React + Vite + Chart.js
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── components/
    │   │   ├── TopBar.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── RealtimeChart.jsx
    │   │   ├── ServiceCard.jsx
    │   │   └── ErrorBanner.jsx
    │   └── hooks/
    │       ├── useStats.js      ← polling CPU/RAM tiap 2 detik
    │       └── useServices.js   ← cek status layanan tiap 10 detik
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Cara menjalankan

### 1. Backend

```bash
cd backend
npm install
npm run dev     # atau: node server.js
```

Backend berjalan di: `http://localhost:3001`

### 2. Frontend (terminal baru)

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di: `http://localhost:5173`

## Endpoint API

| Method | Endpoint           | Deskripsi                          |
|--------|--------------------|------------------------------------|
| GET    | /api/stats         | CPU %, RAM %, uptime (detik)       |
| GET    | /api/services      | Status online/offline tiap layanan |
| GET    | /api/sysinfo       | Hostname, IP, platform             |

## Menambah layanan baru

Edit array `SERVICES` di `backend/server.js`:

```js
{ id: "namaapp", name: "Nama App", port: 1234, icon: "tabler-icon-name", color: "#hexwarna" }
```

Nama icon dari: https://tabler.io/icons

## Pengembangan selanjutnya

- [ ] WebSocket / SSE untuk push data (mengganti polling)
- [ ] Dark/light mode toggle
- [ ] Notifikasi saat layanan offline
- [ ] Autentikasi sederhana (Basic Auth)
- [ ] Tampilkan disk usage
