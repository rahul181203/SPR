import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata = {
  title: 'Inventory',
  description: 'Check the sales data',
}

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth();
  return (
      <html lang="en">
        <body className={`w-[100vw] h-[100vh] ${inter.className}`} suppressHydrationWarning>
          <Theme appearance="dark">
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
          </Theme>
        </body>
      </html>
  )
}
