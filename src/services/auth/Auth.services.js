import { toast } from 'react-toastify';

export const registerUser = async (email, firstName, lastName, password) => {
  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: email, 
        names: firstName, 
        surnames: lastName, 
        password: password 
      }),
      credentials: 'include', // This is necessary for cookies to be sent with the request
    });
    const data = await response.json();
    if (response.ok) {     
      return data;
    } else {
      throw new Error(data.message); 
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`);
  }
};