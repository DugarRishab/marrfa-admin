 const jsonToFormData = (json, formData = new FormData(), parentKey = "") => {
	if (json && typeof json === "object" && !(json instanceof File)) {
		Object.keys(json).forEach((key) => {
			const fullKey = parentKey ? `${parentKey}[${key}]` : key;
			const value = json[key];

			// Recursively call the function for nested objects and arrays
			if (Array.isArray(value)) {
				value.forEach((val, index) => {
					jsonToFormData(val, formData, `${fullKey}[${index}]`);
				});
			} else if (typeof value === "object" && value !== null) {
				jsonToFormData(value, formData, fullKey);
			} else {
				formData.append(fullKey, value);
			}
		});
	} else {
		formData.append(parentKey, json);
	}

	return formData;
};

export default jsonToFormData;