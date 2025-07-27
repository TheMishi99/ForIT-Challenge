import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import ModalContextProvider from "@/contexts/ModalContext";
import ModalWrapper from "@/components/ModalWrapper";
import NotificationsContextProvider from "@/contexts/NotificationsContext";
import NotificationsWrapper from "@/components/NotificationsWrapper";
import TasksContextProvider from "@/contexts/TasksContext";

const roboto = Roboto({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "700"] })

export const metadata: Metadata = {
  title: "MISHITASKS",
  description: "Esta es mi solución al challenge de la Academia ForIT. Una aplicación moderna construida con Next.js y TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <TasksContextProvider>
          <NotificationsContextProvider>
            <ModalContextProvider>
              <div id="app" className="flex flex-col min-h-dvh">
                <Header />
                {children}
                <Footer />
              </div>
              <ModalWrapper />
              <NotificationsWrapper />
            </ModalContextProvider>
          </NotificationsContextProvider>
        </TasksContextProvider>
      </body>
    </html>
  );
}
