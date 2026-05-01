"use server";

import { pool } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getJournals() {
  let conn;
  try {
    conn = await pool.getConnection();
    const journals = await conn.query(
      "SELECT id, title, content, createdAt, updatedAt FROM Journal ORDER BY updatedAt DESC"
    );
    // MariaDB mengembalikan array + meta, kita ambil data saja
    return { success: true, data: JSON.parse(JSON.stringify(journals)) };
  } catch (error) {
    console.error("Failed to fetch journals:", error);
    return { success: false, error: "Gagal mengambil data jurnal." };
  } finally {
    if (conn) conn.release();
  }
}

export async function saveJournal(id: number | null, title: string, content: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    let journal;
    if (id) {
      // Update existing
      await conn.query(
        "UPDATE Journal SET title = ?, content = ?, updatedAt = NOW(3) WHERE id = ?",
        [title, content, id]
      );
      const rows = await conn.query("SELECT id, title, content, createdAt, updatedAt FROM Journal WHERE id = ?", [id]);
      journal = rows[0];
    } else {
      // Create new
      const result = await conn.query(
        "INSERT INTO Journal (title, content, createdAt, updatedAt) VALUES (?, ?, NOW(3), NOW(3))",
        [title, content]
      );
      const rows = await conn.query("SELECT id, title, content, createdAt, updatedAt FROM Journal WHERE id = ?", [Number(result.insertId)]);
      journal = rows[0];
    }

    revalidatePath("/");
    return { success: true, data: JSON.parse(JSON.stringify(journal)) };
  } catch (error) {
    console.error("Failed to save journal:", error);
    return { success: false, error: "Gagal menyimpan jurnal." };
  } finally {
    if (conn) conn.release();
  }
}

export async function deleteJournal(id: number) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM Journal WHERE id = ?", [id]);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete journal:", error);
    return { success: false, error: "Gagal menghapus jurnal." };
  } finally {
    if (conn) conn.release();
  }
}
