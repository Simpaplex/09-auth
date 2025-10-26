import { User } from "@/types/user";
import { nextServer } from "./api";
import { CreateNoteRequest, Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(
  searchValue: string,
  currentPage: number,
  noteTag?: string
) {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
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
  const response = await nextServer.post<Note>('/notes', formValue);

  return response.data;
}

async function deleteNote(noteId: string) {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

async function fetchNoteById(noteId: string) {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);

  return response.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

async function register(body: RegisterRequest) {
  const response = await nextServer.post<User>('/auth/register', body);

  return response.data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

async function logIn(body: LoginRequest) {
  const response = await nextServer.post<User>('/auth/login', body);

  return response.data;
}


export interface SessionResponse {
  success: boolean;
}

async function checkSession() {
  const {data} = await nextServer.get<SessionResponse>('/auth/session');

  return data.success;
}

async function getMe() {
  const {data} = await nextServer.get<User>('/users/me');

  return data;
}

async function logOut():Promise<void> {
  await nextServer.post('/auth/logout');
}

export interface UpdateRequest {
  email: string;
  username: string;
}

async function updateMe(body: UpdateRequest) {
  const response = await nextServer.patch<User>('/users/me', body);

  return response.data;
}



export {
  fetchNotes,
  createNote,
  deleteNote,
  fetchNoteById,
  register,
  logIn,
  checkSession,
  getMe,
  logOut,
  updateMe
};
