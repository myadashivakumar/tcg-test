import "./globals.css";

export const metadata = {
  title: "TCG Community",
  description: "Telugu community portal for families in Pune",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
