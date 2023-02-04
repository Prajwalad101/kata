import { FormInputs } from '@features/register-business/layouts/FormContainer';
import { buildFormData } from 'src/utils/browser';

export function dataToFormData(data: FormInputs) {
  const formData = new FormData();

  buildFormData({ formData, data });

  // add all images to form data
  if (data.images) {
    for (const file of data.images) {
      formData.append('image', file);
    }
  }

  return formData;
}
