"use client";

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

import { Control } from "react-hook-form";

interface Props {
  control: Control<
    {
      location: string;
      type: string;
      price: string;
      beds: string;
      propertyType: string;
      agent: string;
      conditions: string;
      comment: string;
      status: string;
      date: Date;
      complexName: string;
      reference: string;
      propertyLink: string;
      locationLink: string;
    },
    any
  >;
  name: any;
  label: string;
  options: string[];
}

const FormSelect: React.FC<Props> = ({ control, name, label, options }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700 bg-zinc-50 shadow">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="dark:bg-zinc-800 dark:text-zinc-50 border dark:border-zinc-700 bg-zinc-50">
              {options.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="dark:focus:bg-zinc-700 dark:focus:text-zinc-50"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
