import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <div className="p-4 lg:p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
