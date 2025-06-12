const API_URL = import.meta.env.VITE_API_URL;
export async function sendEmailValidationCode(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/send-email-validation-code?email=${encodeURIComponent(email)}`);
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Something went wrong');
  }
}