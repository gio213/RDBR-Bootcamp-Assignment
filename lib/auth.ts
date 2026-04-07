import { cookies } from "next/headers";
import type { User } from "@/types/auth";
import { api } from "./api";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await api.get<{ data: User }>("me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return res.data ?? null;
  } catch (error) {
    if (
      error instanceof Error &&
      /unauthenticated|unauthorized|401/i.test(error.message)
    ) {
      return null;
    }

    throw error;
  }
}
