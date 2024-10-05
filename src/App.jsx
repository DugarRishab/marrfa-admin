import { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import PageRoutes from "./Routes";
import Menubar from "./components/Menubar/Menubar";
import Navbar from "./components/Navbar/Navbar";
import LoginContainer from "./components/LoginContainer/LoginContainer";
import { ConfigProvider, theme, Layout, Breadcrumb } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
// import { contextHolder } from "./components/alert";

const { Header, Content, Sider } = Layout;

function App() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const login = (userData) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};
	const logout = () => {
		setUser(null);
		localStorage.setItem("user", JSON.stringify(null));
	};

	

	// const [messageApi, contextHolder] = message.useMessage();
	

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#46a29f",
					colorInfo: "#46a29f",
					borderRadius: 5,
				},
				components: {
					Segmented: {
						itemActiveBg: "#46a29f",
						itemSelectedBg: "#46a29f",
					},
				},
				algorithm: theme.darkAlgorithm,
			}}
		>
			<StyleProvider hashPriority="high">
				<div className="App">
					{/* {contextHolder} */}
					<Router>
						<Layout>
							<Navbar
								user={user}
								logout={logout}
								login={login}
							></Navbar>
							<Layout>
								<Menubar></Menubar>
								<Layout
									style={{
										padding: "0 24px 24px",
									}}
								>
									{/* <Breadcrumb
										style={{
											margin: "16px 0",
										}}
									></Breadcrumb> */}
									{user && user.role == "admin" ? (
										<PageRoutes></PageRoutes>
									) : (
										<LoginContainer
											user={user}
											login={login}
										></LoginContainer>
									)}
								</Layout>
							</Layout>
						</Layout>

						{/* <PageRoutes></PageRoutes> */}
					</Router>
				</div>
			</StyleProvider>
		</ConfigProvider>
	);
}

export default App;
