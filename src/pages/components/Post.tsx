import React, { useState } from "react";
import { z } from "zod";
import { api } from "../../utils/api";
// import useMarkdownText from "./hooks/useMarkdownText";

// Markdown Library needed

// Requirements for the post:
export const codeSchema = z.object({
  code: z
    .string({
      required_error: "Code is required",
    })
    .min(10)
    .max(280),
  markdownOne: z.string({
    required_error: "Markdown is required",
  }),
  markdownTwo: z.string({
    required_error: "Markdown is required",
  }),
});

const Post = () => {
  const [code, setCode] = useState("");
  const [markdownOne, setMarkdownOne] = useState("");
  const [markdownTwo, setMarkdownTwo] = useState("");

  const createPost = api.post.createPost.useMutation();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(code);
    console.log(markdownOne);
    console.log(markdownTwo);

    if (code.length < 1) return "too short";
    if (code.length > 280) return "too long";

    try {
      codeSchema.parse({ code, markdownOne, markdownTwo });
    } catch (e) {
      return;
    }

    createPost.mutate({ code, markdownOne, markdownTwo });
    setCode("");
  };

  return (
    <>
      {createPost.error && (
        <p className="text-red-500">{createPost.error.message}</p>
      )}
      <div className="m-4 mb-12">
        <form onSubmit={handleSubmit}>
          <textarea
            rows={3}
            className="w-[30ch] resize-none rounded-md"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex justify-center">
            <textarea
              className="height-[150ch] m-6 w-[50ch] resize-none rounded-md"
              rows={10}
              onChange={(e) => setMarkdownOne(e.target.value)}
            />
            <textarea
              className="height-[150ch] m-6 w-[50ch] resize-none rounded-md"
              rows={10}
              onChange={(e) => setMarkdownTwo(e.target.value)}
            />
          </div>
          <br />
          <button
            type="submit"
            className="rounded border-b-4 border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
