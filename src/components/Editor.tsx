import React, { useState, useEffect } from "react";
import type { Journal } from "@/app/page";
import { saveJournal, deleteJournal } from "@/src/actions/journal";

interface EditorProps {
  onMenuClick: () => void;
  journal: Journal | null;
  onRefresh: () => void;
}

export function Editor({ onMenuClick, journal, onRefresh }: EditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (journal) {
      setTitle(journal.title);
      setContent(journal.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [journal]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveJournal(journal ? journal.id : null, title, content);
    setIsSaving(false);
    onRefresh();
  };

  const handleDelete = async () => {
    if (!journal) return;
    const confirm = window.confirm("Yakin ingin menghapus jurnal ini?");
    if (!confirm) return;
    
    setIsDeleting(true);
    await deleteJournal(journal.id);
    setIsDeleting(false);
    onRefresh();
  };

  return (
    <main className="flex-1 h-full flex flex-col relative w-full md:w-auto bg-[#020617]">
      {/* Editor Header */}
      <header className="p-4 md:px-8 md:py-6 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-10">
        <div className="flex items-center w-full sm:w-auto gap-3">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-slate-400 hover:text-green-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul Jurnal..."
              className="w-full bg-transparent text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent outline-none placeholder:text-slate-700 transition-all focus:from-green-100 focus:to-slate-300"
            />
            <div className="text-[10px] md:text-xs text-slate-500 mt-1 md:mt-2 font-mono flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
              ~/journal/{journal ? `${journal.id}.md` : 'baru.md'}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 w-full sm:w-auto justify-end">
          {journal && (
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 md:py-2.5 text-xs md:text-sm font-mono bg-transparent hover:bg-red-950/50 text-slate-400 hover:text-red-400 rounded-lg transition-colors border border-slate-700 hover:border-red-500/50"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </button>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 md:py-2.5 text-xs md:text-sm font-mono bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            {isSaving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </header>

      {/* Markdown Textarea */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto relative">
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        ></div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full bg-transparent resize-none outline-none font-mono text-sm md:text-base text-slate-300 leading-relaxed placeholder:text-slate-800 z-10 relative"
          placeholder="Mulai mengetik log aktivitas Anda di sini..."
        />
      </div>
      
      {/* Footer Status Bar */}
      <footer className="px-4 py-2 bg-slate-950 border-t border-slate-800/50 text-[10px] md:text-xs font-mono text-slate-500 flex justify-between z-10 sticky bottom-0">
        <div className="flex space-x-4 md:space-x-6 items-center">
          <span className="flex items-center text-green-500/80">
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${isSaving ? 'bg-yellow-500' : 'bg-green-500 shadow-[0_0_5px_#22c55e]'}`}></span>
            {isSaving ? 'Menyimpan...' : 'Tersimpan'}
          </span>
          <span className="hidden sm:inline">Markdown Supported</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">Ln {content.split('\n').length}, Col {content.length}</span>
          <span>UTF-8</span>
        </div>
      </footer>
    </main>
  );
}
