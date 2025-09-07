import axios from "axios";
import { type Note } from "@/types/note";

interface GetResponse {
    notes: Note[],
    totalPages: number
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export async function fetchNotes(query: string, page: number, tag?: string): Promise<GetResponse> {
    const response = await axios.get<GetResponse>("/notes", {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        },
        params: {
            search: query,
            tag: tag,
            page: page,
            perPage: 12
        }
    });

    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await axios.get<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    });

    return response.data;
}

export async function createNote(title: string, content: string, tag: string): Promise<Note> {
    const response = await axios.post<Note>("/notes", {
        title: title,
        content: content,
        tag: tag
    }, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    });

    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await axios.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        }
    });

    return response.data;
}