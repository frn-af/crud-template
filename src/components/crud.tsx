
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  no_hp: z.coerce.number().min(10, { message: "No HP must be at least 10 characters." }),
  tinggi_badan: z.coerce.number().min(1),
  berat_badan: z.coerce.number().min(1)
})

export function Crud() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      no_hp: undefined,
      tinggi_badan: undefined,
      berat_badan: undefined
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_hp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No.HP</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="08XXXXXXXXXX"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value
                    field.onChange(value.replace(/\D/g, ""))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tinggi_badan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tinggi Badan</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Tinggi badan anda"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value
                    field.onChange(value.replace(/\D/g, ""))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="berat_badan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Berat Badan</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Berat badan anda"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value
                    field.onChange(value.replace(/\D/g, ""))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
