"use server"
import { db } from "@/lib/db/db";
import { Data, imtTable, InsertData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getImtData = cache(async () => {
  try {
    const imt = await db.query.imtTable.findMany();
    return imt;
  } catch (error) {
    throw error;
  }
});

export const getImtByNohp = async (no_hp: string) => {
  try {
    const imt = await db.query.imtTable.findMany({
      where: eq(imtTable.no_hp, no_hp),
    });
    return imt;
  } catch (error) {
    throw error;
  }
};

export const newData = async (data: InsertData) => {
  try {
    const newImtData = await db.insert(imtTable).values(data).returning();
    return newImtData;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (data: Data) => {
  try {
    const updateImtData = await db
      .update(imtTable)
      .set(data)
      .where(eq(imtTable.id, data.id ?? 0))
      .returning();
    const getImtData = await db.query.imtTable.findFirst({
      where: eq(imtTable.id, updateImtData[0]!.id),
    });
    return getImtData;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (id: number) => {
  try {
    const deleteImtData = await db
      .delete(imtTable)
      .where(eq(imtTable.id, id))
      .returning();
    return deleteImtData;
  } catch (error) {
    throw error;
  }
}
