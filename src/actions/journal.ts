"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getJournals() {
  try {
    const journals = await prisma.journal.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: journals };
  } catch (error) {
    console.error("Failed to fetch journals:", error);
    return { success: false, error: "Gagal mengambil data jurnal." };
  }
}

export async function saveJournal(id: number | null, title: string, content: string) {
  try {
    let journal;
    if (id) {
      // Update existing
      journal = await prisma.journal.update({
        where: { id },
        data: { title, content },
      });
    } else {
      // Create new
      journal = await prisma.journal.create({
        data: { title, content },
      });
    }

    revalidatePath("/");
    return { success: true, data: journal };
  } catch (error) {
    console.error("Failed to save journal:", error);
    return { success: false, error: "Gagal menyimpan jurnal." };
  }
}

export async function deleteJournal(id: number) {
  try {
    await prisma.journal.delete({
      where: { id },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete journal:", error);
    return { success: false, error: "Gagal menghapus jurnal." };
  }
}
