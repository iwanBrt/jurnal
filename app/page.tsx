"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/src/components/Sidebar";
import { Editor } from "@/src/components/Editor";
import { getJournals } from "@/src/actions/journal";

export type Journal = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  const loadJournals = async () => {
    const res = await getJournals();
    if (res.success && res.data) {
      setJournals(res.data);
      if (res.data.length > 0 && !selectedJournal) {
        setSelectedJournal(res.data[0]);
      }
    }
  };

  useEffect(() => {
    loadJournals();
  }, []);

  const handleNew = () => {
    setSelectedJournal(null);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  const handleSelect = (journal: Journal) => {
    setSelectedJournal(journal);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden relative">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        journals={journals}
        selectedId={selectedJournal?.id || null}
        onSelect={handleSelect}
        onNew={handleNew}
      />
      <Editor 
        onMenuClick={() => setIsSidebarOpen(true)} 
        journal={selectedJournal}
        onRefresh={loadJournals}
      />
    </div>
  );
}
