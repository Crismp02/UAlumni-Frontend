import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { sync } from "framer-motion";

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

    export const getPortfolioItem = async (title) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/portfolio-item/${title}`, {
        method: "GET",
        credentials: "include", 
        });
        const data = await response.json();
        if (response.ok) {
        return (data.data);
        } else {
        throw new Error(data.message);
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
    };

    export const getPortfolio = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/portfolio-item`, {
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

    export const AddPortfolioItem = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/portfolio-item`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newData.title,
            sourceLink: newData.sourceLink,
            isVisible: true,
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
    }

    export const EditPortfolioItem = async (title, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/portfolio-item/${title}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newData.title,
            sourceLink: newData.sourceLink,
            isVisible: true,
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

    export const DeletePortfolioItem = async (title) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/portfolio-item/${title}`, {
          method: 'DELETE',
          credentials: "include", 
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