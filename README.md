# Ứng dụng nhận diện đồ vật

Ứng dụng web giúp nhận diện đồ vật trong hình ảnh sử dụng TensorFlow.js và Next.js

## Tính năng

- 📸 Tải lên hình ảnh từ thiết bị hoặc chụp ảnh trực tiếp từ camera
- 🔍 Nhận diện đồ vật trong hình ảnh với độ chính xác cao
- 🇻🇳 Hiển thị kết quả bằng tiếng Việt
- 📊 Hiển thị tỷ lệ phần trăm độ tin cậy cho mỗi kết quả
- 📝 Lưu trữ lịch sử nhận diện

## Công nghệ sử dụng

- [Next.js](https://nextjs.org/) - Framework React hiện đại
- [TensorFlow.js](https://www.tensorflow.org/js) - Thư viện machine learning cho JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [TypeScript](https://www.typescriptlang.org/) - JavaScript với kiểu dữ liệu tĩnh

## Cài đặt

1. Clone repository:

```bash
git clone https://github.com/your-username/object-detector.git
cd object-detector
```

2. Cài đặt các thư viện:

```bash
npm install
# hoặc
yarn install
```

3. Chạy ứng dụng trên môi trường development:

```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Hướng dẫn sử dụng

1. Chọn phương thức nhập hình ảnh:

   - Nhấn "Tải lên hình ảnh" để chọn file từ thiết bị
   - Hoặc nhấn "Chụp ảnh từ camera" để sử dụng webcam

2. Sau khi hình ảnh đã được tải lên hoặc chụp, nhấn nút "Nhận diện đồ vật"

3. Xem kết quả nhận diện và độ tin cậy của mỗi đối tượng được phát hiện

4. Kiểm tra lịch sử nhận diện ở phần dưới trang

## Triển khai

Ứng dụng có thể được triển khai lên [Vercel](https://vercel.com) một cách dễ dàng:

```bash
npm install -g vercel
vercel login
vercel
```

## Giấy phép

[MIT](LICENSE)
