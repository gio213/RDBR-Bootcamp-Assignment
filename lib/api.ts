// lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestOptions<B = unknown> = Omit<RequestInit, "body"> & {
  body?: B;
};

async function request<TResponse, TBody = unknown>(
  endpoint: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const { body, headers, ...rest } = options;

  const isFormData = body instanceof FormData;

  const res = await fetch(`${API_URL}/${endpoint}`, {
    ...rest,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(headers ?? {}),
    },
    body: isFormData
      ? body
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<TResponse>;
}

export const api = {
  get: <TResponse>(endpoint: string, options?: RequestOptions) =>
    request<TResponse>(endpoint, { method: "GET", ...options }),

  post: <TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions<TBody>,
  ) =>
    request<TResponse, TBody>(endpoint, { method: "POST", body, ...options }),

  put: <TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions<TBody>,
  ) => request<TResponse, TBody>(endpoint, { method: "PUT", body, ...options }),

  patch: <TResponse, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions<TBody>,
  ) =>
    request<TResponse, TBody>(endpoint, { method: "PATCH", body, ...options }),

  delete: <TResponse>(endpoint: string, options?: RequestOptions) =>
    request<TResponse>(endpoint, { method: "DELETE", ...options }),
};
