export default function Panels({ left, right }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT PANEL */}
        <section className="col-span-12 md:col-span-5 bg-[color:var(--paper-card)] border border-[color:var(--border-soft)] rounded-lg">
          {left}
        </section>

        {/* RIGHT PANEL */}
        <section className="col-span-12 md:col-span-7 bg-[color:var(--paper-card)] border border-[color:var(--border-soft)] rounded-lg">
          {right}
        </section>

      </div>
    </main>
  );
}



