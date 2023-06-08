interface buildFormDataProps {
  formData: FormData;
  data: object;
  parentKey?: string;
}

/**
 * Provides a way to append all key/value pairs of an object into the FormData instance object.
 * (NOTE: This does not append File or Date objects)
 * @link Reference: https://stackoverflow.com/a/42483509
 * @param props.formData instance object of FormData (this is mutated with values from data object)
 * @param props.data javascript object containing form values
 * @param props.parentKey DO NOT PASS (this is used internally on recursion)
 *
 */
export default function buildFormData({
  formData,
  data,
  parentKey,
}: buildFormDataProps) {
  // don't append File or Date objects
  if (data instanceof File || data instanceof Date) return;

  // recursively go through the object and append key/value pairs to formData
  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach((key) =>
      buildFormData({
        formData,
        data: data[key as keyof typeof data],
        parentKey: parentKey ? `${parentKey}[${key}]` : key,
      })
    );
  } else {
    if (!parentKey || !data) return;
    formData.append(parentKey, data);
  }
}
