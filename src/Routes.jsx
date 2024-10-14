import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Property from "./pages/Property/Property";
import ViewProperty from "./pages/Property/ViewProperty";
import UploadProperty from "./pages/Property/UploadProperty";
import EditProperty from "./pages/Property/EditProperty";

const PageRoutes = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<Routes>
			<Route exact path="/" element={<Home></Home>}></Route>
			<Route exact path="/property" element={<Property></Property>}>
				<Route
					path="view"
					element={<ViewProperty></ViewProperty>}
				></Route>
				<Route
					path="upload"
					element={<UploadProperty></UploadProperty>}
				></Route>
				<Route path="edit/:id"
					element={<EditProperty></EditProperty>}
				></Route>
			</Route>
		</Routes>
	);
}

export default PageRoutes;