import { Button, Flex, Input, List, Segmented, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { viewProperties } from "../../services/api";
import {
	DeleteOutlined,
	EditOutlined,
	SlidersOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PropertyForm from "./PropertyForm";

const uploadOptions = [
	'Bulk Upload', 'Manual Upload'
];

const UploadProperty = () => {
	const [uploadOption, setUploadOption] = useState(uploadOptions[1]);

	return (
		<div className="sub-main">
			<h2>Upload Property</h2>
			<p>Upload property in Bulk or upload manually</p>
			<Segmented
				options={[...uploadOptions]}
				defaultValue={uploadOptions[1]}
				color="primary"
				value={uploadOption}
				onChange={setUploadOption}
				
			></Segmented>
			<br /><br />
			{
				uploadOption === uploadOptions[1] && (<PropertyForm></PropertyForm>)
			}
		</div>
	);
};

export default UploadProperty;
