import { CreateNoteRequest } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type NoteDraft = {
  draft: CreateNoteRequest;
  setDraft: (note: CreateNoteRequest) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteRequest = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraft = create<NoteDraft>()(
  persist((set) => ({
  draft: initialDraft,
  setDraft: (note:CreateNoteRequest) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
  }),
{name: 'note-draft',
    partialize: (state) =>({draft: state.draft}),
  }
  ));