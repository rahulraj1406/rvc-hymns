import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "RVC Dublin - Hymn Book",
    description: "Devotional hymns of Ramakrishna Vedanta Centre Dublin - Éire Vedanta Society",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-[#FFF8F0] min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}