import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import UploadForm from '@/components/UploadForm';

interface PageProps {
  params: Promise<{ id: string }>;
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

const CATEGORY_STYLES: Record<string, { badge: string }> = {
  'Лекции':           { badge: 'bg-[#003366] text-white' },
  'Упражнения':       { badge: 'bg-emerald-600 text-white' },
  'Изпитни материали':{ badge: 'bg-rose-600 text-white' },
  'Други':            { badge: 'bg-gray-500 text-white' },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('bg-BG', { day: '2-digit', month: 'short', year: 'numeric' });
}

function FileTypeIcon({ url, category }: { url: string; category: string }) {
  const isPdf = /\.pdf($|\?)/i.test(url);
  const isImg = /\.(png|jpe?g|gif|webp|svg)($|\?)/i.test(url);
  if (isPdf) return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50">
      <svg className="h-6 w-6 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/>
      </svg>
    </div>
  );
  if (isImg) return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18V4.5A.75.75 0 0021 3.75H3A.75.75 0 002.25 4.5v15z" />
      </svg>
    </div>
  );
  const color = category === 'Лекції' ? 'text-[#003366]' : category === 'Упражнения' ? 'text-emerald-600' : 'text-gray-500';
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50">
      <svg className={`h-6 w-6 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    </div>
  );
}

export default async function MajorPage({ params }: PageProps) {
  const { id } = await params;

  const { data: major, error: majorError } = await supabase
    .from('majors')
    .select('*, faculties(name, slug)')
    .eq('id', id)
    .single();

  if (majorError || !major) notFound();

  const { data: materials, error: materialsError } = await supabase
    .from('materials')
    .select('*')
    .eq('major_id', id)
    .order('created_at', { ascending: false });

  const faculty = major.faculties as { name: string; slug: string } | null;
  const facultyLogoUrl = faculty ? (FACULTY_LOGOS[faculty.slug] ?? null) : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-[#003366] transition-colors font-medium">Начало</Link>
          <span className="text-gray-300">/</span>
          {faculty && (
            <>
              <Link href={`/faculty/${faculty.slug}`} className="hover:text-[#003366] transition-colors font-medium">
                {faculty.name}
              </Link>
              <span className="text-gray-300">/</span>
            </>
          )}
          <span className="text-[#003366] font-semibold">{major.name}</span>
        </nav>

        {/* Header card — faculty logo + major name */}
        <div className="flex items-center gap-6 mb-10 bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-6">
          {facultyLogoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={facultyLogoUrl} alt={faculty?.name ?? 'Факултет'} className="w-20 h-20 object-contain shrink-0 drop-shadow" />
          ) : (
            <div className="w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)' }}>
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
              </svg>
            </div>
          )}
          <div>
            {faculty && <p className="text-xs font-semibold uppercase tracking-widest text-[#003366]/50 mb-0.5">{faculty.name}</p>}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003366] leading-tight">{major.name}</h1>
            {major.degree && (
              <span className="mt-2 inline-block text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: '#FFB800', color: '#003366' }}>
                {major.degree}
              </span>
            )}
          </div>
        </div>

        {/* Upload form */}
        <UploadForm majorId={id} />

        {/* Materials */}
        <div className="flex items-baseline gap-2 mt-2 mb-6">
          <h2 className="text-lg font-bold text-[#003366]">Материали</h2>
          {materials && materials.length > 0 && (
            <span className="text-sm text-gray-400">({materials.length})</span>
          )}
        </div>

        {materialsError && <p className="text-red-500 text-sm">{materialsError.message}</p>}

        {!materialsError && (!materials || materials.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(0,51,102,0.07)' }}>
              <svg className="h-8 w-8 text-[#003366]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-gray-600 font-semibold">Все още няма качени материали.</p>
            <p className="text-gray-400 text-sm mt-1">Бъди първият, който споделя!</p>
          </div>
        )}

        {materials && materials.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {materials.map((mat) => {
              const style = CATEGORY_STYLES[mat.category] ?? CATEGORY_STYLES['Други'];
              return (
                <div key={mat.id} className="group bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between gap-3">
                    <FileTypeIcon url={mat.file_url} category={mat.category} />
                    <span className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full tracking-wide ${style.badge}`}>
                      {mat.category}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="text-base font-bold text-gray-800 leading-snug line-clamp-2">{mat.title}</p>

                  {/* Date + download */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {mat.created_at ? formatDate(mat.created_at) : '—'}
                    </span>
                    <a
                      href={mat.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)' }}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      Изтегли
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
