import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
      area: string;
      type: string;
      property: string;
      date: Date;
      email: string;
      nationality: string;
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
  options: string[];
}

const FormSelect: React.FC<Props> = ({
  control,
  name,
  label,
  placeholder,
  options,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full bg-zinc-700 text-neutral-50 border-0 ring-offset-neutral-400">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-zinc-700 text-zinc-50 border-0">
                {options?.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="focus:bg-zinc-600 focus:text-zinc-50"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
