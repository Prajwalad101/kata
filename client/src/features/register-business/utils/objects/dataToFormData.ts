import { buildFormData } from 'src/utils/browser';

export function dataToFormData(data: any) {
  const formData = new FormData();

  buildFormData({ formData, data });

  //! Fix: Price is not uploaded by user
  formData.append('price', 'medium');

  // add all images to form data
  for (const file of data.images) {
    formData.append('image', file);
  }

  return formData;
}
