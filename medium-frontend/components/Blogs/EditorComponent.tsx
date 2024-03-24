"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { urls } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function EditorComponent() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const ref = useRef<EditorJS>();
  const { data: session } = useSession() as any;
  let token = "";

  if (session?.user) {
    token = session.user.token;
  }

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/nested-list")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Checklist = (await import("@editorjs/checklist")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          heading: Header,
          list: List,
          simpleImage: SimpleImage,
          embed: Embed,
          checklist: Checklist,
          code: Code,
          inlineCode: InlineCode,
        },
        autofocus: true,
      });

      ref.current = editor;
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, [isMounted]);

  const save = async () => {
    if (ref.current) {
      const data = await ref.current.save();
      return data;
    }
  };

  const submit = async () => {
    //stringify the data and save
    // then when the data comes to the frontend parse it and the use the data.
    const content = await save();
    const { data } = await axios.post(
      `${urls.BACKEND_URL}/api/v1/posts/create`,
      {
        title,
        content: JSON.stringify(content),
        published: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data);
    toast("blog created");
  };

  return (
    <div className="max-w-[1000px] w-11/12 mx-auto mt-10 p-10">
      <div className="md:mb-10 md:mx-20">
        <Input
          placeholder="Enter the title of the Blog"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div id="editorjs" />
      <Button onClick={submit} className="md:mx-20">
        Save
      </Button>
    </div>
  );
}
