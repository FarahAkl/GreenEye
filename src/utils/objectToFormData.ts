export const objectToFormData = (
  obj: any,
  form?: FormData,
  namespace?: string,
): FormData => {
  const formData = form || new FormData();

  for (const property in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, property)) continue;

    const formKey = namespace ? `${namespace}.${property}` : property;
    const value = obj[property];

    if (value === null || value === undefined) continue;

    // Handle File
    if (value instanceof File) {
      formData.append(formKey, value);
    }
    // Handle FileList
    else if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(formKey, value[i]);
      }
    }
    // Handle Date
    else if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    }
    // Handle Arrays
    else if (Array.isArray(value)) {
      value.forEach((element, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (element instanceof File) {
          // If array of files, keep the same key for multiple appends (standard multi-file upload)
          formData.append(formKey, element);
        } else if (typeof element === "object") {
          objectToFormData(element, formData, arrayKey);
        } else {
          formData.append(arrayKey, String(element));
        }
      });
    }
    // Handle Nested Objects (excluding Files)
    else if (typeof value === "object") {
      objectToFormData(value, formData, formKey);
    }
    // Handle Primitives (String, Number, Boolean)
    else {
      formData.append(formKey, String(value));
    }
  }

  return formData;
};
