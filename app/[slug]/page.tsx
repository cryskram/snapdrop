"use client";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

const GET_NOTE = gql`
  query GetNote($slug: String!) {
    getNote(slug: $slug) {
      content
    }
  }
`;

const SAVE_NOTE = gql`
  mutation SaveNote($slug: String!, $content: String!) {
    saveNote(slug: $slug, content: $content) {
      updatedAt
    }
  }
`;

const NotePage = () => {
  const { slug } = useParams();
  const { data } = useQuery(GET_NOTE, { variables: { slug } });
  const [saveNote] = useMutation(SAVE_NOTE);
  const [content, setContent] = useState("");

  const toastIdRef = useRef<string | undefined>(undefined);

  const debouncedSave = useRef(
    debounce(async (value: string) => {
      try {
        await saveNote({ variables: { slug, content: value } });
        if (toastIdRef.current) {
          toast.success("Note saved!", { id: toastIdRef.current });
          toastIdRef.current = undefined;
        }
      } catch (err) {
        if (toastIdRef.current) {
          toast.error("Failed to save note", { id: toastIdRef.current });
          toastIdRef.current = undefined;
        }
      }
    }, 2000)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSave.flush();
    };
  }, []);

  useEffect(() => {
    if (data?.getNote?.content) {
      setContent(data.getNote.content);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (!toastIdRef.current) {
      toastIdRef.current = toast.loading("Saving...");
    }

    debouncedSave(newContent);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 transition-colors">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        /snapnote/{slug}
      </h1>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Start typing your note..."
        className="w-full h-[70vh] p-4 rounded-xl bg-white border border-gray-300 text-lg shadow-2xl text-black "
      />
    </div>
  );
};

export default NotePage;
