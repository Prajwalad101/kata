import * as yup from 'yup';

const nepaliPhoneNumberReg = /^(\+?977)?[9][6-9]\d{8}$/;
const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const registerBusinessFormStep1 = yup.object({
  name: yup
    .string()
    .required('Please enter the business name')
    .min(4, 'Business name is too short')
    .max(50, 'Business name is too long'),
  address: yup
    .string()
    .required('Please provide the address')
    .min(4, 'The address is too')
    .max(30, 'The address is too long'),
  description: yup
    .string()
    .required('Description is required')
    .min(15, 'Description is too short')
    .max(200, 'Description is too long'),
  city: yup.string().required('Please provide the city'),
  workingDays: yup.array().min(1, 'Please select at least 1 working day'),
});

export const registerBusinessFormStep2 = yup.object({
  email: yup
    .string()
    .required('Please provide your business email')
    .matches(emailReg, 'Please provide a valid email'),
  contactNumber: yup
    .string()
    .required('Please provide the contact number')
    .matches(nepaliPhoneNumberReg, 'Please provide a valid number'),
  coordinates: yup
    .array()
    .required('Please set the location of your business')
    .typeError('Please set the location of your business'),
  directions: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .required('Field cannot be empty')
          .min(10, 'Direction is too short')
          .max(30, 'Direction is too long'),
      })
    )
    .max(3, 'Cannot add more than 3 directions')
    .min(1, 'Please provide at least one direction'),
});

export const registerBusinessFormStep3 = yup.object({
  category: yup
    .string()
    .required('Please provide the category of your business'),
  subcategory: yup
    .string()
    .required('Please provide the subcategory of your business'),
  features: yup.array().min(1, 'Please select at least one feature'),
});

export const registerBusinessFormStep4 = yup.object({
  website: yup.string(),
  socials: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required('Field cannot be empty'),
      })
    )
    .max(3, 'Cannot add more than 4 socials')
    .min(1, 'Please provide at least one social'),
  images: yup
    .array()
    .min(3, 'Please upload at least three images')
    .max(30, 'You cannot upload more than 30 images')
    .typeError('Please upload images of your business'),
});
