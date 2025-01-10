

import "./globals.css";
import { Providers } from "./providers";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className='antialiased'>
          {children}
        </body>
      </Providers>
    </html>
  );
}
