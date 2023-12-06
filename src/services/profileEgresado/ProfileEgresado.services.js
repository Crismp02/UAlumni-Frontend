import { toast } from 'react-toastify';

export const addSoftSkills = async (name) => {
    try {
      const response = await fetch('http://localhost:3000/softs-kills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name, 
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

  export const getLanguage = async (name) => {
    try {
      const response = await fetch('http://localhost:3000/language', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name, 
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