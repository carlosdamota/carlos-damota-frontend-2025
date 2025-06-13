export interface ValidateEmailResponse {
  user_id: number;
}

interface ApiError {
  error?: string;
}


export const sendEmailValidationCode = async (email: string) => {
  // Usa ruta relativa con prefijo /api
  const url = `/api/send-email?email=${encodeURIComponent(email)}`;
  
  console.log('Solicitando URL:', url); // Para depuración
  
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    console.error('Error en la respuesta:', response.status, response.statusText);
    let errorMessage = 'Failed to send validation code';
    
    try {
      const text = await response.text();
      errorMessage = text || errorMessage;
    } catch (e) {
      console.error('Error al leer respuesta de error:', e);
    }
    
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (e) {
    console.warn('La respuesta no es JSON, pero la solicitud fue exitosa');
    return {};
  }
};

// Validar código de verificación
export async function validateEmailCode(
  email: string,
  code: string
): Promise<ValidateEmailResponse> {
  const response = await fetch(`/api/validate-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  });

  let data: ValidateEmailResponse & ApiError = { user_id: -1 };
  try {
    data = await response.json();
  } catch (e) {
    throw new Error('Network error or invalid response');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const startTrial = async (userId: number): Promise<void> => {
  try {
    const response = await fetch('/api/start-trial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to start trial');
    }
    
    await response.json();
  } catch (error) {
    console.error('Error starting trial:', error);
    throw error;
  }
};