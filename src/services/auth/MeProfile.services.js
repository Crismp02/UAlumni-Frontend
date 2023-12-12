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

    export const getHigherEducationStudies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/higher-education-studies`, {
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

    export const AddHigherEducationStudy = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/higher-education-studies`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newData.title,
            institution: newData.institution,
            endDate: newData.endDate,
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

    export const getHigherEducationStudy = async (title) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/higher-education-studies/${title}`, {
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

    export const EditHigherEducationStudy = async (title, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/higher-education-studies/${title}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newData.title,
            description: newData.description,
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

    export const DeleteHigherEducationStudy = async (title) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/higher-education-studies/${title}`, {
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
    }

    export const getLanguage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/language`, {
        method: "GET",
        credentials: "include", 
        });
        const data = await response.json();
        if (response.ok) {
        return data.data.items;
        } else {
        throw new Error(data.message);
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
    };

    export const getLanguagesAlumni = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/language`, {
        method: "GET",
        credentials: "include", 
        });
        const data = await response.json();
        if (response.ok) {
        return data.data;
        } else {
        throw new Error(data.message);
        }
    }
    catch (error) {
        toast.error(`Error: ${error.message}`);
    }
    };

    export const AddLanguage = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/language`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            languageName: newData.languageName,
            masteryLevel: newData.masteryLevel,
            isVisible: newData.isVisible,
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

    export const getLanguageItem = async (languageName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/language/${languageName}`, {
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
    }

    export const editLanguage = async (languageName, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/language/${languageName}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            languageName: newData.languageName,
            masteryLevel: newData.masteryLevel,
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

    export const DeleteLanguage = async (languageName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/language/${languageName}`, {
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
    }