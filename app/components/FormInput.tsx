"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/app/components/ui/Input";
import { Control } from "react-hook-form";

interface Props {
  control: Control<
    {
      number: string;
      name: string;
      area: string;
      property: string;
      date: Date;
      email: string;
      nationality: string;
      status: string;
      budget: string;
      beds: string;
      extra: string;
      comment: string;
    },
    any
  >;
  name: any;
  label: string;
  placeholder: string;
}

const FormInput: React.FC<Props> = ({ control, name, label, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className="bg-zinc-700 text-neutral-50"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
