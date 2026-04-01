import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SearchBar from '@/components/SearchBar';

const FACULTY_LOGOS: Record<string, string> = {
  af:          'https://trakia-uni.bg/wp-content/uploads/2024/10/AF_Faculties-280x280.png',
  vmf:         'https://trakia-uni.bg/wp-content/uploads/2024/10/VMF_Faculties-280x280.png',
  mf:          'https://trakia-uni.bg/wp-content/uploads/2024/10/MF_Faculties-280x280.png',
  pf:          'https://trakia-uni.bg/wp-content/uploads/2024/10/PF_Faculties-280x280.png',
  sf:          'https://trakia-uni.bg/wp-content/uploads/2024/10/SF_Faculties-280x280.png',
  'tf-yambol': '/ftt.png',
  tf:          '/ftt.png',
  mk:          'https://trakia-uni.bg/wp-content/uploads/2024/10/MK_Faculties-280x280.png',
  fh:          'https://trakia-uni.bg/wp-content/uploads/2024/10/FH_Faculties-280x280.png',
};

export default async function Home() {
  console.log("TEST_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  const { data: faculties } = await supabase
    .from('faculties')
    .select('*')
    .order('name');

  return (
    <div className="flex flex-col min-h-full">

      {/* ── HERO / SEARCH ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#002855] via-[#003d80] to-[#0055a4] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight mb-4">
            Намери своите материали
          </h1>
          <p className="text-xl text-white/65 mb-12 max-w-2xl mx-auto leading-relaxed">
            Лекции, конспекти и изпитни материали от всички факултети на{' '}
            <span className="text-white font-semibold">Тракийски университет</span>.
          </p>

          {/* Search bar */}
          <div className="mb-10">
            <SearchBar />
          </div>

          {/* CTA Button */}
          <Link 
            href="#faculties" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#FFB800] text-[#003366] rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            🚀 КАЧИ МАТЕРИАЛ И ПОМОГНИ НА КОЛЕГА
          </Link>
        </div>
      </section>

      {/* ── FACULTIES ─────────────────────────────────────── */}
      <section id="faculties" className="flex-1 bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto">

          <p className="text-center text-xs font-black uppercase tracking-[0.4em] text-[#003366]/30 mb-16">
            Избери факултет, за да започнеш
          </p>

          {faculties && faculties.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {faculties.map((faculty) => {
                const logoUrl = FACULTY_LOGOS[faculty.slug] ?? null;
                return (
                  <Link
                    key={faculty.id}
                    href={'/faculty/' + faculty.slug}
                    className="group relative flex flex-col items-center bg-white rounded-[40px] shadow-sm border border-slate-100 p-4 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_-15px_rgba(0,51,102,0.15)] overflow-hidden"
                  >
                    {/* Faculty logo — Filled almost entire card */}
                    <div className="relative w-full aspect-square flex items-center justify-center p-8 bg-slate-50/50 rounded-[32px] group-hover:bg-white transition-colors duration-500">
                      {logoUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={logoUrl}
                          alt={faculty.name}
                          className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center"
                             style={{ background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)' }}>
                          <svg className="h-32 w-32 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 114 0v5m-4 0h4" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Bottom overlay for name */}
                    <div className="w-full pt-6 pb-4 px-6 text-center">
                      <p className="font-black text-lg text-[#003366] leading-tight group-hover:text-blue-600 transition-colors">
                        {faculty.name}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#003366]/40 uppercase tracking-widest group-hover:text-[#FFB800] transition-colors">
                        Избери материали
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
