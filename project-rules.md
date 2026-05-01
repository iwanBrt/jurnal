# Project Context
Aplikasi web lokal "Jurnal Belajar Kali Linux" tanpa fitur login.

# Tech Stack
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Database: MySQL (XAMPP) via Prisma ORM
- UI Components: shadcn/ui, Lucide Icons

# Design Guidelines
- Tema wajib Dark Mode (bg-slate-950, text-slate-200).
- Aksen warna: Hijau neon atau biru terang (terminal hacker vibe).
- Tipografi: Font monospace untuk code block dan input, sans-serif untuk teks biasa.
- Layout: 2 kolom (Sidebar Kiri 30% untuk riwayat, Main Content Kanan 70% untuk editor markdown).

# Coding Rules
1. Jangan gunakan Pages Router.
2. Selalu gunakan TypeScript.
3. Pisahkan komponen UI yang reusable ke dalam folder `src/components/`.
4. Berikan komentar pada bagian kode yang kompleks.