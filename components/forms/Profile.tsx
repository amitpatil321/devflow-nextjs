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
import { updateProfile } from "@/lib/actions/user.action";
import { ProfileValidationSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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

      toast.success("Profile updated successfully");

      router.back();
    } catch (error: any) {
      toast.error("Error updating profile");
      throw new Error("Error updating profile", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
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
                  className="bg-background light-border-2 paragraph-regular text-dark300_light700 no-focus background-light800_dark300 min-h-[56px]"
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
                  className="bg-background light-border-2 paragraph-regular text-dark300_light700 no-focus background-light800_dark300 min-h-[56px]"
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
                  className="bg-background light-border-2 paragraph-regular text-dark300_light700 no-focus background-light800_dark300 min-h-[56px]"
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
                  className="bg-background light-border-2 paragraph-regular text-dark300_light700 no-focus background-light800_dark300 min-h-[56px]"
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
            className="primary-gradient w-fit px-4 py-3 !text-light-900"
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
