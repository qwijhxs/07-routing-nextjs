"use client";

import css from "./NoteDetails.module.css";

import { fetchNoteById } from "@/lib/api";

import { useQuery } from "@tanstack/react-query";

interface Props {
  id: string
}

export default function NoteDetailsClient({ id }: Props) {
    const { data: note, isLoading, isError } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError) return <p>Something went wrong...</p>;

    return (
        <div className={css.container}>
	        <div className={css.item}>
	          <div className={css.header}>
	            <h2>{note?.title}</h2>
	          </div>
	          <p className={css.content}>{note?.content}</p>
	          <p className={css.date}>{note?.createdAt}</p>
            <p className={css.tag}>{note?.tag}</p>
	        </div>
        </div>
    );
}