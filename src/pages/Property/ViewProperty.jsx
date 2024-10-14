import { Button, Flex, Input, List, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { viewProperties } from "../../services/api";
import { DeleteOutlined, EditOutlined, SlidersOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const actionArray = (id) => {
	return [
		<Button key="edit-btn">
			<Link to={`/property/edit/${id}`}>
				<EditOutlined />
			</Link>
		</Button>,
		<Button key="delete-btn" danger>
			<DeleteOutlined />
		</Button>,
	];
};

const ViewProperty = () => {
	const [properties, setProperties] = useState();

	const getProperties = async () => {
		try {
			const res = await viewProperties();
			setProperties(res.data.data.properties);
		} catch (err) {
			alert(err.response.data.message || err.message, "error");
		}
	};

	useEffect(() => {
		getProperties();
	}, []);
	return (
		<div className="sub-main">
			<h2>View Properties</h2>
			{/* <Flex gap={"middle"}>
				<Input.Search></Input.Search>
				<Button>
					<SlidersOutlined /> Filters
				</Button>
			</Flex> */}
			<br />
			<Typography.Text color="primary">
				displaying {properties && properties.length} results
			</Typography.Text>
			<br />
			<List
				pagination={{ position: "bottom", align: "center" }}
				dataSource={properties}
				renderItem={(item, index) => (
					<List.Item key={index} actions={actionArray(item._id)}>
						<List.Item.Meta
							avatar={
								<img
									style={{
										width: "100px",
										height: "100px",
										borderRadius: "5px",
									}}
									src={item.images.heroImg}
								></img>
							}
							title={<Link to={"/properties/" + item._id}>{ item.name }</Link>}
							description={
								item.location.address +
								", " +
								item.location.city +
								", " +
								item.location.district +
								", " +
								item.location.state +
								", " +
								item.location.country +
								" - " +
								item.listedBy.name
							}
						></List.Item.Meta>
					</List.Item>
				)}
			></List>
			<br />
		</div>
	);
};

export default ViewProperty;
