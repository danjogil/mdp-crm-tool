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
import { Textarea } from "@/components/ui/textarea";
import { Task, Viewing } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { BottomGradient } from "../../leads/new/NewLeadForm";

const formSchema = z.object({
  title: z.string(),
  comment: z.string(),
});

// const statuses = ["INCOMPLETE", "COMPLETE"];

interface Props {
  viewing: Viewing;
  onClose: () => void;
}

const EditViewingForm: React.FC<Props> = ({ viewing, onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: viewing?.title,
      comment: viewing?.comment || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .patch(`/api/viewings/${viewing?.id}`, data)
      .then(() => {
        toast.success("Changes saved!");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Viewing</FormLabel>
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
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  className="dark:bg-zinc-700 bg-zinc-50 shadow-sm dark:border-0 dark:ring-offset-neutral-400 dark:text-neutral-50 transition duration-400"
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
            Save changes &rarr;
            <BottomGradient />
          </button>
        ) : (
          <button className="w-full text-white bg-neutral-600 rounded-md h-10 font-medium flex justify-center items-center">
            <ClipLoader color="#fff" size={24} />
          </button>
        )}
      </form>

      {!isDeleting ? (
        <button
          onClick={async () => {
            setIsDeleting(true);
            await axios
              .delete(`/api/viewings/${viewing?.id}`)
              .then(() => {
                toast.success("Task deleted!");
                router.refresh();
                onClose();
              })
              .catch(() => {
                toast.error("Something went wrong.");
              })
              .finally(() => {
                setIsDeleting(false);
              });
          }}
          className="bg-gradient-to-br relative group/btn dark:hover:bg-red-800 hover:bg-red-700 block dark:bg-red-700 bg-red-600 w-full text-white rounded-md h-10 font-medium disabled:cursor-not-allowed transition-colors duration-400"
        >
          Delete task &rarr;
        </button>
      ) : (
        <button className="w-full text-white bg-neutral-600 rounded-md h-10 font-medium flex justify-center items-center">
          <ClipLoader color="#fff" size={24} />
        </button>
      )}
    </Form>
  );
};

export default EditViewingForm;
