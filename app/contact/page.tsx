'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    // Build mailto link
    const recipient = 'hristo.dimov.22@trakia-uni.bg';
    const subject = encodeURIComponent(formData.subject || 'Запитване от TrUShare');
    const body = encodeURIComponent(
      `Име: ${formData.name}\n` +
      `Имейл: ${formData.email}\n\n` +
      `Съобщение:\n${formData.message}`
    );
    
    // Open default mail client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Simulate API call for UI feedback
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsLoading(false);
    setIsSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* ── HEADER ───────────────────────────────────────── */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-[#003366] mb-4">
            Свържи се с нас
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Имаш въпрос, предложение или искаш да споделиш идея за развитието на TrUShare? 
            Ние сме тук, за да те изслушаме.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* ── CONTACT INFO ────────────────────────────────── */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-hover hover:shadow-md">
              <h2 className="text-2xl font-bold text-[#003366] mb-8">Информация за контакт</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6L3 9m9 5l9-5M3 9l9 5m0-10V3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#003366]/40 mb-1">Академичен имейл</p>
                    <a href="mailto:hristo.dimov.22@trakia-uni.bg" className="text-lg font-bold text-slate-700 hover:text-[#003366] transition-colors">
                      hristo.dimov.22@trakia-uni.bg
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#003366]/40 mb-1">Личен / Технически</p>
                    <a href="mailto:methodman9090@gmail.com" className="text-lg font-bold text-slate-700 hover:text-[#003366] transition-colors">
                      methodman9090@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#003366] p-8 rounded-3xl text-white shadow-xl shadow-blue-900/10">
              <h3 className="font-bold text-xl mb-4 text-[#FFB800]">Твоят глас е важен</h3>
              <p className="text-blue-100/70 leading-relaxed text-sm">
                TrUShare е проект, създаден за студенти. Всяка обратна връзка помага платформата да стане по-добра, по-бърза и по-полезна за всички нас.
              </p>
            </div>
          </div>

          {/* ── FEEDBACK FORM ───────────────────────────────── */}
          <div className="bg-white p-8 sm:p-10 rounded-[40px] shadow-sm border border-slate-100">
            {isSubmitted ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-[#003366] mb-4">Благодарим ти!</h3>
                <p className="text-slate-500 leading-relaxed">
                  Твоята идея е ценна за развитието на TrUShare. <br /> 
                  Христо Димов ще се свърже с теб при нужда.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm font-bold text-[#003366] hover:underline"
                >
                  Изпрати друго съобщение
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-[#003366] mb-2 uppercase tracking-tight">Дай препоръка</h2>
                <p className="text-sm text-slate-400 mb-8 font-medium">СПОДЕЛИ ИДЕЯ ЗА САЙТА</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Име</label>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Твоето име"
                        className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#003366]/20 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Имейл</label>
                      <input 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="example@mail.com"
                        className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#003366]/20 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Тема</label>
                    <input 
                      required
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Напр. Идея за нова функция"
                      className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#003366]/20 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Съобщение</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Опиши идеята си тук..."
                      className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#003366]/20 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700 resize-none"
                    />
                  </div>

                  <button 
                    disabled={isLoading}
                    type="submit" 
                    className="mt-4 w-full py-5 bg-[#003366] text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/10 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-3 group"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        Изпрати съобщение
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
