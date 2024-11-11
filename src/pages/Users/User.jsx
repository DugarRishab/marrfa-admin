import { Content } from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const User = () => {
	return (
		<Content
			style={{
				padding: 24,
				margin: 0,
				minHeight: 280,
			}}
		>
			<h1>User Management</h1>
			<Outlet></Outlet>
		</Content>
	);
};

export default User;
