import Link from "next/link";
import HymnCard from "../components/HymnCard";
import hymns from "../data/hymns.json";

export default function Home() {
  const featuredHymns = hymns.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-orange-50 to-[#FFF8F0] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-4">ॐ</div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#FF6B00] mb-3">
            Devotional Hymn Book
          </h1>

          <p className="text-xl text-gray-600 mb-2">
            Ramakrishna Vedanta Centre Dublin
          </p>

          <p className="text-gray-500 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
            A collection of sacred hymns and devotional songs used in our
            daily worship and celebrations at Éire Vedanta Society.
          </p>

          <Link
            href="/hymns"
            className="inline-block bg-[#FF6B00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#CC4400] transition-colors shadow-md text-sm"
          >
            Browse All Hymns →
          </Link>
        </div>
      </div>

      {/* Featured Hymns */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured Hymns
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredHymns.map((hymn) => (
            <HymnCard key={hymn.id} hymn={hymn} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/hymns"
            className="inline-block border-2 border-[#FF6B00] text-[#FF6B00] px-8 py-3 rounded-full font-semibold hover:bg-[#FF6B00] hover:text-white transition-colors text-sm"
          >
            View All {hymns.length} Hymns →
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About RVC Dublin
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The Ramakrishna Vedanta Centre Dublin is the first branch centre
            of the Ramakrishna Order in Ireland. Located at Nivedita House,
            Mulhuddart, Dublin, we are dedicated to the study of Vedantic
            principles and the message of Sri Ramakrishna and Swami
            Vivekananda.
          </p>

          <a
            href="https://www.rkmireland.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#FF6B00] underline text-sm hover:text-[#CC4400]"
          >
            Visit our main website ↗
          </a>
        </div>
      </div>
    </div>
  );
}