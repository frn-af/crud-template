import { Crud } from "@/components/crud";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="h-full max-w-screen-md mx-auto p-10">
      <div className="w-full flex justify-center items-center h-full p-4">
        <Card className="w-2/3">
          <CardHeader className="flex justify-between w-full">
            <div className="flex justify-between">
              <h1>
                Cek IMT Anda
              </h1>
              <Button className="capitalize">lihat data lain</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Crud />
          </CardContent>
        </Card>
      </div>
    </main >
  );
}
