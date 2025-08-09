import "./globals.css";
import { ReactNode, Suspense } from "react";
import Sidebar from "@/components/sidebar";
import { LanguageProvider } from "@/lib/i18n";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 lg:ml-64">
                <div className="p-4 lg:p-8">{children}</div>
              </main>
            </div>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
