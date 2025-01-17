// app/layout.tsx
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

export const metadata = {
  title: "SKELETON",
  description: "DOJ SKELETON",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <main className="">
            {children}
            </main>
       </ThemeProvider>
      </body>
    </html>
  );
}
