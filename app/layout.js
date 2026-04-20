import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/globals.scss";
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Douaa Chemnane | Full Stack Developer Portfolio",
  description:
    "Premium personal portfolio of Douaa Chemnane, Full Stack Developer and Automation Engineer building scalable systems and elegant digital experiences.",
  keywords: [
    "Douaa Chemnane",
    "Portfolio",
    "Full Stack Developer",
    "Automation Engineer",
    "Next.js",
    "Spring Boot",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakarta.className}>
        {children}
        <ToastContainer theme="colored" position="bottom-right" />
      </body>
    </html>
  );
}