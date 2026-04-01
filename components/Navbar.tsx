'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="w-full shadow-xl" style={{ background: 'linear-gradient(135deg, #002855 0%, #003d80 100%)' }}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between gap-8">

        {/* LEFT: TrU logo + name */}
        <Link href="/" className="flex items-center gap-5 shrink-0 hover:opacity-90 transition-opacity">
          <Image
            src="https://trakia-uni.bg/wp-content/uploads/2024/04/TrU-logo-20-1-1-bgTransparent-448x139.png"
            alt="Тракийски университет"
            width={320}
            height={100}
            className="object-contain brightness-0 invert"
            style={{ height: '100px', width: 'auto' }}
            priority
            unoptimized
          />
          <div className="h-14 w-px bg-white/25" />
          <div>
            <span className="block text-white font-black text-3xl tracking-tight leading-none">TrUShare</span>
            <span className="block text-white/50 text-xs font-medium mt-1">Платформа за знания</span>
          </div>
        </Link>

        {/* RIGHT: nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white/80 hover:text-white font-semibold text-sm transition-colors">Начало</Link>
          <Link href="/about" className="text-white/80 hover:text-white font-semibold text-sm transition-colors">За проекта</Link>
          <Link href="/contact" className="text-white/80 hover:text-white font-semibold text-sm transition-colors">Контакти</Link>
        </nav>
      </div>
    </header>
  );
}
