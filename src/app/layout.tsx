import "./app.css";
import localFont from "next/font/local";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";

const alpino = localFont({
  src: "../Assets/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="min-h-screen bg-yellow-300 text-black">
        <Header />
        <main className="min-h-screen">
          {children}
          {/* <ViewCanvas /> */}
        </main>
      </body>

      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
