import { api, requestConfig } from "@/utils/config";

export const GET = async () => {
  console.log(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  );
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(
      api + `searchsynonyms?index=kempetro&body=}`,
      config
    );
    console.log("passou");

    if (!response.ok) {
      throw new Error(
        `___|___Failed to fetch documents. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("____Failed to fetch documents", { status: 500 });
  }
};
