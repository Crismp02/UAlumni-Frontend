import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export const getMeProfile = async () => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume`, {
        method: "GET",
        credentials: "include", 
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

export const editAboutMe = async (newData) => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numberOfDownloads: newData.numberOfDownloads,
            isVisible: newData.isVisible,
            aboutMe: newData.aboutMe,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };