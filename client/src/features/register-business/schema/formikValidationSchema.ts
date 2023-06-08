import * as Yup from 'yup';

export const formikValidationSchema = Yup.object({
  name: Yup.string()
    .max(40, 'Must be 40 characters or less')
    .required('This field is required'),
  description: Yup.string()
    .max(250, 'Must be 250 characters or less')
    .required('This field is required'),
  location: Yup.object().shape({
    address: Yup.string()
      .max(40, 'Must be 40 characters or less')
      .required('This field is required'),
    coordinates: Yup.array().of(
      Yup.number().notOneOf([0, undefined], 'Please select your coordinates')
    ),
  }),
  images: Yup.array().min(2, 'Upload at least 2 images'),
});
