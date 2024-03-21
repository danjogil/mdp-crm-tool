"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/app/components/ui/Input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ClipLoader } from "react-spinners";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/effect-button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  name: z.string(),
  number: z.string(),
  email: z.string(),
  date: z.date(),
  nationality: z.string(),
  type: z.string(),
  budget: z.string(),
  beds: z.string(),
  area: z.string(),
  property: z.string(),
  extra: z.string(),
  comment: z.string(),
});

const NewLeadForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      email: "",
      date: new Date(),
      nationality: "",
      type: "",
      budget: "",
      beds: "",
      area: "",
      property: "",
      extra: "",
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .post("/api/leads", data)
      .then(() => {
        toast.success("New lead created!");
        router.push("/leads");
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
    <Form {...form}>
      <div className="max-w-5xl w-full mx-auto rounded-2xl p-4 shadow-input">
        <h1 className="font-bold text-xl sm:text-3xl text-neutral-50">
          Create new lead
        </h1>

        <form className="my-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5 md:space-y-0 md:gap-8 flex flex-col md:flex-row">
            <div className="grow space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full name"
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
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000-000-0000"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@email.com"
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
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-zinc-700 border-0 hover:bg-zinc-700 hover:text-zinc-50",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Spanish"
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
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full bg-zinc-700 text-neutral-50 border-0 ring-offset-neutral-400">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-700 text-zinc-50 border-0">
                          <SelectItem
                            value="rent"
                            className="focus:bg-zinc-600 focus:text-zinc-50"
                          >
                            To Rent
                          </SelectItem>
                          <SelectItem
                            value="buy"
                            className="focus:bg-zinc-600 focus:text-zinc-50"
                          >
                            To Buy
                          </SelectItem>
                          <SelectItem
                            value="rentToBuy"
                            className="focus:bg-zinc-600 focus:text-zinc-50"
                          >
                            Rent To Buy
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
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
            </div>
            <div className="grow space-y-5">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Marbella, Nueva Andalucia..."
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
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apartment, villa..."
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
                name="extra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extra Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-zinc-700 border-0 ring-offset-neutral-400 text-neutral-50 transition duration-400"
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
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-zinc-700 border-0 ring-offset-neutral-400 text-neutral-50 transition duration-400"
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
              Add Lead &rarr;
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
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default NewLeadForm;
