"use client";

export default function LanguageToggle({ currentLang, onToggle }) {
    const languages = [
        { code: "sa", label: "Sanskrit" },
        { code: "en", label: "English" },
    ];

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex gap-2">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onToggle(lang.code)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentLang === lang.code
                                ? "bg-[#FF6B00] text-white shadow-md"
                                : "bg-white text-gray-500 border border-orange-200 hover:border-[#FF6B00]"
                            }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
            <p className="text-xs text-gray-400 italic">
                More languages coming soon
            </p>
        </div>
    );
}