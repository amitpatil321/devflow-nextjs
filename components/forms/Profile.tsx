"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import paths from "@/constants/paths";
import { updateProfile } from "@/lib/actions/user.actions";
import { ProfileValidationSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface ProfileProps {
  userInfo: string;
}

export const Profile = ({ userInfo }: ProfileProps) => {
  const router = useRouter();
  const { name, username, portfolioWebsite, location, bio } =
    JSON.parse(userInfo);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof ProfileValidationSchema>>({
    resolver: zodResolver(ProfileValidationSchema),
    defaultValues: {
      name: name || "",
      username: username || "",
      portfolioWebsite: portfolioWebsite || "",
      location: location || "",
      bio: bio || "",
    },
    mode: "onChange",
  });

  async function onSubmit(formData: z.infer<typeof ProfileValidationSchema>) {
    const { _id, clerkId } = JSON.parse(userInfo);
    const { name, username, portfolioWebsite, location, bio } = formData;
    setIsSubmitting(true);
    try {
      await updateProfile({
        userId: _id,
        name,
        username,
        portfolioWebsite,
        location,
        bio,
        path: `${paths.profile}/${clerkId}`,
      });

      router.back();
      //   redirect(`${paths.profile}/${clerkId}`);
    } catch (err: any) {
      console.log(err);
      throw new Error("Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="bg-background light-border-2 paragraph-regular min-h-[56px] text-dark300_light700 no-focus background-light800_dark300"
                  placeholder="Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="bg-background light-border-2 paragraph-regular min-h-[56px] text-dark300_light700 no-focus background-light800_dark300"
                  placeholder="Your Username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Portfolio Link
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="bg-background light-border-2 paragraph-regular min-h-[56px] text-dark300_light700 no-focus background-light800_dark300"
                  placeholder="Portfolio Link"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Location
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="bg-background light-border-2 paragraph-regular min-h-[56px] text-dark300_light700 no-focus background-light800_dark300"
                  placeholder="Where are you from?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Textarea
                  className="bg-background light-border-2 paragraph-regular text-dark300_light700 no-focus background-light800_dark300"
                  placeholder="Tell us more about yourself"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            className="px-4 py-3 w-fit !text-light-900 primary-gradient"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
