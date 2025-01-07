"use client"

import { useState, useEffect } from 'react';
import { getImtData } from '@/actions/action';
import { Button } from '@/components/ui/button';
import { Data } from '@/lib/db/schema';
import { Result } from '@/components/result-dialog';
import Link from 'next/link';

export default function Imt() {
  const [selectedData, setSelectedData] = useState<Data | null>(null); // Store selected data for dialog
  const [data, setData] = useState<Data[] | null>(null); // IMT data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imtData = await getImtData();
        setData(imtData);
      } catch (err) {
        setError('Failed to fetch IMT data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (item: Data) => {
    setSelectedData(item); // Set the selected item data
  };

  const handleClose = () => {
    setSelectedData(null); // Clear the selected data when closing
  };

  if (loading) {
    return (
      <div className='h-full flex justify-center items-center'><div>
        Loading...
      </div></div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="h-full max-w-screen-md mx-auto p-10">
      <div>
        <div className="flex justify-between">
          <h3>IMT List</h3>
          <Link href={"/"}>
            <Button className="capitalize">
              kembali
            </Button>
          </Link>
        </div>
        <div className="w-full space-y-4 mt-6">
          {data?.map((item) => (
            <div key={item.id} className="flex items-center justify-between w-full border border-primary rounded p-4">
              <div>
                <p>Nama: {item.name}</p>
                <p>No HP: {item.no_hp}</p>
              </div>
              <div>
                <Button className="capitalize" onClick={() => handleOpen(item)}>
                  Lihat Hasil IMT
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pass selectedData to the Result dialog */}
      {selectedData && (
        <Result
          isOpen={!!selectedData}
          onClose={handleClose}
          data={selectedData}
        />
      )}
    </main>
  );
}

