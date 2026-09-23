export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 503) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function assertApiConfigured(): void {
  const baseUrl =
    process.env.CAPITAL_API_BASE_URL ??
    process.env.NEXT_PUBLIC_CAPITAL_API_URL ??
    "";

  if (!baseUrl.trim()) {
    throw new ApiError(
      "Capital API is not connected yet. Set CAPITAL_API_BASE_URL when the backend is available.",
    );
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  assertApiConfigured();

  const baseUrl = (
    process.env.CAPITAL_API_BASE_URL ??
    process.env.NEXT_PUBLIC_CAPITAL_API_URL ??
    ""
  ).replace(/\/$/, "");

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(`API request failed (${response.status})`, response.status);
  }

  return (await response.json()) as T;
}
