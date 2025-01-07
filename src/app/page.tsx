"use client"
import { Crud } from "@/components/crud";
import { Result } from "@/components/result-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Data } from "@/lib/db/schema";
import { Linefont } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Data>()

  const handleOpen = (data: Data) => {
    setFormData(data)
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <main className="h-full max-w-screen-md mx-auto p-10">
      <div className="w-full flex justify-center items-center h-full p-4">
        <Card className="w-2/3">
          <CardHeader className="flex justify-between w-full">
            <div className="flex justify-between">
              <h1>
                Cek IMT Anda
              </h1>
              <Link href={"/imt"}>
                <Button className="capitalize">
                  lihat data lain
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Crud onSubmitAction={handleOpen} />
            <Result isOpen={isOpen} onClose={handleClose} data={formData!} />
          </CardContent>
        </Card>
      </div>
    </main >
  );
}
