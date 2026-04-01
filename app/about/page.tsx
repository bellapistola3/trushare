import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO BANNER ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#003366] py-24 sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-[#FFB800] text-[#003366] text-sm font-black tracking-[0.2em] uppercase">
            БЕЗПЛАТНО. ЗАВИНАГИ. ОТ СТУДЕНТИ ЗА СТУДЕНТИ.
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
            TrUShare – Дигиталната революция <br className="hidden lg:block" /> на Тракийския университет
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100/80 font-medium max-w-3xl mx-auto leading-relaxed italic">
            "Мисия за свободно знание. Дарение от един студент към хиляди колеги."
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed mb-12">
            TrUShare не е просто уебсайт. Това е <strong>дигитална кауза</strong>, създадена да разруши бариерите пред знанието. 
            Проектът е плод на стотици часове труд и визията на <strong>Христо Димов</strong>, студент по Софтуерно инженерство в Тракийския университет.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 line-height-relaxed">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
              <h2 className="text-2xl font-black text-[#003366] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#FFB800]/20 flex items-center justify-center text-[#003366]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v4m0 4h.01" /></svg>
                </span>
                Философията на Дарението
              </h2>
              <p className="text-slate-600">
                Този проект е напълно <strong>БЕЗПЛАТЕН</strong> и винаги ще остане такъв. Той е моят личен подарък към академичната общност на Тракийския университет. 
                Вярвам, че образованието трябва да бъде споделено, а не скрито.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
              <h2 className="text-2xl font-black text-[#003366] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /></svg>
                </span>
                Вашият глас е силата
              </h2>
              <p className="text-slate-600">
                „Един човек може да постави началото, но хиляди могат да изградят бъдещето.“ Когато качите своите записки или лекции, 
                вие не просто помагате на един колега – вие градите <strong>интелектуалното наследство</strong> на своя факултет.
              </p>
            </div>
          </div>
        </div>

        {/* ── TECH STACK ────────────────────────────────────── */}
        <div className="mb-24">
          <h2 className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#003366]/40 mb-12">
            Технологична мощ (Stack)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 15', desc: 'Frontend Framework', color: 'bg-black text-white' },
              { name: 'React', desc: 'Component Library', color: 'bg-[#61DAFB]/10 text-[#008BB9]' },
              { name: 'Tailwind CSS', desc: 'Design System', color: 'bg-[#38B2AC]/10 text-[#2C7A7B]' },
              { name: 'Supabase', desc: 'Database & Auth', color: 'bg-[#3ECF8E]/10 text-[#1E9E66]' },
            ].map((tech) => (
              <div key={tech.name} className="flex flex-col items-center text-center p-6 rounded-3xl border border-slate-100 bg-slate-50/50">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center font-bold text-lg ${tech.color}`}>
                  {tech.name[0]}
                </div>
                <h3 className="font-bold text-[#003366] text-sm">{tech.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CREATOR QUOTE ─────────────────────────────────── */}
        <div className="relative p-10 sm:p-16 rounded-[40px] bg-gradient-to-br from-[#003366] to-[#0055a4] text-white">
          <div className="absolute top-8 left-8 opacity-20">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56931 13 5.017 13H3.017V21H5.017Z" /></svg>
          </div>
          
          <blockquote className="relative z-10">
            <p className="text-2xl sm:text-3xl font-bold leading-snug mb-10 italic">
              „Създадох TrUShare, защото вярвам, че софтуерното инженерство има една висша цел: да решава реални проблеми и да свързва хората. Подарявам тази платформа на вас, моите колеги, с надеждата, че заедно ще направим обучението в Тракийския университет по-лесно, по-модерно и по-успешно.“
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-black text-xl">
                ХД
              </div>
              <div>
                <cite className="block not-italic font-black text-xl text-[#FFB800]">Христо Димов</cite>
                <span className="text-blue-100/60 text-sm font-medium uppercase tracking-widest">
                  Софтуерно инженерство, Тракийски университет
                </span>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* ── CALL TO ACTION ────────────────────────────────── */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-black text-[#003366] mb-6">Готови ли сте да промените бъдещето?</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">
            Включи се в общността. Качи първия си материал и помогни на стотици колеги още днес.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#003366] text-white rounded-2xl font-black shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Започни от тук
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
