import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AdminNavigation from "./Navigation/AdminNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [isAdmin, setIsAdmin] = useState(false);
	return (
		<div className={"App " + (isAdmin ? "App-admin" : "")}>
			<Router>
				<AdminNavigation setAdmin={setIsAdmin} />
				<ToastContainer />
			</Router>
		</div>
	);
}

export default App;
