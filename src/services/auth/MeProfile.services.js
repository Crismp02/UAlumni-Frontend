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

    export const editContactInfo = async (newData) => {
        try {
            const response = await fetch(`${BASE_URL}/alumni/me`, {
              method: 'PATCH',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                address: newData.address,
                telephoneNumber: newData.telephoneNumber,
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


    export const getWorkExperience = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/work-experiences`, {
          method: "GET",
          credentials: "include", // This is necessary for cookies to be sent with the request
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
    
    export const AddWorkExperience = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/work-experiences`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newData: newData,
          }),
          credentials: "include", // This is necessary for cookies to be sent with the request
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

    export const getWorkExperienceItem = async (workExperienceNumber) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill/${workExperienceNumber}`, {
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

    export const editWorkExperience = async (workExperienceNumber, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill/${workExperienceNumber}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skillName: newData.skillName,
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

    export const DeleteWorkExperience = async (workExperienceNumber) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill/${workExperienceNumber}`, {
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

    export const getSoftSkills = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill`, {
          method: "GET",
          credentials: "include", // This is necessary for cookies to be sent with the request
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
    
    export const AddSoftSkills = async (skillName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skillName: skillName,
          }),
          credentials: "include", // This is necessary for cookies to be sent with the request
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

    export const getSoftSkillItem = async (skillName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill/${skillName}`, {
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

    export const editSoftSkill = async (skillName, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill/${skillName}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skillName: newData.skillName,
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

    export const DeleteSoftSkills = async (skillName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill/${skillName}`, {
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

    export const getTechnicalSkills = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/technical-skill`, {
          method: "GET",
          credentials: "include", // This is necessary for cookies to be sent with the request
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
    
    export const AddTechnicalSkills = async (skillName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/technical-skill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skillName: skillName,
          }),
          credentials: "include", // This is necessary for cookies to be sent with the request
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

    export const getTechnicalSkillItem = async (skillName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/technical-skill/${skillName}`, {
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

    export const editTechnicalSkill = async (skillName, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/technical-skill/${skillName}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skillName: newData.skillName,
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

    export const DeleteTechnicaltSkills = async (skillCategory,skillName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/skill-category/${skillCategory}/technical-skill/${skillName}`, {
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

    export const getCiapCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ciap-courses`, {
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
    }

    export const AddCiapCourse = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/ciap-courses`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: newData.id,
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

    export const getCiapCourseItem = async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/ciap-courses/${id}`, {
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