import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export const getAlumniProfile = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/${email}/resume`, {
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

export const downloadPDF = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/alumni/${email}/resume/pdf`, {
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
