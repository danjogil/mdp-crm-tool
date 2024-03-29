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

import FormDateInput from "@/app/components/PropertyFormDateInput";
import FormInput from "@/app/components/PropertyFormInput";
import FormSelect from "@/app/components/PropertyFormSelect";
import FormTextarea from "@/app/components/PropertyFormTextarea";
import { Property } from "@prisma/client";

const formSchema = z.object({
  location: z.string().min(1),
  type: z.string().min(1),
  price: z.string().min(1),
  beds: z.string().min(1),
  propertyType: z.string().min(1),
  agent: z.string().min(1),
  conditions: z.string(),
  comment: z.string(),
  status: z.string(),
  date: z.date(),
  complexName: z.string(),
  reference: z.string(),
  propertyLink: z.string(),
  locationLink: z.string(),
});

interface Props {
  property: Property | null;
  id: string;
}

const EditPropertyForm: React.FC<Props> = ({ property, id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: property?.location,
      type: property?.type,
      price: String(property?.price),
      beds: String(property?.beds),
      propertyType: property?.propertyType,
      agent: property?.agent,
      conditions: property?.conditions || "",
      comment: property?.comment || "",
      status: "AVAILABLE",
      date: property?.date,
      complexName: property?.complexName || "",
      reference: property?.reference || "",
      propertyLink: property?.propertyLink || "",
      locationLink: property?.locationLink || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const newData = {
      ...data,
      price: parseInt(data.price),
      beds: parseInt(data.beds),
    };

    setIsLoading(true);
    axios
      .patch(`/api/properties/${id}`, newData)
      .then(() => {
        toast.success("Changes saved!");
        router.back();
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
        <div className="max-w-5xl w-full mx-auto rounded-2xl p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-cente mt-3">
            <h1 className="font-bold text-2xl sm:text-3xl dark:text-neutral-50">
              Edit property
            </h1>

            <div>
              <Button onClick={() => router.back()}>&larr; Go Back</Button>
            </div>
          </div>

          <form
            className="my-8 space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-5 md:space-y-0 md:gap-8 flex flex-col md:flex-row">
              <div className="grow space-y-5">
                <FormSelect
                  control={form.control}
                  name="type"
                  label="Type"
                  options={["Rental", "Sale"]}
                />
                <FormInput
                  control={form.control}
                  name="location"
                  label="Location"
                  placeholder="Marbella, Estepona..."
                />
                <FormInput
                  control={form.control}
                  name="complexName"
                  label="Complex Name"
                  placeholder="Meisho Hills..."
                />
                <FormInput
                  control={form.control}
                  name="price"
                  label="Price"
                  placeholder="€10000"
                />
                <FormInput
                  control={form.control}
                  name="beds"
                  label="Beds"
                  placeholder="3"
                />
                <FormSelect
                  control={form.control}
                  name="propertyType"
                  label="Property Type"
                  options={["Apartment", "Townhouse", "Villa"]}
                />
                <FormDateInput
                  control={form.control}
                  name="date"
                  label="Date"
                />
              </div>

              <div className="grow space-y-5">
                <FormInput control={form.control} name="agent" label="Agent" />
                <FormInput
                  control={form.control}
                  name="conditions"
                  label="Conditions"
                />
                <FormInput
                  control={form.control}
                  name="reference"
                  label="Reference"
                />
                <FormInput
                  control={form.control}
                  name="propertyLink"
                  label="Property Link"
                />
                <FormInput
                  control={form.control}
                  name="locationLink"
                  label="Location Link"
                />
                <FormTextarea
                  control={form.control}
                  name="comment"
                  label="Comment"
                />
              </div>
            </div>

            {!isLoading ? (
              <button
                className="bg-gradient-to-br relative group/btn  from-zinc-800 to-zinc-800 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:cursor-not-allowed"
                type="submit"
              >
                Save Changes &rarr;
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

export default EditPropertyForm;
