import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SearchBar from '@/components/SearchBar';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Лекции':            'bg-[#003366] text-white',
  'Упражнения':        'bg-emerald-600 text-white',
  'Изпитни материали': 'bg-rose-600 text-white',
  'Други':             'bg-gray-500 text-white',
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('bg-BG', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  let results: Array<{
    id: string;
    title: string;
    category: string;
    file_url: string;
    created_at: string;
    major_id: string;
    majors?: { name: string; faculties?: { name: string } | null } | null;
  }> = [];

  if (query) {
    const { data } = await supabase
      .from('materials')
      .select('*, majors(name, faculties(name))')
      .ilike('title', `%${query}%`)
      .order('created_at', { ascending: false });
    results = (data as typeof results) ?? [];
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-50 to-blue-50">

      {/* Search hero */}
      <section className="bg-gradient-to-br from-[#002855] via-[#003d80] to-[#0055a4] pt-12 pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/50 text-sm mb-6 text-center">
            {query ? (
              <>Резултати за: <span className="text-white font-semibold">"{query}"</span></>
            ) : (
              'Въведи дума за търсене'
            )}
          </p>
          <SearchBar initialValue={query} />
        </div>
      </section>

      {/* Results */}
      <section className="max-w-5xl mx-auto px-6 py-14">

        {!query && (
          <p className="text-center text-gray-400 text-lg">Въведи заглавие на материал в полето за търсене.</p>
        )}

        {query && results.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-4">
            <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <p className="text-gray-500 text-xl font-semibold">Няма намерени резултати</p>
            <p className="text-gray-400 text-sm">Опитай с различна дума или разгледай факултетите.</p>
            <Link href="/" className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#003366' }}>
              Към началото
            </Link>
          </div>
        )}

        {query && results.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-8 font-medium">
              Намерени <span className="font-bold text-[#003366]">{results.length}</span> материала
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {results.map((mat) => {
                const badgeClass = CATEGORY_STYLES[mat.category] ?? CATEGORY_STYLES['Други'];
                const isPdf = /\.pdf($|\?)/i.test(mat.file_url);
                const major = mat.majors as { name: string; faculties?: { name: string } | null } | null;

                return (
                  <div key={mat.id}
                       className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">

                    {/* Top: icon + badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isPdf ? 'bg-rose-50' : 'bg-gray-50'}`}>
                        {isPdf ? (
                          <svg className="h-6 w-6 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/>
                          </svg>
                        ) : (
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M5.625 3.75H8.25A9 9 0 0117.25 12v6.75H5.625A1.125 1.125 0 014.5 17.625V4.875c0-.621.504-1.125 1.125-1.125z" />
                          </svg>
                        )}
                      </div>
                      <span className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}>
                        {mat.category}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="font-bold text-gray-800 text-base leading-snug line-clamp-2">{mat.title}</p>

                    {/* Breadcrumb: faculty > major */}
                    {major && (
                      <p className="text-xs text-gray-400 leading-snug">
                        {major.faculties?.name && <>{major.faculties.name} › </>}{major.name}
                      </p>
                    )}

                    {/* Date + download */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {mat.created_at ? formatDate(mat.created_at) : '—'}
                      </span>
                      <a href={mat.file_url} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                         style={{ background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)' }}>
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
          </>
        )}
      </section>
    </div>
  );
}
