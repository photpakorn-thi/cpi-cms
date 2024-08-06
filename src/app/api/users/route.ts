import { fetchWithGetParams } from "@/utils/fetcher.util";

const baseUrl = "users";

export async function GET(request: Request) {
  const { searchParams: params } = new URL(request.url);
  console.log({ url: request.url, params });
  //   const res = await fetch("https://data.mongodb-api.com/...", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "API-Key": process.env.DATA_API_KEY || "123",
  //     },
  //   });
  //   const data = await res.json();

  //   return Response.json({ data: [] });
  // fetchWithGetParams
  try {
    const res = await fetchWithGetParams(baseUrl, params);
    if (res.ok) {
      //   return await res.json();
      const data = await res.json();
      return Response.json(data);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
