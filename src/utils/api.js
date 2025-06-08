export function buildFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}