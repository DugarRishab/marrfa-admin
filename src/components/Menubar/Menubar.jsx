import React, { useState, useEffect } from "react";
import { Button, Menu, theme } from "antd";
import "./Menubar.css";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const Menubar = () => {
	const items = [
		{
			key: "property",
			label: "Properties",
			children: [
				{
					key: "view",
					label: "View Properties",
				},
				{
					key: "upload",
					label: "Upload Properties",
				},
				{
					key: "deal-of-month",
					label: "Deal of the Month",
				},
				{
					key: "marrfa-choice",
					label: "Marrfa's Choice",
				},
			],
		},
		{
			key: "user",
			label: "Users",
			children: [
				{
					key: "view",
					label: "View All Users",
				},
				{
					key: "add",
					label: "Add Users",
				},
				{
					key: "admin",
					label: "View Admin List",
				},
			],
		},
		{
			key: "blog",
			label: "Blogs",
			children: [
				{
					key: "view",
					label: "View All Blogs",
				},
				{
					key: "create",
					label: "Create Blog",
				},
			],
		},
		

	];
	const navigate = useNavigate();

	const handleMenuSelect = (e) => {
		const path = e.keyPath.reverse().join('/');
		// console.log(path);
		navigate(path);
	};

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Sider
			width={260}
			style={{
				background: colorBgContainer,
			}}
		>
			<Menu
				style={{
					width: 260,
					// background: colorBgContainer
				}}
				onSelect={handleMenuSelect}
				// theme="light"
				mode="inline"
				items={items}
			></Menu>
			{/* <Button className="login-btn" type="primary">Logout</Button> */}
		</Sider>
	);
};

export default Menubar;
