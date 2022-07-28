import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../Axios/axiosInstance";
import PrimaryTable from "../../Utils/PrimaryTable/PrimaryTable";
import "./ContactUs.css";

let tableHeader = [
	"SiNo",
	"first-name",
	"last-name",
	"phone",
	"email",
	"message",
];
let tableBody = [
	{
		siNo: 1,
		name: "Adarsh",
		email: "adarsh@gmail.com",
		query:
			"I need a urget help from you. Lorem, ipsum dolor/lit. Asperiores, velit?",
	},
	{
		siNo: 2,
		name: "Adarsh",
		email: "adarsh@gmail.com",
		query:
			"I need a urget help from you. Lorem, ipsum dolor/lit. Asperiores, velit?",
	},
	{
		siNo: 3,
		name: "Adarsh",
		email: "adarsh@gmail.com",
		query:
			"I need a urget help from you. Lorem, ipsum dolor/lit. Asperiores, velit?",
	},
	{
		siNo: 4,
		name: "Adarsh",
		email: "adarsh@gmail.com",
		query:
			"I need a urget help from you. Lorem, ipsum dolor/lit. Asperiores, velit?",
	},
	{
		siNo: 5,
		name: "Adarsh",
		email: "adarsh@gmail.com",
		query:
			"I need a urget help from you. Lorem, ipsum dolor/lit. Asperiores, velit?",
	},
];

export default function ContactUs() {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/auth/get-all-messages")
			.then((res) => {
				console.log(res);
				setContacts(res.data.item);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className="contact-us">
			<div className="table-wrapper">
				{contacts[0] && (
					<PrimaryTable tableHeader={tableHeader} tableBody={contacts} />
				)}
			</div>
		</div>
	);
}
