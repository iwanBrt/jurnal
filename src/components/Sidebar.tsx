import React from "react";
import type { Journal } from "@/app/page";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  journals: Journal[];
  selectedId: number | null;
  onSelect: (journal: Journal) => void;
  onNew: () => void;
}

export function Sidebar({ isOpen, onClose, journals, selectedId, onSelect, onNew }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`
          fixed md:relative z-40 h-full
          w-[80%] max-w-[320px] md:w-[30%] lg:w-[25%] md:max-w-none
          border-r border-green-500/20 bg-slate-950/95 md:bg-[#020617]
          backdrop-blur-md flex flex-col overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          shadow-[4px_0_24px_rgba(34,197,94,0.05)]
        `}
      >
        <div className="p-5 border-b border-green-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" x2="20" y1="19" y2="19" />
              </svg>
            </div>
            <h1 className="text-lg font-bold font-mono text-slate-100 tracking-tight drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
              Kali_Journal
            </h1>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-green-400 p-1">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 p-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-green-500/60 font-semibold mb-4 ml-1">
            Riwayat Jurnal
          </h2>
          <ul className="space-y-3">
            {journals.length === 0 && (
              <li className="text-xs text-slate-500 font-mono ml-1 italic">Tidak ada jurnal.</li>
            )}
            {journals.map((journal) => {
              const isActive = journal.id === selectedId;
              return (
                <li key={journal.id}>
                  <button 
                    onClick={() => onSelect(journal)}
                    className={`w-full text-left p-3 rounded-xl transition-all group ${isActive ? 'bg-gradient-to-r from-green-500/10 to-transparent border-l-2 border-green-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' : 'bg-transparent border-l-2 border-transparent hover:border-slate-700 hover:bg-slate-900/50'}`}
                  >
                    <div className={`font-medium truncate ${isActive ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {journal.title || "Tanpa Judul"}
                    </div>
                    <div className="text-xs text-slate-500 mt-1.5 flex items-center font-mono">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>}
                      {new Date(journal.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-800/50">
          <button onClick={onNew} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-200 py-3 rounded-xl border border-slate-700 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-green-400 transition-colors">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <span className="font-mono text-sm group-hover:text-green-400 transition-colors">Entri Baru</span>
          </button>
        </div>
      </aside>
    </>
  );
}
