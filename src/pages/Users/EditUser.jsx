import React, { useState, useEffect } from "react";
import { updateUser, viewUser } from "../../services/api";
import { Button, message, Select } from "antd";
import { useParams } from "react-router-dom";

const EditUser = () => {
	const params = useParams();
	const [user, setUser] = useState();

	const [role, setRole] = useState();

	const handleGetData = async () => {
		const { id } = params;
		try {
			if (id) {
				const res = await viewUser(id);
				setUser(res.data.data.user);
				setRole(res.data.data.user.role);

				console.log(res.data.data.user);
			}
		} catch (err) {
			message.error(err.response.data.message | err.message);
		}
	};

	useEffect(() => {
		handleGetData();
	}, []);

	const handleSubmit = async () => {

		if (role != user.role) {
			const userCopy = user;
			userCopy.role = role;

			try {
				await updateUser(user._id, userCopy);
			}
			catch (err) {
				message.error(err.response.data.message || err.message)
			}
		}
		
	}

	return (
		<div className="sub-main">
			<h2>Edit User</h2>
			{user && (
				<>
					<p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>Role:</strong> {user.role}
						</p>
					</p>
					<p>
						{" "}
						<strong>Change Role - </strong>{" "}
						<Select value={role} onChange={(val) => setRole(val)}>
							<Select.Option value={"user"}>User</Select.Option>
							<Select.Option value={"admin"}>Admin</Select.Option>
						</Select>{" "}
					</p>
					<Button
						type="primary"
						onClick={handleSubmit}
						disabled={role == user.role}
					>
						{"Submit"}
					</Button>
				</>
			)}
		</div>
	);
};

export default EditUser;
