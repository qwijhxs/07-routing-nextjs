"use client";

import css from "./page.module.css";

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { useState, useEffect, useCallback } from "react";

import { fetchNotes } from "@/lib/api";

import { type Note } from "@/types/note";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

export default function NotesClient() {
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
            setPage(1);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", debouncedQuery, page],
        queryFn: () => fetchNotes(debouncedQuery, page),
        placeholderData: keepPreviousData,
        refetchOnMount: false
    });

    const notes: Note[] = data?.notes ?? [];
    const totalPages: number = data?.totalPages ?? 0;

    const handleChange = useCallback((value: string): void => {
        setQuery(value);
    }, []);

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