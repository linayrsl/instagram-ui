import * as Yup from 'yup';
export const PostCreateSchema = Yup.object().shape({
    image: Yup.string(),
    description: Yup.string()
});