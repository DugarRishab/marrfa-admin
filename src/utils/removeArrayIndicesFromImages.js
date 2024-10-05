function removeArrayIndicesFromImages(formData) {
	const newFormData = new FormData();

	// Iterate through the original FormData entries
	for (let [key, value] of formData.entries()) {
		// Check if the key starts with 'images[' and remove array indices if true
		if (key.startsWith("images[")) {
			// Remove array indices, i.e., [0], [1] etc. from the image fields
			const modifiedKey = key.replace(/\[\d+\]/g, "");
			newFormData.append(modifiedKey, value);
		} else {
			// Keep other fields unchanged
			newFormData.append(key, value);
		}
	}

	return newFormData;
}

export default removeArrayIndicesFromImages;