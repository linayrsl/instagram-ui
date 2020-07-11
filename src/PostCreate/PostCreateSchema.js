import * as Yup from 'yup';

export const PostCreateSchema = Yup.object().shape({
    description: Yup.string()
      .max(2000, "description is too long"),
});
