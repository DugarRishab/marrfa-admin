import React, { useState, useEffect } from 'react';
import PropertyForm from "./PropertyForm";
import { updateProperty, viewProperty } from '../../services/api';
import { message } from 'antd';
import { useParams } from 'react-router-dom';

const EditProperty = () => {

	const params = useParams();
	const [property, setProperty] = useState()

	const handleGetData = async () => {
		const { id } = params;
		try {
			if (id) {
				const res = await viewProperty(id);
				setProperty(res.data.data.property);
				console.log(res.data.data.property);
			}
		} catch (err) {
			message.error(err.response.data.message | err.message);
		}
	};

	useEffect(() => {
		handleGetData();
	}, []);

	return (
		<div className="sub-main">
			<h2>Upload Property</h2>
			{property && <PropertyForm property={property} onSubmit={updateProperty}></PropertyForm>}
		</div>
	);
}
 
export default EditProperty;