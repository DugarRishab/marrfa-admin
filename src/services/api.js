import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
	// baseURL: "http://localhost:8000/api/v1",
	baseURL: "https://api.marrfa.com/api/v1",
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

export const viewProperty = (id) => api.get(`./property/${id}`);
export const updateProperty = (id, payload) => api.patch('./property/' + id, payload);
export const deleteProperty = (id) => api.delete('./property/' + id);

export const viewUsers = () => api.get('./user/all');
export const viewUser = (id) => api.get("./user/" + id);
export const deleteUser = (id) => api.delete('./user/' + id);
export const updateUser = (id, payload) => api.patch('./user/' + id, payload);
