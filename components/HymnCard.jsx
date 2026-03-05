import Link from "next/link";

export default function HymnCard({ hymn }) {
    return (
        <Link href={`/hymns/${hymn.slug}`}>
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-5 hover:shadow-md hover:border-[#FF6B00] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer h-full">

                <div className="flex items-start gap-3">
                    <span className="bg-[#FF6B00] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[32px] text-center">
                        {hymn.number}
                    </span>
                    <div>
                        <h3 className="font-bold text-gray-800 text-base leading-snug mb-1">
                            {hymn.title}
                        </h3>
                        <p className="text-gray-400 text-sm italic">
                            {hymn.firstLine}
                        </p>
                    </div>
                </div>

            </div>
        </Link>
    );
}