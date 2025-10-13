import axios from 'axios';
import type { CreateNoteRequest, Note } from '../types/note';

axios.defaults.baseURL = "https://notehub-public.goit.study/api";


const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(searchValue: string, currentPage: number, noteTag?:string) {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
    params: {
      search: searchValue,
      page: currentPage,
      perPage: 12,
      tag: noteTag,
    },
  });

  return response.data;
}

async function createNote(formValue: CreateNoteRequest) {
  const response = await axios.post<Note>("/notes", formValue, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return response.data;
}

async function deleteNote(noteId: string) {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return response.data;
}

async function fetchNoteById(noteId: string) {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  
  return response.data;
}


export {
  fetchNotes, createNote, deleteNote, fetchNoteById};
