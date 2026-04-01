'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface UploadFormProps {
  majorId: string;
}

const CATEGORIES = ['Лекции', 'Упражнения', 'Изпитни материали', 'Други'];

export default function UploadForm({ majorId }: UploadFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError('Моля, изберете файл.'); return; }
    if (!title.trim()) { setError('Моля, въведете заглавие.'); return; }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Upload file to Supabase Storage — use clean ASCII key to avoid "Invalid key" for Cyrillic names
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `${majorId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('materials')
        .upload(filePath, file);

      if (uploadError) throw new Error(`Грешка при качване: ${uploadError.message}`);

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('materials')
        .getPublicUrl(filePath);

      const fileUrl = urlData.publicUrl;

      // 3. Save record to materials table
      const { error: dbError } = await supabase.from('materials').insert({
        major_id: majorId,
        title: title.trim(),
        category,
        file_url: fileUrl,
      });

      if (dbError) throw new Error(`Грешка при записване: ${dbError.message}`);

      // 4. Success — reset form and refresh
      setTitle('');
      setCategory(CATEGORIES[0]);
      setFile(null);
      setSuccess(true);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Неочаквана грешка.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-blue-50 p-6 mb-10">
      <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
        </svg>
        Качи материал
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="title-input">
            Заглавие
          </label>
          <input
            id="title-input"
            type="text"
            placeholder="напр. Лекция 1 - Въведение"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="category-select">
            Категория
          </label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* File */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="file-input">
            Файл
          </label>
          <input
            id="file-input"
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={loading}
            className="text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
        </div>

        {/* Feedback */}
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
        )}
        {success && (
          <p className="rounded-lg bg-green-50 px-4 py-2.5 text-sm text-green-600">
            ✓ Материалът е качен успешно!
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Качва се...
            </>
          ) : (
            'Качи файл'
          )}
        </button>
      </form>
    </div>
  );
}
