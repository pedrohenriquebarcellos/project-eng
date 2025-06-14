import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeWrapper } from "@/styles/ThemeWrapper";
import StyledComponentsRegistry from "./registry";
import Header from "./components/header";
import '../styles/globals.css';
import { LoginProvider } from "@/contexts/LoginContext";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maicosoft - Company Dashboard",
  description: "Register and check your companies",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <ThemeWrapper>
            <LoginProvider>
              <Header />
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </LoginProvider>
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
