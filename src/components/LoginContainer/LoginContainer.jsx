import React, { useState, useEffect } from "react";
import "./Login-container.css";
import { loginAuth, signupAuth } from "../../services/api";
import { Button, Form, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import alert from "../alert";

const { Title } = Typography;

const LoginContainer = ({ user, login }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const [passwordVisible, setPasswordVisible] = useState(false);

	const handleSubmit = async () => {
		const payload = {
			email,
			password,
		};
		try {
			const res = await loginAuth(payload);

			alert('Logged in successfully', 'success');
			if (res.data.data.user.role !== 'admin') alert('Non Admin User detected. Please login using a Admin Acount !!', 'error');
			login(res.data.data.user);
		} catch (err) {
			alert(err.response.data.message || err.message, 'error');
		}
	};

	const handleReset = () => {
		setEmail("");
		setPassword("");
	};

	return (
		<div className="login-container">
			<Title level="2">Login</Title>

			<Input
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			></Input>

			<Input.Password
				placeholder="Password"
				visibilityToggle={{
					visible: passwordVisible,
					onVisibleChange: setPasswordVisible,
				}}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			></Input.Password>
			<Button.Group>
				<Button onClick={handleReset}>Reset</Button>
				<Button
					type="primary"
					disabled={!email || !password}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Button.Group>
		</div>
	);
};

export default LoginContainer;
