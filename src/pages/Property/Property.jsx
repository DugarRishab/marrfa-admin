import { Content } from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Property = () => {
	return (
		<Content
			style={{
				padding: 24,
				margin: 0,
				minHeight: 280,
			}}
		>
			<h1>Property Management</h1>
			<Outlet></Outlet>
		</Content>
	);
};

export default Property;
