import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { th } from "date-fns/locale";

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
    export const editVisibility = async (newData) => {
        try {
            const response = await fetch(`${BASE_URL}/alumni/me/resume/visibility`, {
              method: 'PATCH',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                isVisible: newData,
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
            isVisible: false,
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
        throw error;
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
            isVisible: false,
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

    export const EditHigherEducationStudy = async (originalTitle, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/higher-education-studies/${originalTitle}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newData.title,
            institution: newData.institution,
            endDate: newData.endDate,
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
        throw error;
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
            isVisible: false,
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
        throw error;
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
            isVisible: false,
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

export const editCiapCourse = async (id, newData) => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/ciap-courses/${id}`, {
          method: 'PATCH',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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

    export const AddWorkExperience = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/work-experiences`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName: newData.companyName,
            position: newData.position,
            description: newData.description,
            startDate: newData.startDate,
            endDate: newData.endDate,
            isVisible: false,
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

    export const getWorkExperienceItem = async (workExperienceNumber) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/work-experiences/${workExperienceNumber}`, {
        method: "GET",
        credentials: "include", 
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
        return (data.data);
        } else {
        throw new Error(data.message);
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
    }

    export const editWorkExperience = async (companyName, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/work-experiences/${companyName}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName: newData.companyName,
            position: newData.position,
            description: newData.description,
            startDate: newData.startDate,
            endDate: newData.endDate,
            isVisible: newData.isVisible,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error)
        toast.error(`Error: ${error.message}`);
        throw error;
      }
    }

    export const DeleteWorkExperience = async (workExperienceNumber) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/work-experiences/${workExperienceNumber}`, {
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
        const response = await fetch(`${BASE_URL}/soft-skills`, {
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

    export const AddSoftSkill = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/soft-skill`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skillName: newData.skillName,
            isVisible: false,
          }),
        });
       
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.message[1]}`);
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
              isVisible: newData.isVisible,
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          toast.error(`Error: ${error.message}`);
          throw error;
        }
      }
      
    export const deleteSoftSkill = async (skillName) => {
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

    export const getTechnicalSkillVisibility = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/skill-category/technical-skill`, {
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

    export const getSkillCategory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/skill-category`, {
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

    export const getTechnicalSkills = async (skillCategory) => {
      try {
        const response = await fetch(`${BASE_URL}/skillCategory/${skillCategory}/technical-skill`, {
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

    export const AddTechnicalSkill = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/skill-category/technical-skill`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skillCategoryName: newData.skillCategoryName,
            skillName: newData.skillName,
            isVisible: false,
          }),
        });
       
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.message[1]}`);
      }
    }

    export const editTechnicalSkill = async (skillCategory, skillName, newData) => {
      try {
          const response = await fetch(`${BASE_URL}/alumni/me/resume/skill-category/${skillCategory}/technical-skill/${skillName}`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              skillCategoryName: newData.skillCategoryName,
              skillName: newData.skillName,
              isVisible: newData.isVisible,
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          toast.error(`Error: ${error.message[1]}`);
        }
      }

    export const deleteTechnicalSkill = async (skillCategory, skillName) => {
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

    export const AddIndustryOfInterest = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/industry-of-interest`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            industryName: newData.industryName,
            isVisible: false,
          }),
        });
       
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.message[1]}`);
      }
    }

    export const editIndustryOfInterest = async (industryName, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/industry-of-interest/${industryName}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            industryName: newData.industryName,
            isVisible: newData.isVisible,
          }),
        });
       
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.message}`);
        throw error; 
      }
    }

    export const getIndustryOfInterestItem = async (industryName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/industry-of-interest/${industryName}`, {
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

    export const deleteIndustryOfInterest = async (industryName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/industry-of-interest/${industryName}`, {
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

    export const AddPositionOfInterest = async (newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/positions-of-interest`, {
          method: 'POST',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            positionName: newData.positionName,
            isVisible: false,
          }),
        });
       
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.message}`);
      }
    }

    export const editPositionOfInterest = async (positionName, newData) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/position-of-interest/${positionName}`, {
          method: 'PATCH',
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            positionName: newData.positionName,
            isVisible: newData.isVisible,
          }),
        });
       
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error.message}`);
        throw error;
      }
    }

    export const getPositionOfInterestItem = async (positionName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/position-of-interest/${positionName}`, {
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

    export const deletePositionOfInterest = async (positionName) => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/position-of-interest/${positionName}`, {
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