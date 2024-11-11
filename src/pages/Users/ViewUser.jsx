import React, { useEffect, useState } from "react";
import { List, Button, Modal, Spin } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	SlidersOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { viewUsers } from "../../services/api";

const ViewUser = () => {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const actionArray = (id) => {
		const handleDelete = async () => {
			try {
				// await deleteProperty(id);
			} catch (err) {
				console.log(err);
			}
		};
		return [
			<Button key="edit-btn">
				<Link to={`/user/edit/${id}`}>
					<EditOutlined />
				</Link>
			</Button>,
			<Button key="delete-btn" onClick={handleDelete} danger>
				<DeleteOutlined />
			</Button>,
		];
	};

	// Fetch users when component mounts
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await viewUsers(); // Fetch user data from backend
				setUsers(res.data.data.users); // Assuming result structure: { data: { users: [...] } }
				setLoading(false); // Stop loading after data is fetched
			} catch (error) {
				console.error("Error fetching users:", error);
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

	// View user details modal
	const handleViewUser = (user) => {
		setSelectedUser(user);
		setIsModalVisible(true); // Open modal
	};

	// Close modal
	const handleCloseModal = () => {
		setIsModalVisible(false);
		setSelectedUser(null); // Reset user after modal closes
	};

	return (
		<div>
			<h1>View Users</h1>
			{loading ? (
				<Spin size="large" />
			) : (
				<List
					itemLayout="horizontal"
					dataSource={users}
					renderItem={(user) => (
						<List.Item actions={actionArray(user._id)}>
							<List.Item.Meta
								onClick={handleViewUser}
								title={user.name}
								description={
									<>
										<p>
											<strong>Email:</strong> {user.email}
										</p>
										<p>
											<strong>Role:</strong> {user.role}
										</p>
									</>
								}
							/>
						</List.Item>
					)}
				/>
			)}

			<Modal
				title="User Details"
				open={isModalVisible}
				onCancel={handleCloseModal}
				footer={[
					<Button key="close" onClick={handleCloseModal}>
						Close
					</Button>,
				]}
			>
				{selectedUser && (
					<div>
						<p>
							<strong>Name:</strong> {selectedUser.name}
						</p>
						<p>
							<strong>Email:</strong> {selectedUser.email}
						</p>
						<p>
							<strong>Role:</strong> {selectedUser.role}
						</p>
						<p>
							<strong>Joined At:</strong>{" "}
							{new Date(
								selectedUser.joinedAt
							).toLocaleDateString()}
						</p>
						{/* Add any additional user fields here */}
					</div>
				)}
			</Modal>
		</div>
	);
};

export default ViewUser;
