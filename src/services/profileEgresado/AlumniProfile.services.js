import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export const getAlumniProfile = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/${id}/resume`, {
        method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
        return data;
        } else {
        throw new Error(data.message);
        }
    } catch (error) {
        throw error;
    }
    };

export const downloadPDF = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/${id}/resume/pdf/download`, {
        method: "GET",
        });
        const data = await response.blob();
        if (response.ok) {
        return data;
        } else {
        throw new Error(data.message);
        }
    } catch (error) {
      throw error;
    }
    }
    export const downloadMyPDF = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/pdf`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.blob();
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw error;
      }
    }
    export const previewPDF = async () => {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume/pdf`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.blob();
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw error;
      }
    };
    
