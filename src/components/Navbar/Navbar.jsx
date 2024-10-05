import React, { useState, useEffect } from 'react';
import Logo from "/assets/Marrfa.png";
import "./Navbar.css"
import { Button, Layout, Row } from 'antd';
import { loginAuth, logoutAuth } from "../../services/api";

const { Header, Content, Sider } = Layout;

const BrandName = ({ mobile = false }) => {
	return (
		<div className="brand" style={{ gap: mobile ? "0px" : "5px" }}>
			<img src={Logo} />
			<div
				style={{ fontSize: mobile ? "1.5rem" : "1.2rem" }}
				className="brand-name"
			>
				arrfa 
			</div>
			<div className="page-name">
				| Admin
			</div>
		</div>
	);
};

const Navbar = ({ user, login, logout }) => {

	const handleLogout = () => {
		const logginOut = async () => {
			try {
				await logoutAuth();
				logout();
				window.location.reload();
			} catch (err) {
				alert(err.response.data.message || err.message);
			}
		};
		logginOut();
	};

	return (
		<Header
			style={{
				display: "flex",
				flexDirection: 'row',
				alignItems: "center",
				justifyContent: 'space-between'
			}}
		>
			<BrandName></BrandName>
			{user ? (
				<Row align={'middle'}>
					<p>{user.name}</p>
					<Button type="primary" color="error" onClick={handleLogout}>
						Logout
					</Button>
				</Row>
			) : (
				<Button type="primary">Log in</Button>
			)}
		</Header>
	);
}; 
 
export default Navbar;