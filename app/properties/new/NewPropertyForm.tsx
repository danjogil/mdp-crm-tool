"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ClipLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/app/components/ui/Input";

const formSchema = z.object({
  location: z.string().min(1),
  type: z.string().min(1),
  price: z.string().min(1),
  beds: z.string().min(1),
  propertyType: z.string().min(1),
  agent: z.string().min(1),
  conditions: z.string(),
  status: z.string(),
});

const NewPropertyForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      type: "",
      price: "",
      beds: "",
      propertyType: "",
      agent: "",
      conditions: "",
      status: "AVAILABLE",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .post("/api/properties", data)
      .then(() => {
        toast.success("New property created!");
        router.push("/properties");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center z-20"
    >
      <Form {...form}>
        <div className="max-w-5xl w-full mx-auto rounded-2xl p-4 shadow-input">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-cente mt-3">
            <h1 className="font-bold text-2xl sm:text-3xl text-neutral-50">
              Create new property
            </h1>

            <div>
              <Button
                className="bg-zinc-900 text-zinc-50 border border-zinc-700 hover:bg-zinc-800"
                onClick={() => router.back()}
              >
                &larr; Go Back
              </Button>
            </div>
          </div>

          <form
            className="my-8 space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-5 md:space-y-0 md:gap-8 flex flex-col md:flex-row">
              <div className="grow space-y-5">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Marbella, Estepona..."
                          className="bg-zinc-700 text-neutral-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-700 border-none">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-700 text-zinc-50 border border-zinc-600">
                          <SelectItem
                            value="Rental"
                            className="focus:bg-zinc-600 focus:text-zinc-50"
                          >
                            Rental
                          </SelectItem>
                          <SelectItem
                            value="Sale"
                            className="focus:bg-zinc-600 focus:text-zinc-50"
                          >
                            Sale
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="€10000"
                          className="bg-zinc-700 text-neutral-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beds</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="3"
                          className="bg-zinc-700 text-neutral-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grow space-y-5">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apartment, Villa..."
                          className="bg-zinc-700 text-neutral-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Agent name..."
                          className="bg-zinc-700 text-neutral-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="conditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conditions</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          className="bg-zinc-700 text-neutral-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {!isLoading ? (
              <button
                className="bg-gradient-to-br relative group/btn  from-zinc-800 to-zinc-800 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:cursor-not-allowed"
                type="submit"
              >
                Add Property &rarr;
                <BottomGradient />
              </button>
            ) : (
              <button className="w-full text-white bg-neutral-600 rounded-md h-10 font-medium flex justify-center items-center">
                <ClipLoader color="#fff" size={24} />
              </button>
            )}
          </form>
        </div>
      </Form>
    </motion.div>
  );
};

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default NewPropertyForm;
