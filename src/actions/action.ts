"use server"
import { db } from "@/lib/db/db";
import { Data, imtTable, InsertData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getImtData = cache(async () => {
  const imt = await db.query.imtTable.findMany();
  return imt;
});

export const getImtByNohp = cache(async (no_hp: string) => {
  const imt = await db.query.imtTable.findMany({
    where: eq(imtTable.no_hp, no_hp),
  });
  return imt;
});

export const newData = async (data: InsertData) => {
  const newImtData = await db.insert(imtTable).values(data).returning();
  return newImtData;
};

export const updateData = async (data: Data) => {
  const updateImtData = await db
    .update(imtTable)
    .set(data)
    .where(eq(imtTable.id, data.id ?? 0))
    .returning();
  const getImtData = await db.query.imtTable.findFirst({
    where: eq(imtTable.id, updateImtData[0]!.id),
  });
  return getImtData;
};

export const deleteData = async (id: number) => {
  const deleteImtData = await db
    .delete(imtTable)
    .where(eq(imtTable.id, id))
    .returning();
  return deleteImtData;
}
