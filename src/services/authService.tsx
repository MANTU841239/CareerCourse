const API_URL = "http://localhost:5000";



// REGISTER USER

export const registerUser = async (
  email: string,
  password: string
) => {

  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
};



// LOGIN USER

export const loginUser = async (
  email: string,
  password: string
) => {

  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
};