import "./globals.css";
// Sửa import font
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Ứng dụng nhận diện đồ vật",
  description: "Ứng dụng nhận diện đồ vật sử dụng Next.js và TensorFlow.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
