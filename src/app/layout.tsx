import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Providers from "@/components/JotaiProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { SpeedInsights } from '@vercel/speed-insights/next';

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
        <body className={`w-[100vw] h-[100vh] overflow-hidden ${inter.className}`} suppressHydrationWarning>
          <Theme appearance="dark">
          <SessionProvider session={session}>
            <Providers>
              <Suspense fallback={<Loading/>}>
                {children}
              </Suspense>
            </Providers>
          </SessionProvider>
          </Theme>
          <SpeedInsights />
        </body>
      </html>
  )
}
