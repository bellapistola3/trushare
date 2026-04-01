import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

export default async function FacultyPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: faculty, error: facultyError } = await supabase
    .from('faculties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (facultyError || !faculty) notFound();

  const { data: majors, error: majorsError } = await supabase
    .from('majors')
    .select('*')
    .eq('faculty_id', faculty.id)
    .order('name');

  const logoUrl = FACULTY_LOGOS[slug] ?? null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#003366]/70 hover:text-[#003366] font-medium mb-10 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Начало
        </Link>

        {/* Faculty header — logo + name side by side */}
        <div className="flex items-center gap-6 mb-10 bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6">
          {logoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={logoUrl} alt={faculty.name} className="w-24 h-24 object-contain shrink-0 drop-shadow" />
          ) : (
            <div className="w-24 h-24 shrink-0 rounded-2xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)' }}>
              <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 114 0v5m-4 0h4" />
              </svg>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#003366]/50 mb-1">Факултет</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003366] leading-tight">{faculty.name}</h1>
            {faculty.description && (
              <p className="mt-1 text-sm text-gray-500 max-w-xl">{faculty.description}</p>
            )}
          </div>
        </div>

        {/* Majors */}
        <h2 className="text-lg font-bold text-[#003366] mb-5">Специалности</h2>

        {majorsError && <p className="text-red-500 text-sm">{majorsError.message}</p>}

        {!majorsError && (!majors || majors.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(0,51,102,0.07)' }}>
              <svg className="h-8 w-8 text-[#003366]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-semibold">Все още няма добавени специалности.</p>
            <p className="text-gray-400 text-sm mt-1">Проверете отново по-късно.</p>
          </div>
        )}

        {majors && majors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {majors.map((major) => (
              <Link
                key={major.id}
                href={`/major/${major.id}`}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-start gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                     style={{ background: 'rgba(0,51,102,0.08)' }}>
                  <svg className="h-5 w-5 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800 group-hover:text-[#003366] transition-colors leading-snug">{major.name}</p>
                  {major.degree && (
                    <span className="mt-1.5 inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: '#FFB800', color: '#003366' }}>
                      {major.degree}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
