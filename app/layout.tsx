import { Nunito } from "next/font/google";
import "@/app/globals.css";
import type { ReactNode } from "react";

const nunitoFont = Nunito({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl" className={nunitoFont.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
};

export const metadata = {
  title: "Laravel",
};

export default RootLayout;
