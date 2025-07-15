"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slug.trim()) router.push(`/${slug.trim()}`);
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
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-focus-within:w-full"></span>
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
