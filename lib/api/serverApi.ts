import { Note } from "@/types/note";
import { nextServer } from "./api";
import { FetchNotesResponse, SessionResponce } from "./clientApi";
import { User } from "@/types/user";
import { cookies} from "next/headers";



async function fetchServerNotes(
  searchValue: string,
  currentPage: number,
  noteTag?: string
) {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
      params: {
      search: searchValue,
      page: currentPage,
      perPage: 12,
      tag: noteTag,
    },
    headers:{Cookie: cookieStore.toString()},
  });

  return response.data;
}


async function fetchServerNoteById(noteId: string) {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {headers:{Cookie: cookieStore.toString()}},);

  return response.data;
}


async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get<SessionResponce>('/auth/session', {headers:{Cookie: cookieStore.toString()}},);

  return res;
}

async function getServerMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
}

export { fetchServerNotes,fetchServerNoteById, checkServerSession, getServerMe};

