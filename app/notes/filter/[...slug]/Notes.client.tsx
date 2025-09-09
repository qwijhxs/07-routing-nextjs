"use client";

import css from "./page.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchNotes } from "@/lib/api";
import { type Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

interface Props {
  tag: undefined | string
};

export default function NotesClient({ tag }: Props) {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
const [debouncedQuery, setDebouncedQuery] = useState<string>("");

 useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
            setPage(1);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", query, page, tag],
        queryFn: () => fetchNotes(query, page, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false
    });

    const notes: Note[] = data?.notes ?? [];
    const totalPages: number = data?.totalPages ?? 0;

    const handleChange = (value: string): void => {
        setQuery(value);
        setPage(1);
    };

    const handleClose = (): void => {
        setIsModalOpened(false);
    };

    return (
        <div className={css.app}>
          {
            isModalOpened &&
              <Modal onClose={handleClose}>
                <NoteForm
                  onCancel={handleClose}
                />
              </Modal>
          }
	        <header className={css.toolbar}>
            <SearchBox
              searchTextValue={query}
              onChange={handleChange}
            />
            {
              totalPages > 1 &&
                <Pagination
                  onPageChange={setPage}
                  currentPage={page}
                  totalNumberPages={totalPages}
                />
            }
            <button
              className={css.button}
              onClick={() => setIsModalOpened(true)}
            >
              Create note +
            </button>
          </header>
          {
            notes.length === 0 && !isLoading && !isError &&
            <p>Sorry, but there&apos;s no results on this query.</p>
          }
          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong...</p>}
          {
            notes.length !== 0 &&
              <NoteList
                notes={notes}
              />
          }
        </div>
    );
}