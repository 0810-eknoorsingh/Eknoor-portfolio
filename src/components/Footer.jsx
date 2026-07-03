import { data } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-border py-6 px-10 max-sm:py-5 max-sm:px-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-3">
        <p className="font-mono text-[0.81rem] text-dim">
          Designed &amp; built by <span className="text-accent">Eknoor Singh</span> · <span className="text-accent">{new Date().getFullYear()}</span>
        </p>
        <div className="flex gap-5">
          <button
            onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
            className="text-dim text-[0.81rem] bg-transparent border-none cursor-pointer transition-colors duration-200 hover:text-text"
          >
            Back to top ↑
          </button>
          <a
            href={`mailto:${data.email}`}
            className="text-dim text-[0.81rem] no-underline transition-colors duration-200 hover:text-text"
          >Email</a>
        </div>
      </div>
    </footer>
  );
}
