import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">

            <div className="text-7xl mb-6">🪔</div>

            <h1 className="text-4xl font-bold text-gray-800 mb-3">
                Page Not Found
            </h1>

            <p className="text-gray-500 text-lg mb-8">
                The hymn or page you are looking for does not exist.
            </p>

            <div className="flex justify-center gap-4">
                <Link
                    href="/"
                    className="bg-[#FF6B00] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#CC4400] transition-colors"
                >
                    Go Home
                </Link>
                <Link
                    href="/hymns"
                    className="border-2 border-[#FF6B00] text-[#FF6B00] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF6B00] hover:text-white transition-colors"
                >
                    Browse Hymns
                </Link>
            </div>

        </div>
    );
}