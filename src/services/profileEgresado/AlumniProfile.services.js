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
        toast.error(`Error: ${error.message}`);
    }
    };

export const downloadPDF = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/${id}/resume/pdf`, {
        method: "GET",
        });
        const data = await response.blob();
        if (response.ok) {
        return data;
        } else {
        throw new Error(data.message);
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
    }
