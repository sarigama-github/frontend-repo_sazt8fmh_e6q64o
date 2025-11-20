export const API_BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export async function apiPost(path, data) {
  const res = await fetch(`${API_BASE}${path}` ,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
