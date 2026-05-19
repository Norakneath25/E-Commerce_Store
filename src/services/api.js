const url = "https://fakestoreapi.com";

export const request = async (endpoint) => {
  try {
    const response = await fetch(`${url}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
