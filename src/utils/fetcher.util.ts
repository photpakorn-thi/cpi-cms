export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getUrlWithParams(
  url: string,
  params?: Record<string, any>,
  outCall?: boolean
) {
  const useUrl = outCall ? `${API_URL}/${url}` : `/api/${url}`;

  const urlWithParams = params
    ? `${useUrl}?${new URLSearchParams(params)}`
    : `${useUrl}`;
  return urlWithParams;
}
export async function fetchWithGetParams(
  url: string,
  params?: Record<string, any>
) {
  // const urlWithParams = params
  //   ? `${API_URL}/${url}?${new URLSearchParams(params)}`
  //   : `${API_URL}/${url}`;
  const urlWithParams = getUrlWithParams(url, params, true);

  const response = await fetch(urlWithParams, {
    headers: {
      "Content-Type": "application/json",
      // "API-Key": process.env.DATA_API_KEY,
    },
  });
  // if (!response.ok) {
  //   throw new Error(`An error occurred: ${response.statusText}`);
  // }

  return response;
}

export async function fetchWithPostParams(
  url: string,
  data: Record<string, any>
) {
  const response = await fetch(`${API_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "API-Key": process.env.DATA_API_KEY,
    },
    body: JSON.stringify(data),
  });

  // if (!response.ok) {
  //   throw new Error(`An error occurred: ${response.statusText}`);
  // }
  return response;
}

export async function fetchWithPutParams(
  url: string,
  data: Record<string, any>
) {
  const response = await fetch(`${API_URL}/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // if (!response.ok) {
  //   throw new Error(`An error occurred: ${response.statusText}`);
  // }
  return response;
}

export async function fetchWithDelete(url: string) {
  const response = await fetch(`${API_URL}/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if (!response.ok) {
  //   throw new Error(`An error occurred: ${response.statusText}`);
  // }
  return response;
}
