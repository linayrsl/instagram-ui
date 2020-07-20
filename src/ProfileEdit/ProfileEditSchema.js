import * as Yup from 'yup';

export const ProfileEditSchema = Yup.object().shape({
  biography: Yup.string()
    .max(2000, "description is too long"),
})
