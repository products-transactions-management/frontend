# Dashboard Management Frontend

## **Deskripsi Project**
Project ini adalah aplikasi **Dashboard Products dan Transactions Management** berbasis **Vite** dengan **React TypeScript**. Aplikasi ini memungkinkan pengguna untuk mengelola data produk dan transaksi dengan fitur CRUD (Create, Read, Update, Delete), serta menyertakan fitur sorting, filtering, dan searching.

---

## **Fitur Utama**
1. **Dashboard Page**:
   - Ringkasan statistik seperti total produk, total transaksi, dan data penting lainnya.

2. **Product Page**:
   - **Create Product**: Tambahkan data produk baru dengan input **Name**, **Type**, dan **Stock**.
   - **Read Products**: Tampilkan daftar produk dalam tabel.
   - **Update Product**: Edit data produk di halaman terpisah.
   - **Delete Product**: Hapus data produk.
   - **Search**: Cari produk berdasarkan nama atau jenis.
   - **Sort**: Urutkan produk berdasarkan nama (ascending/descending).

3. **Transaction Page**:
   - **Create Transaction**: Tambahkan transaksi dengan input **Product Name**, **Quantity**, dan **Transaction Date**.
   - **Read Transactions**: Tampilkan daftar transaksi dalam tabel dengan nama produk.
   - **Update Transaction**: Edit data transaksi di halaman terpisah.
   - **Delete Transaction**: Hapus data transaksi.
   - **Sort**: Urutkan transaksi berdasarkan tanggal.
   - **Filter**: Filter transaksi berdasarkan rentang tanggal atau jumlah.

---

## **Teknologi yang Digunakan**
- **Vite**: Build tool cepat untuk React.
- **React TypeScript**: Library frontend untuk pengembangan UI modern.
- **Axios**: HTTP client untuk komunikasi dengan backend.
- **Tailwind CSS**: Framework utility-first untuk styling yang cepat dan responsive.
- **React Router**: Navigasi antar halaman.

---

## **Instalasi dan Menjalankan Project**

### **Prasyarat**
- Node.js ≥ 18.x
- NPM atau Yarn

### **Langkah-langkah Instalasi**
1. **Clone Repository**
   ```bash
   git clone https://github.com/products-transactions-management/frontend.git
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Backend URL di .env**
   Copy file `.env.example` ke `.env` di root project
   ```bash
   cp .env.example .env
   ```

   Kemudian, tambahkan konfigurasi berikut di `.env`:
   ```plaintext
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

   Pastikan URL di atas sesuai dengan endpoint backend Anda.

4. **Jalankan Project**
   ```bash
   npm run dev
   ```

5. **Akses Aplikasi**
   - Buka [http://localhost:5173](http://localhost:5173) di browser.

---

## **Keterbatasan UI/UX**
- **Responsiveness**: Saat ini, UI belum sepenuhnya responsive untuk layar kecil atau perangkat mobile.
- **Rekomendasi**: Gunakan layar **laptop** atau **desktop** dengan resolusi minimal **1280x720** untuk UI/UX terbaik.

---

## **API Endpoint Backend**
Aplikasi ini bergantung pada **API Backend** yang memiliki endpoint berikut:

- **Products**:
  - `GET /products` - Ambil semua produk (dengan filtering/sorting menggunakan query parameter).
  - `GET /products/:id` - Ambil detail product.
  - `POST /products` - Tambahkan produk baru.
  - `PUT /products/:id` - Update data produk.
  - `DELETE /products/:id` - Hapus data produk.

- **Transactions**:
  - `GET /transactions` - Ambil semua transaksi (dengan filtering/sorting menggunakan query parameter).
  - `GET /transactions/:id` - Ambil detail transaction.
  - `POST /transactions` - Tambahkan transaksi baru.
  - `PUT /transactions/:id` - Update data transaksi.
  - `DELETE /transactions/:id` - Hapus data transaksi.  
---

## **Catatan Tambahan**
Pastikan backend sudah berjalan sebelum menjalankan aplikasi frontend. Backend API URL dapat disesuaikan di file `.env`.

---

## **Kontak**
- **Mohammad Lukman Aqib** - [LinkedIn](https://www.linkedin.com/in/mazzlookman304/) | [GitHub](https://github.com/mazzlookman)

---

Thanks. ✨