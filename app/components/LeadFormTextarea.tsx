import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface Props {
  control: Control<
    {
      number: string;
      name: string;
      area: string;
      propertyType: string;
      date: Date;
      email: string;
      nationality: string;
      status: string;
      budgetTo: string;
      budgetFrom: string;
      lookingFor: string;
      beds: string;
      extra: string;
      comment: string;
    },
    any
  >;
  name: any;
  label: string;
}

const FormTextarea: React.FC<Props> = ({ control, name, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              className="dark:bg-zinc-800 dark:border-zinc-700 bg-zinc-50 shadow-sm dark:ring-offset-neutral-400 dark:text-neutral-50 transition duration-400"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
