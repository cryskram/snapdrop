"use client";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

const GET_NOTE = gql`
  query GetNote($slug: String!) {
    getNote(slug: $slug) {
      password
      content
    }
  }
`;

const SAVE_NOTE = gql`
  mutation SaveNote($slug: String!, $content: String!, $password: String) {
    saveNote(slug: $slug, content: $content, password: $password) {
      updatedAt
    }
  }
`;

const NotePage = () => {
  const { slug } = useParams();
  const { data, loading } = useQuery(GET_NOTE, {
    variables: { slug },
    fetchPolicy: "network-only",
  });
  const [saveNote] = useMutation(SAVE_NOTE);
  const [content, setContent] = useState("");
  const [passProtect, setPassProtect] = useState("");
  const [userPass, setUserPass] = useState("");
  const [unlock, setUnlock] = useState(false);

  const toastIdRef = useRef<string | undefined>(undefined);

  const debouncedSave = useRef(
    debounce(async (value: string) => {
      try {
        const variables: Record<string, any> = {
          slug,
          content: value,
        };

        if (passProtect) {
          variables.password = passProtect;
        }

        await saveNote({ variables });

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
    if (!data?.getNote) return;

    const { password, content } = data.getNote;

    setPassProtect(password ?? "");
    if (!password) {
      setUnlock(true);
      setContent(content || "");
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!unlock) return;

    const newContent = e.target.value;
    setContent(newContent);

    if (!toastIdRef.current) {
      toastIdRef.current = toast.loading("Saving...");
    }

    debouncedSave(newContent);
  };

  const handlePassword = () => {
    if (userPass === passProtect) {
      setUnlock(true);
      setContent(data?.getNote?.content || "");
    } else {
      toast.error("Incorrect Password");
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 transition-colors">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        /snapnote/{slug}
      </h1>
      {!unlock && data?.getNote?.password ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          <p className="mb-4 text-gray-700">This note is password protected.</p>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
          />
          <button
            onClick={handlePassword}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-150"
          >
            Unlock
          </button>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Start typing your note..."
          className="w-full h-[70vh] p-4 rounded-xl bg-white border border-gray-300 text-lg focus:outline-none shadow-2xl text-black "
        />
      )}
    </div>
  );
};

export default NotePage;
