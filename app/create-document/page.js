"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateDocument = () => {
  const [submitting, setSubmitting] = useState(false);
  const [doc, setDoc] = useState({ file: "", tag: "" });
  const { data: session } = useSession();
  const route = useRouter();

  const createDoc = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/document/new", {
        method: "POST",
        body: {
          file: doc.file,
          userId: session?.user.id,
          tag: doc.tag,
        },
      });

      if (Response.ok) {
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      doc={doc}
      setDoc={setDoc}
      submitting={submitting}
      handleSubmit={createDoc}
    />
  );
};

export default CreateDocument;
