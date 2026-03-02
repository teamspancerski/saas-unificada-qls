export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('aurex_token')}` }
    });
    return res.json();
  },
  post: async (path: string, body: any) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('aurex_token')}`
      },
      body: JSON.stringify(body)
    });
    return res.json();
  }
};
