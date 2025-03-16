"use client";

import { CHATGPT } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/actions/answer.action";
import { requestLogin } from "@/lib/utils";
import { AnswerScheme } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

    if (!authorId) return requestLogin();

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

      return toast.success("Answer submitted successfully");
    } catch (error) {
      toast.error("Error submitting answer");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const parseCodeBlocks = (text: string) => {
    return text.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
      const language = lang || "plaintext";
      return `<pre><code class="language-${language}">${escapeHTML(code)}</code></pre>`;
    });
  };

  const escapeHTML = (str: string) => {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const generateAIAnswer = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/${CHATGPT}`,
        {
          method: "post",
          body: JSON.stringify({ question }),
        },
      );
      const AIresponse: { success: string; data: any } = await response.json();
      if (AIresponse.success) {
        if (editorRef.current) {
          const editor = editorRef.current as any;
          const formattedResponse = parseCodeBlocks(AIresponse.data);
          editor.setContent(formattedResponse);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          className="light-border-2 btn dark: gap-1.5 rounded-md px-4 text-primary-500 shadow-none"
          onClick={() => generateAIAnswer()}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="Generate answer"
            width={12}
            height={12}
            className="object-contain"
          />
          {isLoading ? "Generating Answer..." : "Generate an AI answer"}
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
                      codesample_languages: [
                        { text: "JavaScript", value: "javascript" },
                        { text: "TypeScript", value: "typescript" },
                        { text: "Python", value: "python" },
                        { text: "HTML", value: "xml" },
                        { text: "CSS", value: "css" },
                        { text: "Bash", value: "bash" },
                        { text: "JSON", value: "json" },
                        { text: "Plain Text", value: "plaintext" },
                      ],
                      valid_elements: "pre[class|style],code[class]",
                      extended_valid_elements: "pre[class|style],code[class]",
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
