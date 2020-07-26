import * as Yup from 'yup';

export const commentCreateSchema = Yup.object().shape({
  content: Yup.string()
    .max(2000, "content is too long"),
})
