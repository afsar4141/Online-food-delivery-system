const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(API_URL + path, {
    method,
    headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
    body: body && JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) throw new Error(data.message || "Something went wrong");
  return data;
}

export const getRestaurants = () => request("/resturant/getAll");
export const getMenu = (id) => request(`/food/getByResturant/${id}`);
export const registerUser = (form) => request("/auth/register", { method: "POST", body: form });
export const loginUser = (email, password) => request("/auth/login", { method: "POST", body: { email, password } });
// backend sums each item's price, so send one entry per quantity
export const placeOrder = (items, token) => request("/food/placeorder", { method: "POST", token, body: { cart: items } });
