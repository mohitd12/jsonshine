import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow surface bg-surface">
        <h1 className="text-2xl font-bold">JSONShine</h1>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
