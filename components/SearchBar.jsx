"use client";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                    className="w-5 h-5 text-[#FF6B00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                </svg>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search hymns by name or first line..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-orange-200 bg-white focus:outline-none focus:border-[#FF6B00] text-gray-700 text-sm shadow-sm transition-colors"
            />
        </div>
    );
}