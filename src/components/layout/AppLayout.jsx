import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen paper-bg text-[color:var(--ink-main)]">
      
      {/* Content area grows */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}
