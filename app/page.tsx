"use client";

import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const GET_NOTE = gql`
  query GetNote($slug: String!) {
    slug
  }
`;

const SAVE_NOTE = gql`
  mutation SaveNote($slug: String!, $content: String!, $password: String) {
    saveNote(slug: $slug, content: $content, password: $password) {
      updatedAt
    }
  }
`;

export default function HomePage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [pass, setPass] = useState("");
  const [isPass, setIsPass] = useState(false);
  const [saveNote] = useMutation(SAVE_NOTE);
  const [getNote] = useLazyQuery(GET_NOTE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSlug = slug.trim();
    if (!newSlug) return;

    try {
      const { data } = await getNote({ variables: { slug: newSlug } });

      if (!data?.getNote) {
        await saveNote({
          variables: {
            slug: newSlug,
            password: isPass ? pass : "",
            content: "",
          },
        });
      }

      router.push(`/${newSlug}`);
    } catch (e) {
      console.error("Error creating note:", e);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-100 font-sans text-gray-800">
      <main className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-xl bg-white/60 border border-gray-200 rounded-2xl shadow-xl backdrop-blur-md p-10 md:p-12 space-y-8 animate-fade-in">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Span
              <span className="bg-blue-600 text-white px-2 rounded-xl">
                Drop
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto mt-4">
              Create and share quick notes... no sign-ups, just a link away.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. my-ideas, book-list"
                className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 bg-transparent text-lg placeholder-gray-400 focus:outline-none transition duration-300 pb-2"
                aria-label="Note slug"
              />
              <label className="inline-flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={isPass}
                  onChange={(e) => setIsPass(e.target.checked)}
                />
                Password Protected
              </label>

              {isPass && (
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 bg-transparent text-lg placeholder-gray-400 focus:outline-none transition duration-300 pb-2 mt-4"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-md hover:shadow-lg transform transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Open Note <FaArrowRight />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
