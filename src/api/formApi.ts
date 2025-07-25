export const fetchFormSchema = async () => {
  const res = await fetch('https://sharejson.com/api/v1/uzjxOUc_5VccqT-1XiEYf');
  if (!res.ok) throw new Error('Failed to fetch schema');
  return res.json();
};