"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/app/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { BottomGradient } from "../../leads/new/NewLeadForm";

const formSchema = z.object({
  date: z.string(),
  time: z.string(),
  lead: z.string(),
  property: z.string(),
});

const NewViewingForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      time: "",
      lead: "",
      property: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .post("/api/viewings", data)
      .then(() => {
        toast.success("New viewing created!");
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="lead"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700 dark:text-neutral-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="property"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700 dark:text-neutral-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700 dark:text-neutral-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-zinc-700 dark:text-neutral-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isLoading ? (
          <button
            className="bg-gradient-to-br relative group/btn  from-zinc-800 to-zinc-800 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:cursor-not-allowed"
            type="submit"
          >
            Add viewing &rarr;
            <BottomGradient />
          </button>
        ) : (
          <button className="w-full text-white bg-neutral-600 rounded-md h-10 font-medium flex justify-center items-center">
            <ClipLoader color="#fff" size={24} />
          </button>
        )}
      </form>
    </Form>
  );
};

export default NewViewingForm;
