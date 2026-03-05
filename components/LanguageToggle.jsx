"use client";

export default function LanguageToggle({ currentLang, onToggle, availableLangs = [] }) {
    const allLanguages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिंदी" },
        { code: "ka", label: "ಕನ್ನಡ" },
        { code: "te", label: "తెలుగు" },
        { code: "bn", label: "বাংলা" },
    ];

    const visibleLanguages = allLanguages.filter(
        (lang) => availableLangs.includes(lang.code)
    );

    if (visibleLanguages.length === 0) return null;

    return (
        <div className="flex flex-col items-start gap-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                Select Language
            </p>
            <div className="flex flex-wrap gap-2">
                {visibleLanguages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onToggle(lang.code)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentLang === lang.code
                            ? "bg-[#FF6B00] text-white shadow-md scale-105"
                            : "bg-white text-gray-500 border border-orange-200 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                            }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
            {/*<p className="text-xs text-gray-300 italic">
                More languages coming soon
            </p>*/}
        </div>
    );
}