"use client";

import css from "./NotePreview.module.css";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";

import Modal from "@/components/Modal/Modal";


interface Props {
    id: string
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
      refetchOnMount: false
  });

  const handleClose = (): void => router.back();

  if (isLoading) return (
    <Modal onClose={handleClose}>
      <p>Loading, please wait...</p>

      <button
        type="button"
        onClick={handleClose}
        className={css.backBtn}
      >
        Close
      </button>
    </Modal>
  );
  if (isError) return (
    <Modal onClose={handleClose}>
      <p>Something went wrong...</p>

      <button
        type="button"
        onClick={handleClose}
        className={css.backBtn}
      >
        Close
      </button>
    </Modal>
  );

  return (
    <Modal onClose={handleClose}>
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
      
      <button
        type="button"
        onClick={handleClose}
        className={css.backBtn}
      >
        Close
      </button>
    </Modal>
  );
}