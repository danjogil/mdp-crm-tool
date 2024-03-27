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
      image: string;
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
              <SelectTrigger className="bg-zinc-700 border-none">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-zinc-700 text-zinc-50 border border-zinc-600">
              {options.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="focus:bg-zinc-600 focus:text-zinc-50"
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
