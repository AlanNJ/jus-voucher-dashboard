import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./ManagePages.css";

let sectionCount = {
	home: {
		title: "home",
		count: 6,
	},
	AboutUs: {
		title: "About-Us",
		count: 3,
	},
	OurBlogs: {
		title: "Our Blogs",
		count: 1,
	},
	Vendors: {
		title: "Vendors",
		count: 3,
	},
};

export default function ManagePages() {
	const location = useLocation();
	const navigate = useNavigate();
	const [currentLocation, setCurrentLocation] = useState(null);

	useEffect(() => {
		let paths = location.pathname.split("/");
		if (paths.includes("home")) {
			setCurrentLocation(sectionCount.home);
		} else if (paths.includes("why-choose-us")) {
			setCurrentLocation(sectionCount.whychooseus);
		} else if (paths.includes("testimonials")) {
			setCurrentLocation(sectionCount.testimonials);
		} else if (paths.includes("special-offers")) {
			setCurrentLocation(sectionCount.specialOffers);
		}
	}, [location]);
	return (
		<section className="manage-pages">
			<div className="pages-btns-wrapper">
				<NavLink
					to="/admin-panel/manage-pages/home/1"
					className={({ isActive }) =>
						isActive ? "btn-page btn-page--active" : "btn-page"
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/admin-panel/manage-pages/about/1"
					className={({ isActive }) =>
						isActive ? "btn-page btn-page--active" : "btn-page"
					}
				>
					About Us
				</NavLink>
				<NavLink
					to="/admin-panel/manage-pages/blogs"
					className={({ isActive }) =>
						isActive ? "btn-page btn-page--active" : "btn-page"
					}
				>
					Our Blogs
				</NavLink>
				<NavLink
					to="/admin-panel/manage-pages/vendors/1"
					className={({ isActive }) =>
						isActive ? "btn-page btn-page--active" : "btn-page"
					}
				>
					Vendors
				</NavLink>
			</div>
			<div className="section-btns-wrapper">
				{currentLocation &&
					currentLocation.count > 1 &&
					[...Array(currentLocation.count)].map((item, index) => (
						<NavLink
							to={`/admin-panel/manage-pages/${currentLocation.title}/${
								index + 1
							}`}
							className={({ isActive }) =>
								isActive ? "btn-section btn-section--active" : "btn-section"
							}
						>
							Section {index + 1}
						</NavLink>
					))}
			</div>

			<Outlet />
		</section>
	);
}
