"use client";

import { useTheme } from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/actions/answer.action";
import { AnswerScheme } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

interface AnswerProps {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, questionId, authorId }: AnswerProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<z.infer<typeof AnswerScheme>>({
    resolver: zodResolver(AnswerScheme),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof AnswerScheme>) => {
    const { answer } = data;
    try {
      setIsSubmitting(true);
      await createAnswer({
        content: answer,
        authorId: JSON.parse(authorId),
        questionId: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef?.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button className="light-border-2 btn dark: gap-1.5 rounded-md px-4 text-primary-500 shadow-none">
          <Image
            src="/assets/icons/stars.svg"
            alt="Generate answer"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI answer
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
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
                      content_style:
                        "body { font-family:Inter; font-size:18px }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit py-3 !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
