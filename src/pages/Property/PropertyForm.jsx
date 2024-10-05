import React, { useState } from "react";
import {
	Form,
	Input,
	InputNumber,
	Select,
	Button,
	Row,
	Col,
	Divider,
	Tag,
	Upload,
	message,
} from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	CloseCircleOutlined,
	UploadOutlined,
	PlusOutlined,
	MinusCircleOutlined,
} from "@ant-design/icons";
import { createProperty } from "../../services/api";
// import jsonToFormData  from 'json-form-data';
import jsonToFormData from "../../utils/jsonToFormData";
import { toFormData } from "axios";
import removeArrayIndicesFromImages from "../../utils/removeArrayIndicesFromImages";

const { TextArea } = Input;

const PropertyForm = () => {
	// State variables for basic details
	const [propertyName, setPropertyName] = useState();
	const [propertyType, setPropertyType] = useState("");
	const [occupancyStatus, setOccupancyStatus] = useState("");

	// State variables for location
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [address, setAddress] = useState();
	const [city, setCity] = useState();
	const [district, setDistrict] = useState();
	const [stateName, setStateName] = useState();
	const [country, setCountry] = useState();

	// State variables for amenities
	const [amenities, setAmenities] = useState([]);
	// const acc = ["a", "b", "c"];

	// State variables for features
	const [featureAmenities, setFeatureAmenities] = useState([]);
	const [renovations, setRenovations] = useState([]);
	const [energyRating, setEnergyRating] = useState();
	const [smartFeatures, setSmartFeatures] = useState([]);

	// State variables for last renovation
	const [lastRenovationValue, setLastRenovationValue] = useState();
	const [lastRenovationUnit, setLastRenovationUnit] = useState();

	// State variables for listed by
	const [listedByName, setListedByName] = useState();
	const [listedByLink, setListedByLink] = useState();
	const [contactMethods, setContactMethods] = useState([]);

	// State variables for description
	const [description, setDescription] = useState();

	// State variables for layout
	const [propertySize, setPropertySize] = useState();
	const [sizeUnit, setSizeUnit] = useState();
	const [bedrooms, setBedrooms] = useState();
	const [bathrooms, setBathrooms] = useState();
	const [kitchens, setKitchens] = useState();

	// State variables for price
	const [priceValue, setPriceValue] = useState();
	const [priceUnit, setPriceUnit] = useState();

	// State variables for metadata
	const [mlsNumber, setMlsNumber] = useState();

	// State to store uploaded files
	const [heroImg, setHeroImg] = useState(null);
	const [gallery, setGallery] = useState([]);
	const [floorMap, setFloorMap] = useState([]);

	const handleContactChange = (index, field, value) => {
		const newContacts = [...contactMethods];
		newContacts[index][field] = value;
		setContactMethods(newContacts);
	};

	// Add a new contact field
	const addContactField = () => {
		setContactMethods([...contactMethods, { type: "phone", value: "" }]);
	};

	// Remove a contact field
	const removeContactField = (index) => {
		const newContacts = contactMethods.filter((_, i) => i !== index);
		setContactMethods(newContacts);
	};

	// Add a tag from input
	const addTag = (setter, value) => {
		setter((prevTags) => [...prevTags, value]);
		// console.log(setter, value);
	};

	// Handle key press for adding tags
	const handleKeyPress = (event, setter) => {
		if (event.key === "Enter" && event.target.value) {
			addTag(setter, event.target.value);
			event.target.value = ""; // Clear input after adding
		}
	};

	// Remove a tag
	const removeTag = (setter) => (tag) => {
		setter((prevTags) => prevTags.filter((t) => t !== tag));
	};

	const handleHeroImgUpload = ({ file }) => {
		setHeroImg(file); // Store the file
		message.success(`${file.name} uploaded successfully as Hero Image.`);
	};

	// Function to handle gallery images upload
	const handleGalleryUpload = ({ file }) => {
		setGallery((prevGallery) => [...prevGallery, file]); // Append to gallery
		message.success(`${file.name} added to Gallery.`);
	};

	// Function to handle floor map images upload
	const handleFloorMapUpload = ({ file }) => {
		setFloorMap((prevFloorMap) => [...prevFloorMap, file]); // Append to floor map
		message.success(`${file.name} added to Floor Map.`);
	};

	 const handleAmenityInputChange = (index, field, value) => {
			const updatedAmenities = [...amenities];
			updatedAmenities[index][field] = value;
			setAmenities(updatedAmenities);
		};

	// Function to handle distance input change (for value or unit)
	const handleDistanceChange = (index, subField, value) => {
		const updatedAmenities = [...amenities];
		updatedAmenities[index].distance[subField] = value;
		setAmenities(updatedAmenities);
	};

	// Function to add new amenity
	const addAmenity = () => {
		setAmenities([
			...amenities,
			{ name: "", distance: { value: null, unit: "m" } },
		]);
	};

	// Function to remove an amenity
	const removeAmenity = (index) => {
		const updatedAmenities = amenities.filter((_, i) => i !== index);
		setAmenities(updatedAmenities);
	};

	// Handler for form submission
	const handleSubmit = () => {
		const data = {
			images: {
				gallery,
				floorMap,
				heroImg
			},
			location: {
				lat: latitude,
				long: longitude,
				address,
				city,
				district,
				state: stateName,
				country,
				amenities: amenities.map((amenity, index) => ({
					distance: {
						value: amenity.distanceValue,
						unit: amenity.distanceUnit,
					},
					name: amenity.name,
					// _id: amenity.id,
				})),
			},
			features: {
				amenities: featureAmenities,
				renovations,
				energyRating,
				smartFeatures,
			},
			lastRenovation: {
				value: lastRenovationValue,
				unit: lastRenovationUnit,
			},
			listedBy: {
				name: listedByName,
				link: listedByLink,
				contact: contactMethods,
			},
			description,
			layout: {
				size: {
					value: propertySize,
					unit: sizeUnit,
				},
				bedrooms,
				kitchen: kitchens,
				bathrooms,
			},
			price: {
				value: priceValue,
				unit: priceUnit,
			},
			metadata: {
				mls: mlsNumber,
			},
			name: propertyName,
			type: propertyType,
			occupancy: occupancyStatus,
		};

		const options = {
			initialFormData: new FormData(),
			showLeafArrayIndexes: true,
			includeNullValues: false,
			// mapping: function (value) {
			// 	if (typeof value === "boolean") {
			// 		return +value ? "1" : "0";
			// 	}
			// 	return value;
			// },
		};

		const formData = removeArrayIndicesFromImages(toFormData(data));

		console.log("Form Data:", toFormData(data));
		createProperty(formData);
		// You can now send formData to your API or use it as needed
	};

	return (
		<Form layout="vertical">
			<Divider orientation="left">Property Basic Details</Divider>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Property Name">
						<Input
							value={propertyName}
							onChange={(e) => setPropertyName(e.target.value)}
							placeholder="Enter property name"
						/>
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item label="Property Type">
						<Select
							value={propertyType}
							onChange={(value) => setPropertyType(value)}
						>
							<Select.Option value="villa">Villa</Select.Option>
							<Select.Option value="apartment">
								Apartment
							</Select.Option>
							<Select.Option value="house">House</Select.Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item label="Occupancy Status">
						<Select
							value={occupancyStatus}
							onChange={(value) => setOccupancyStatus(value)}
						>
							<Select.Option value="vacant">Vacant</Select.Option>
							<Select.Option value="tenant">
								Tenant
							</Select.Option>
							<Select.Option value="owned">Owned</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={16}>
					<Form.Item label="Property Description">
						<TextArea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter property description"
							rows={4}
						/>
					</Form.Item>
				</Col>
			</Row>

			<Divider orientation="left">Location Details</Divider>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label="Latitude">
						<InputNumber
							value={latitude}
							onChange={(value) => setLatitude(value)}
							placeholder="Latitude"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Longitude">
						<InputNumber
							value={longitude}
							onChange={(value) => setLongitude(value)}
							placeholder="Longitude"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Address">
						<Input
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Address"
						/>
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label="City">
						<Input
							value={city}
							onChange={(e) => setCity(e.target.value)}
							placeholder="City"
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="State">
						<Input
							value={stateName}
							onChange={(e) => setStateName(e.target.value)}
							placeholder="State"
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Country">
						<Input
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							placeholder="Country"
						/>
					</Form.Item>
				</Col>
			</Row>

			<Divider orientation="left">Layout and Features</Divider>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label="Property Size">
						<InputNumber
							value={propertySize}
							onChange={(value) => setPropertySize(value)}
							placeholder="Size"
							style={{ width: "70%" }}
						/>
						<Select
							value={sizeUnit}
							onChange={(value) => setSizeUnit(value)}
							style={{ width: "30%" }}
							defaultValue={"sqft"}
							placeholder="Unit"
						>
							<Select.Option value="sqft">sqft</Select.Option>
							<Select.Option value="sqm">sqm</Select.Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Bedrooms">
						<InputNumber
							value={bedrooms}
							onChange={(value) => setBedrooms(value)}
							placeholder="Bedrooms"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Bathrooms">
						<InputNumber
							value={bathrooms}
							onChange={(value) => setBathrooms(value)}
							placeholder="Bathrooms"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label="Kitchen">
						<InputNumber
							value={kitchens}
							onChange={(value) => setKitchens(value)}
							placeholder="Kitchens"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Last Renovation">
						<InputNumber
							value={lastRenovationValue}
							onChange={(value) => setLastRenovationValue(value)}
							placeholder="Years since last renovation"
							style={{ width: "70%" }}
						/>
						<Select
							value={lastRenovationUnit}
							onChange={(value) => setLastRenovationUnit(value)}
							style={{ width: "30%" }}
							defaultValue={"years"}
						>
							<Select.Option value="years">years</Select.Option>
							<Select.Option value="months">months</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label="Amenities">
						<Input
							onKeyDown={(event) =>
								handleKeyPress(event, setFeatureAmenities)
							}
							placeholder="Press Enter to add an amenity"
						/>
						<div style={{ marginTop: "8px" }}>
							{featureAmenities.map((amenity) => (
								<Tag
									key={amenity}
									closable
									onClose={() =>
										removeTag(setFeatureAmenities)(amenity)
									}
								>
									{amenity}
								</Tag>
							))}
						</div>
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label="Renovations">
						<Input
							onKeyDown={(event) =>
								handleKeyPress(event, setRenovations)
							}
							placeholder="Press Enter to add an renovation"
						/>
						<div style={{ marginTop: "8px" }}>
							{renovations.map((renovation) => (
								<Tag
									key={renovation}
									closable
									onClose={() =>
										removeTag(setRenovations)(renovation)
									}
								>
									{renovation}
								</Tag>
							))}
						</div>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Smart Features">
						<Input
							onKeyDown={(event) =>
								handleKeyPress(event, setSmartFeatures)
							}
							placeholder="Press Enter to add an Smart Feature"
						/>
						<div style={{ marginTop: "8px" }}>
							{smartFeatures.map((feature) => (
								<Tag
									key={feature}
									closable
									onClose={() =>
										removeTag(setSmartFeatures)(feature)
									}
								>
									{feature}
								</Tag>
							))}
						</div>
					</Form.Item>
				</Col>
			</Row>

			<Form.Item label="Amenities">
				{amenities.map((amenity, index) => (
					<Row
						key={index}
						gutter={16}
						align="middle"
						style={{ marginBottom: "10px" }}
					>
						<Col span={6}>
							<Input
								placeholder="Amenity Name"
								value={amenity.name}
								onChange={(e) =>
									handleAmenityInputChange(
										index,
										"name",
										e.target.value
									)
								}
							/>
						</Col>
						<Col span={4}>
							<InputNumber
								placeholder="Distance Value"
								value={amenity.distance.value}
								onChange={(value) =>
									handleDistanceChange(index, "value", value)
								}
								min={0}
								style={{ width: "100%" }}
							/>
						</Col>
						<Col span={4}>
							<Select
								value={amenity.distance.unit}
								onChange={(value) =>
									handleDistanceChange(index, "unit", value)
								}
								style={{ width: "100%" }}
							>
								<Select.Option value="m">
									Meters (m)
								</Select.Option>
								<Select.Option value="km">
									Kilometers (km)
								</Select.Option>
								
							</Select>
						</Col>
						<Col span={4}>
							<Button
								type="danger"
								icon={<MinusCircleOutlined />}
								onClick={() => removeAmenity(index)}
							/>
						</Col>
					</Row>
				))}
				<Button
					type="dashed"
					onClick={addAmenity}
					// block
					icon={<PlusOutlined />}
				>
					Add Amenity
				</Button>
			</Form.Item>

			<Divider orientation="left">Price</Divider>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Price">
						<InputNumber
							value={priceValue}
							onChange={(value) => setPriceValue(value)}
							placeholder="Price"
							style={{ width: "70%" }}
						/>
						<Select
							value={priceUnit}
							onChange={(value) => setPriceUnit(value)}
							style={{ width: "30%" }}
							defaultValue={"AED"}
						>
							<Select.Option value="AED">AED</Select.Option>
							<Select.Option value="EUR">EUR</Select.Option>
							<Select.Option value="INR">INR</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>

			<Divider orientation="left">Listed By</Divider>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Agency Name">
						<Input
							value={listedByName}
							onChange={(e) => setListedByName(e.target.value)}
							placeholder="Agency Name"
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Agency Link">
						<Input
							value={listedByLink}
							onChange={(e) => setListedByLink(e.target.value)}
							placeholder="Agency Link"
						/>
					</Form.Item>
				</Col>
			</Row>

			<Form.Item label="Contact Methods">
				{contactMethods.map((contact, index) => (
					<Row
						key={index}
						gutter={16}
						align={"middle"}
						style={{ marginBottom: "10px" }}
					>
						<Col span={8}>
							<Select
								value={contact.type}
								onChange={(value) =>
									handleContactChange(index, "type", value)
								}
							>
								<Select.Option value="phone">
									Phone
								</Select.Option>
								<Select.Option value="email">
									Email
								</Select.Option>
							</Select>
						</Col>
						<Col span={12}>
							<Input
								value={contact.value}
								onChange={(e) =>
									handleContactChange(
										index,
										"value",
										e.target.value
									)
								}
								placeholder="Enter contact value"
							/>
						</Col>
						<Col span={4}>
							<Button
								// color="danger"
								// danger
								type="danger"
								icon={<MinusCircleOutlined />}
								onClick={() => removeContactField(index)}
							></Button>
						</Col>
					</Row>
				))}

				{/* Add Contact Button */}
				<Button
					type="dashed"
					onClick={addContactField}
					icon={<PlusOutlined />}
				>
					Add Contact
				</Button>
			</Form.Item>

			<Divider orientation="left">Metadata</Divider>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="MLS Number">
						<InputNumber
							value={mlsNumber}
							onChange={(value) => setMlsNumber(value)}
							placeholder="MLS Number"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
			</Row>

			{/* Hero Image Upload */}
			<Divider orientation="left">Images</Divider>
			<Form.Item label="Hero Image">
				<Upload
					beforeUpload={() => false} // Prevent automatic upload
					onChange={handleHeroImgUpload}
					accept="image/*" // Accept images only
					showUploadList={true} // Hide file list
				>
					<Button icon={<UploadOutlined />}>
						Click to Upload Hero Image
					</Button>
				</Upload>
			</Form.Item>

			{/* Gallery Images Upload */}
			<Form.Item label="Gallery Images">
				<Upload
					beforeUpload={() => false} // Prevent automatic upload
					onChange={handleGalleryUpload}
					accept="image/*"
					multiple // Allow multiple images
				>
					<Button icon={<UploadOutlined />}>
						Click to Upload Gallery Images
					</Button>
				</Upload>
			</Form.Item>

			{/* Floor Map Images Upload */}
			<Form.Item label="Floor Map Images">
				<Upload
					beforeUpload={() => false} // Prevent automatic upload
					onChange={handleFloorMapUpload}
					accept="image/*"
					multiple // Allow multiple images
				>
					<Button icon={<UploadOutlined />}>
						Click to Upload Floor Map Images
					</Button>
				</Upload>
			</Form.Item>

			{/* Submit Button */}
			<Form.Item>
				<Button
					type="primary"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PropertyForm;
