'use client';

import css from './NoteForm.module.css';
import * as Yup from 'yup';
import type { CreateNoteRequest, NoteTag } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useNoteDraft } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/clientApi';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const defaultFormValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content should not exceed 500 characters.'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Choose one of tags'),
});

function NoteForm() {
  const router = useRouter();
  const handleCancel = () => router.back();

  const { draft, setDraft, clearDraft } = useNoteDraft();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setDraft({
      ...draft,
      [name]: value,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteRequest) => createNote(newNote),
    onSuccess: async () => {
      toast.success('Note successfully uploaded');
      await queryClient.invalidateQueries({
        queryKey: ['notesList'],
      });
      clearDraft();
      router.push('/notes/filter/All');
    },
    onError: error => {
      toast.error(`${error.message}`);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateNoteRequest;

    mutation.mutate(values);
  };

  return (
    <form
      className={css.form}
      // initialValues={defaultFormValues}
      // validationSchema={NoteFormSchema}
      action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        {/* <ErrorMessage name="title" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        {/* <ErrorMessage name="content" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
