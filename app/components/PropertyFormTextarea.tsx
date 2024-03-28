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
      type: string;
      date: Date;
      status: string;
      beds: string;
      comment: string;
      location: string;
      price: string;
      propertyType: string;
      agent: string;
      conditions: string;
      complexName: string;
      reference: string;
      propertyLink: string;
      locationLink: string;
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
              className="dark:bg-zinc-800 border dark:border-zinc-700 dark:ring-offset-neutral-400 dark:text-neutral-50 transition duration-400 shadow bg-zinc-50"
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
