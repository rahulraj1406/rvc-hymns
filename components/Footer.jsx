export default function Footer() {
  return (
    <footer className="bg-[#FF6B00] text-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div>
            <h3 className="text-xl font-bold mb-1">🪔 RVC Dublin</h3>
            <p className="text-orange-100 text-sm">Ramakrishna Vedanta Centre Dublin</p>
            <p className="text-orange-100 text-sm">Éire Vedanta Society</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-orange-50">Visit Us</h4>
            <p className="text-orange-100 text-sm leading-relaxed">
              Nivedita House<br />
              17 Dromheath Gardens<br />
              Mulhuddart, Dublin D15 E762<br />
              Republic of Ireland
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-orange-50">Contact</h4>
            <p className="text-orange-100 text-sm leading-relaxed">
              rvcdublin@gmail.com<br />
              +353 83 014 1531<br />
              +353 89 456 5917
            </p>
            <p className="mt-3 text-sm underline">
              www.rkmireland.org
            </p>
          </div>

        </div>

        <div className="border-t border-orange-400 mt-8 pt-4 text-center text-orange-100 text-xs">
          © {new Date().getFullYear()} Ramakrishna Vedanta Centre Dublin. All rights reserved.
        </div>

      </div>
    </footer>
  );
}