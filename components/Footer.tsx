export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-gray-200 bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">

        <p className="text-2xl font-bold tracking-wide text-gray-400">
          Created &amp; Powered by{' '}
          <span className="font-black" style={{ color: '#003366' }}>DimoFF</span>
        </p>

        <div className="w-16 h-1 rounded-full" style={{ background: '#FFB800' }} />

        <p className="text-sm text-gray-400">
          © 2026{' '}
          <span className="font-semibold text-gray-600">TrUShare</span>
          {' · '}
          Тракийски университет — Стара Загора
        </p>
      </div>
    </footer>
  );
}
