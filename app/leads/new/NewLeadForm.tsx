"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ClipLoader } from "react-spinners";

import FormDateInput from "@/app/components/FormDateInput";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/StatusSelect";
import FormTextarea from "@/app/components/FormTextarea";

import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string(),
  number: z.string(),
  email: z.string(),
  date: z.date(),
  nationality: z.string(),
  status: z.string(),
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
      status: "ACTIVE",
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
          <h1 className="font-bold text-2xl sm:text-3xl text-neutral-50 mt-3">
            Create new lead
          </h1>

          <form
            className="my-8 space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-5 md:space-y-0 md:gap-8 flex flex-col md:flex-row">
              <div className="grow space-y-5">
                <FormInput
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Full name"
                />
                <FormInput
                  control={form.control}
                  name="number"
                  label="Number"
                  placeholder="000-000-0000"
                />
                <FormInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="name@email.com"
                />
                <FormDateInput
                  control={form.control}
                  name="date"
                  label="Date"
                />
                <FormInput
                  control={form.control}
                  name="nationality"
                  label="Nationality"
                  placeholder="Spanish"
                />
                <FormInput
                  control={form.control}
                  name="budget"
                  label="Budget"
                  placeholder="€10000"
                />
              </div>
              <div className="grow space-y-5">
                <FormInput
                  control={form.control}
                  name="area"
                  label="Area"
                  placeholder="Marbella, Nueva Andalucia..."
                />
                <FormInput
                  control={form.control}
                  name="beds"
                  label="Beds"
                  placeholder="3"
                />
                <FormInput
                  control={form.control}
                  name="property"
                  label="Property"
                  placeholder="Apartment, villa..."
                />
                <FormTextarea
                  control={form.control}
                  name="extra"
                  label="Extra Requirements"
                />

                <FormTextarea
                  control={form.control}
                  name="comment"
                  label="Comments"
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
    </motion.div>
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
