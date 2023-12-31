import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export const getJobOffer = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/job-offers/${id}`, {
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
    }

    export const postJobApplication = async (id) => {
        console.log(new Date().toISOString())
        try {
            const response = await fetch(`${BASE_URL}/alumni/me/job-applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jobOfferId: id,
                applicationTimestamp: new Date().toISOString(),
            }),
            credentials: "include", // Esto es necesario para que las cookies se envíen con la solicitud
            });
            const data = await response.json();
            console.log("a",data)
            if (response.ok) {
            return data;
            } else {
            throw new Error(data.message);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
        }