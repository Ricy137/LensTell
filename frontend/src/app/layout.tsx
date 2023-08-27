import "./globals.css";
import type { Metadata } from "next";
import JotaiProvider from "@/modules/JotaiProvider";
import { ToastRender } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Lens tell",
  description: "What the lens profile tell?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JotaiProvider>
          <>
            <ToastRender />
            {children}
          </>
        </JotaiProvider>
      </body>
    </html>
  );
}
