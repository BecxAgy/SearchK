import { requestConfig } from "@/utils/config";

export const GET = async (request) => {
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(
      api + `searchsynonyms?index=kempetro&body=${request}`,
      config
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch documents. Status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch documents", { status: 500 });
  }
};
