import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL ||
  process.env.CONVEX_URL ||
  "https://dummy-convex-url.convex.cloud";

export const convex = new ConvexHttpClient(convexUrl);

export { api };

/**
 * Safely execute a Convex query on the server side with error handling
 */
export async function convexQuery<T = any>(
  queryRef: any,
  args: Record<string, any> = {}
): Promise<T | null> {
  try {
    return (await convex.query(queryRef, args)) as T;
  } catch (error) {
    console.error("Convex Query Error:", error);
    return null;
  }
}

/**
 * Safely execute a Convex mutation on the server side with error handling
 */
export async function convexMutation<T = any>(
  mutationRef: any,
  args: Record<string, any> = {}
): Promise<T | null> {
  try {
    return (await convex.mutation(mutationRef, args)) as T;
  } catch (error) {
    console.error("Convex Mutation Error:", error);
    return null;
  }
}
