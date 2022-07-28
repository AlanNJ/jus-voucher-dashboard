import React, { useEffect, useState, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../Axios/axiosInstance";
import AdminLayout from "../Components/Admin/AdminLayout/AdminLayout";
import { MdUpdate } from "react-icons/md";
import AddUserForm from "../Components/Admin/Manage Users/add user/AddUserForm";
import ManageUsers from "../Components/Admin/Manage Users/ManageUsers";
import HomePageManager from "../Components/Admin/ManagePages/HomaPageManager/HomePageManager";
import ManagePages from "../Components/Admin/ManagePages/ManagePages";
import SpecialOfferManager from "../Components/Admin/ManagePages/specialOfferManager/SpecialOfferManager";
import TestimonialManager from "../Components/Admin/Testimonials/Testimonials";
import WhyChooseUseManager from "../Components/Admin/ManagePages/WhyChooseUsManager/WhyChooseUseManager";
import NewsLetter from "../Components/Admin/NewsLetter/NewsLetter";
import ReferAndEarn from "../Components/Admin/ReferAndEarn/ReferAndEarn";
import Testimonials from "../Components/Admin/Testimonials/Testimonials";
import PrimaryTable from "../Components/Utils/PrimaryTable/PrimaryTable";
import Blogs from "../Components/Blogs/Blogs";
import Testimonial from "../Components/Admin/Testimonials/Testimonial";
import ContactUs from "../Components/Admin/Contact Us/ContactUs";

let userViewHeaders = ["SiNo", "Email", "Password", "Delete", "Update"];

export default function AdminNavigation({ setAdmin }) {
	const [users, setUsers] = useState([]);
	const location = useLocation();
	const [updateUser, setUpdateUser] = useState(false);
	const updateRow = () => {
		setUpdateUser(true);
	};

	useEffect(() => {
		let paths = location.pathname.split("/");
		if (paths.includes("admin-panel")) {
			setAdmin(true);
		} else {
			setAdmin(false);
		}
	}, [location]);

	const deleteUser = (id, index) => {
		let isConfirmed = window.confirm("Are you sure to delete the user?");
		if (isConfirmed) {
			axiosInstance
				.delete("/auth/delete-user/" + id)
				.then((res) => {
					toast.success(res.data.message);
					window.location.reload();
				})
				.catch((err) => {
					toast.error("Something went wrong!");
				});
		}
	};

	useLayoutEffect(() => {
		axiosInstance
			.get("/auth/get-all-user")
			.then((res) => {
				console.log(res.data);
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const update = () => {
		console.log("hello");
	};
	return (
		<Routes>
			<Route path="/admin-panel" element={<AdminLayout />}>
				<Route path="manage-users" element={<ManageUsers />}>
					<Route path="add-user" element={<AddUserForm />} />
					<Route
						path="view-users"
						element={
							<div style={{ display: "flex", flexDirection: "column" }}>
								{updateUser && <AddUserForm update={update} />}
								<>
									{users[0] ? (
										<PrimaryTable
											tableHeader={userViewHeaders}
											tableBody={users}
											deleteCol={true}
											deleteRow={deleteUser}
											updateRow={updateRow}
										/>
									) : (
										"No users found"
									)}
								</>
							</div>
						}
					/>
				</Route>
				<Route path="manage-pages" element={<ManagePages />}>
					<Route path="home/:section" element={<HomePageManager />} />
					<Route path="about/:section" element={<WhyChooseUseManager />} />
					<Route
						path="special-offers/:section"
						element={<SpecialOfferManager />}
					/>

					<Route path="blogs/" element={<Blogs />} />
				</Route>

				<Route path="testimonials/:section" element={<Testimonials />} />

				<Route path="contact-us" element={<ContactUs />} />
				<Route path="refer-and-earn" element={<ReferAndEarn />} />
			</Route>
		</Routes>
	);
}
