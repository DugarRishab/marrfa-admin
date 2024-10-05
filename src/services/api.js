import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
	// baseURL: "http://localhost:8000/api/v1",
	baseURL: "http://15.207.55.100/api/v1",
	withCredentials: true,
});


export const loginAuth = (payload) => api.post("./auth/login", payload);
export const signupAuth = (payload) => api.post("./auth/signup", payload);
export const logoutAuth = () => api.get("./auth/logout");

export const viewProperties = () => api.get("./property/");
export const createProperty = (payload) =>
	api.post("./property/", payload, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});