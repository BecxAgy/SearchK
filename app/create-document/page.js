"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateDocument = () => {
  const [submitting, setSubmitting] = useState(false);
  const [doc, setDoc] = useState({ escopo: "", tag: "" });
  const router = useRouter();
  const { data: session } = useSession();

  const createDoc = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/document/new", {
        method: "POST",
        body: JSON.stringify({
          escopo: doc.escopo,
          userId: session?.user.email,
          tag: doc.tag,
        }),
      });

      if (res.ok) {
        console.log("ok, criou");
        router.push("/");
      }
    } catch (error) {
      console.log("error");
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
