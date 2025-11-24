export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function clearToken(): void {
  localStorage.removeItem('token');
}
