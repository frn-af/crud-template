"use client"

import { useState, useEffect, useCallback } from 'react';
import { getImtData, updateData } from '@/actions/action';
import { Button } from '@/components/ui/button';
import { Data } from '@/lib/db/schema';
import { Result } from '@/components/result-dialog';
import Link from 'next/link';
import { EditForm } from '@/components/update-form';

export default function Imt() {
  const [selectedData, setSelectedData] = useState<Data | null>(null);
  const [data, setData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const imtData = await getImtData();
      setData(imtData);
    } catch {
      setError('Failed to fetch IMT data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpen = useCallback((item: Data) => setSelectedData(item), []);
  const handleClose = useCallback(() => setSelectedData(null), []);

  const handleUpdate = useCallback(
    async (updatedItem: Data) => {
      if (!data) return;
      const updatedData = await updateData(updatedItem, updatedItem.id);
      if (updatedData instanceof Error || !updatedData) {
        console.error('Failed to update item');
        return;
      }
      setData((prevData) =>
        prevData
          ? prevData.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
          : null
      );
    },
    [data]
  );

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="h-full max-w-screen-md mx-auto p-10">
      <header className="flex justify-between">
        <h3>IMT List</h3>
        <Link href="/">
          <Button className="capitalize">kembali</Button>
        </Link>
      </header>

      <section className="w-full space-y-4 mt-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between w-full border border-primary rounded p-4"
          >
            <div>
              <p>Nama: {item.name}</p>
              <p>No HP: {item.no_hp}</p>
            </div>
            <div className="flex gap-2">
              <Button className="capitalize" onClick={() => handleOpen(item)}>
                Lihat Hasil IMT
              </Button>
              <EditForm oldData={item} onUpdate={handleUpdate} />
            </div>
          </div>
        ))}
      </section>

      {selectedData && (
        <Result isOpen={!!selectedData} onClose={handleClose} data={selectedData} />
      )}
    </main>
  );
}

