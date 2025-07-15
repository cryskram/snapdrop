import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnapDrop",
  description: "Instant note sharing with no sign-in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
