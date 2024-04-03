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
      number: string;
      name: string;
      email: string;
      date: Date;
      lookingFor: string;
      nationality: string;
      budgetFrom: string;
      budgetTo: string;
      area: string;
      beds: string;
      propertyType: string;
      extra: string;
      comment: string;
      status: string;
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
              <SelectTrigger className="dark:bg-zinc-800 border dark:border-zinc-700 shadow-sm bg-zinc-50 h-[43px]">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="dark:bg-zinc-700 dark:text-zinc-50 bg-zinc-50 border dark:border-zinc-600">
              {options.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="dark:focus:bg-zinc-600 dark:focus:text-zinc-50"
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
