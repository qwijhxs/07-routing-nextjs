import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";

import NotesClient from "./Notes.client";

interface Props {
    params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}