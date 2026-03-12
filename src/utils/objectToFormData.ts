export const objectToFormData = <T extends Record<string, unknown>>(
  data: T,
): FormData => {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key];

    if (value === null || value === undefined) continue;

    if (value instanceof File) {
      formData.append(key, value, value.name); // explicitly pass filename
    } else if (value instanceof FileList) {
      if (value.length > 0) formData.append(key, value[0], value[0].name);
    } else if (typeof value === "object") {
      continue;
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
};
