import { Cormorant_Garamond, Inter } from "next/font/google";
import "../styles.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Uspallata Bodegón | Tradición porteña",
  description:
    "Uspallata Bodegón, una experiencia porteña contemporánea con sabores clásicos, reservas, carta visual y delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
