"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const DocumentCard = ({ doc, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(doc.escopo);
    navigator.clipboard.writeText(doc.escopo);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={"/assets/images/profile.jpg"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {doc._id}
            </h3>
            <p className="font-inter text-sm text-gray-500"></p>
          </div>
        </div>

        {/* <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === doc.escopo
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === doc.escopo ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div> */}
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700"></p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(doc.tag)}
      >
        Page {doc._source.page}
      </p>
    </div>
  );
};

export default DocumentCard;
