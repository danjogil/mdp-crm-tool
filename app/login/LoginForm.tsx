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

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { Input } from "../components/ui/Input";

import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Successfully logged in!");
        router.push("/dashboard");
        router.refresh();
      }

      if (callback?.error) {
        toast.error("Something went wrong.");
      }
    });
  }
  return (
    <Form {...form}>
      <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input">
        <h2 className="font-bold text-xl sm:text-3xl text-neutral-50">Login</h2>

        <form className="my-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-50">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@mail.com"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-50">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      className="bg-zinc-700 text-neutral-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!isLoading ? (
            <button
              className="bg-gradient-to-br relative group/btn from-zinc-800 to-zinc-800 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:cursor-not-allowed"
              type="submit"
            >
              Login &rarr;
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

export default LoginForm;
