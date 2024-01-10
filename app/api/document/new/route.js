import { connectToDB } from "@/utils/database";
import Document from "@/models/document";

export const POST = async (req) => {
  const { userId, escopo, tag } = await req.json();
  let newDoc;

  try {
    await connectToDB();

    newDoc = new Document({
      creator: userId,
      escopo,
      tag,
    });

    await newDoc.save();

    return new Response(JSON.stringify(newDoc), { status: 201 });
  } catch (error) {
    console.log(newDoc);
    console.log("deu ruim");
    return new Response("Failed to insert a new document", { status: 500 });
  }
};
