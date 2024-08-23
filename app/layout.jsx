import { Inter } from "next/font/google";
import "./globals.css";
import WrapperProviders from "@/components/layout/WrapperProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cennik Transporty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <WrapperProviders>{children}</WrapperProviders>
      </body>
    </html>
  );
}
