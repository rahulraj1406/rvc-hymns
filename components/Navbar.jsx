import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white border-b-4 border-[#FF6B00] sticky top-0 z-50 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex flex-col">
                    <span className="text-[#FF6B00] font-bold text-xl leading-tight">
                        🪔 RVC Dublin
                    </span>
                    <span className="text-gray-500 text-xs tracking-wide">
                        Hymn Book
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex gap-6 text-sm font-medium">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-[#FF6B00] transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        href="/hymns"
                        className="text-gray-600 hover:text-[#FF6B00] transition-colors"
                    >
                        Browse Hymns
                    </Link>

                    <a
                        href="https://www.rkmireland.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#FF6B00] transition-colors"
                    >
                        Main Site ↗
                    </a>
                </div>

            </div>
        </nav>
    );
}