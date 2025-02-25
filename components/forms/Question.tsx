"use client";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import paths from "@/constants/paths";
import { useTheme } from "@/context/ThemeProvider";
import { createQuestion } from "@/lib/actions/question.action";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "../ui/badge";

const actiontype: string = "create";

interface props {
  userId: string;
}

const Question = ({ userId }: props) => {
  const { theme } = useTheme();
  const editorRef = useRef<Editor | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof AskQuestionSchema>) {
    setSubmitting(true);
    const { title, explanation, tags } = values;
    try {
      await createQuestion({
        title,
        content: explanation,
        tags,
        author: JSON.parse(userId.toString()),
        path: pathname,
      });
      router.push(paths.home);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  }

  const handleTagInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: {
      name: string;
      value: string[];
      onChange: (value: string[]) => void;
    },
  ) => {
    if (event.key === "Enter" && field.name === "tags") {
      event.preventDefault();
      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else form.trigger();
    }
  };

  const handleRemoveTags = (tag: string, field: { value: string[] }) => {
    form.setValue(
      "tags",
      field.value.filter((each: string) => each !== tag),
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="light-border-2 paragraph-regular text-dark300_light700 no-focus background-light700_dark300 min-h-[56px]"
                  placeholder="Question Title"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Explanation <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  key={theme}
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(_evt, editor) => {
                    editorRef.current = editor as unknown as Editor;
                  }}
                  onEditorChange={(content) => {
                    field.onChange(content);
                  }}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "anchor",
                      "autolink",
                      "codesample",
                      "help",
                      "image",
                      "link",
                      "lists",
                      "searchreplace",
                      "table",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo |" +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:18px }",
                    skin: theme === "dark" ? "oxide-dark" : "oxide",
                    content_css: theme === "dark" ? "dark" : "light",
                  }}
                  // {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title,
                Minumum 20 characters. person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="light-border-2 paragraph-regular text-dark300_light700 no-focus background-light700_dark300 min-h-[56px]"
                    placeholder="Add tags..."
                    onKeyDown={(event) => handleTagInput(event, field)}
                    autoComplete="off"
                  />
                  <RenderTags
                    field={field}
                    handleRemoveTags={handleRemoveTags}
                  />
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add upto 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          className="primary-gradient w-fit px-4 py-3 !text-light-900"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{actiontype === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{actiontype === "edit" ? "Edit Question" : "Ask a Questions"} </>
          )}
        </Button>
      </form>
    </Form>
  );
};

const RenderTags = ({
  field,
  handleRemoveTags,
}: {
  field: { value: string[] };
  handleRemoveTags: (tag: string, field: { value: string[] }) => void;
}) => {
  if (!Array.isArray(field.value) || field.value.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {field.value.map((tag) => (
        <Badge
          key={tag}
          className="item-center text-light400_light500 subtle-medium background-light800_dark300 flex justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
          onClick={() => handleRemoveTags(tag, field)}
        >
          {tag}
          <Image
            src="/assets/icons/close.svg"
            alt="Close Icon"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
          />
        </Badge>
      ))}
    </div>
  );
};

export default Question;
