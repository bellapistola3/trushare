'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ initialValue = '' }: { initialValue?: string }) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-0 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        {/* Search icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Търси учебници, лекции, конспекти..."
          className="w-full pl-14 pr-6 py-5 text-base rounded-l-2xl border-0 outline-none shadow-lg text-gray-800 placeholder-gray-400 bg-white"
        />
      </div>
      <button
        type="submit"
        className="px-8 py-5 text-base font-bold text-white rounded-r-2xl transition-opacity hover:opacity-90 active:scale-98 shadow-lg"
        style={{ background: '#FFB800', color: '#003366' }}
      >
        Търси
      </button>
    </form>
  );
}
