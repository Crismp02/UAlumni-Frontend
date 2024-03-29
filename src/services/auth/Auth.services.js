import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include", // This is necessary for cookies to be sent with the request
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      const error = new Error(data.message);
    error.status = response.status; // Add the status to the error
    throw error;
    }
  } catch (error) {
    if (error.status === 400){
    if (error.message.startsWith("There is no alumni")) {
    toast.error(`Error: No existe ningún alumni con el email ${email}`);
  } else if (error.message.startsWith("The alumni with")){
    toast.error(`Error: El alumni con el email ${email} ya fue registrado`);
  }}}
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include", // Esto es necesario para que las cookies se envíen con la solicitud
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Has iniciado sesión con éxito");
      return data;
    } else {
      const error = new Error(data.message);
    error.status = response.status; // Add the status to the error
    throw error;
    }
  } catch (error) {
    if (error.status === 401){
      if (error.message.startsWith("Invalid credentials")) {
      toast.error(`Error: Credenciales inválidas`);
    }}}
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // Esto es necesario para que las cookies se envíen con la solicitud
    });

    if (response.ok) {
      toast.success("Has cerrado sesión con éxito");
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`);
  }
};

export const confirmEmail = async (email, code) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/verify-registration?token=${code}&email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      toast.success("Email confirmado con éxito");
      return data;
    } else {
      throw new Error(data.statusCode);
    }
  } catch (error) {
    throw error;
  }
};
