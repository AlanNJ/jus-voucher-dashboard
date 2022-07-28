import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageManager from "../../../APIServices/AdminPageManager";
import axiosInstance from "../../../Axios/axiosInstance";
import ImageUploader from "../../Utils/ImageUploader/ImageUploader";
import PrimaryTable from "../../Utils/PrimaryTable/PrimaryTable";
import "./Testimonials.css";

let tableHeader = [
	"SI NO",
	"Name",
	"Designation",
	"Testimonial",
	"Delete",
	"Update",
];
let videoTable = ["SI NO", "Link", "Delete"];

export default function Testimonials() {
	const { section } = useParams();
	const [formData, setFormData] = useState({});
	const [textTestimonials, setTextTestimonials] = useState([]);
	const [videoUrl, setVideoUrl] = useState("");

	useEffect(() => {
		axiosInstance
			.get("/products/get-testimonial-items")
			.then((res) => {
				setTextTestimonials(res.data.item);
			})
			.catch((err) => {
				toast.error("Please refresh the page!");
			});
	}, [section]);

	const textFormSubmit = (event) => {
		event.preventDefault();
		axiosInstance
			.post(`/products/add-testimonial-items`, formData)
			.then((res) => {
				if (res.data.success) {
					toast.success("Uploaded successfully");
					setFormData({ name: "", role: "", content: "" });
				} else {
					toast.error("Something went wrong!");
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error("Something went wrong!");
			});
	};

	const inputHandler = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const deleteTextTestimonials = (id, index) => {
		if (textTestimonials.length >= 1) {
			let confirm = window.confirm("Are you sure to delete?");
			if (confirm) {
				axiosInstance
					.delete(`/products/delete-testimonial-item/${id}`)
					.then((res) => {
						toast.success("Item deleted Successfully");
					})
					.catch((err) => {
						console.log(err);
					});
			}
		} else {
			toast.error("We need atleast 3 testimonials!");
		}
	};
	const updateTextTestimonials = async (id, index) => {
		axiosInstance
			.get(`/products/get-single-testimonial-items/${id}`)
			.then((res) => {
				console.log(res.data.item);
				setFormData({
					name: res.data.item.name,
					designation: res.data.item.designation,
					testimonial: res.data.item.testimonial,
				});
			})
			.catch((err) => console.log(err));
		/*
            axiosInstance
			.put(`/products/update-testimonial-item/${id}`, formData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
            */
	};

	const handleVideoSubmission = (event) => {
		event.preventDefault();
		AdminPageManager.uploadForm("testimonials", 3, { url: videoUrl });
	};

	return (
		<main className="testimonials-wrapper">
			<div className="testimonials-btns-wrapper">
				<NavLink
					to="/admin-panel/testimonials/text"
					className="btn-testimonial"
				>
					Text
				</NavLink>
				<NavLink
					to="/admin-panel/testimonials/video"
					className="btn-testimonial"
				>
					Video
				</NavLink>
			</div>
			<div className="home-page-manager">
				{section === "text" ? (
					<>
						<form className="home-page-form" onSubmit={textFormSubmit}>
							<div className="two-columns-wrapper">
								<div className="input-wrapper">
									<label htmlFor="">Name</label>
									<input
										type="text"
										value={formData.name}
										required
										onChange={inputHandler}
										name="name"
										className="home-input"
									/>
								</div>
								<div className="input-wrapper">
									<label htmlFor="">Designation</label>
									<input
										type="text"
										value={formData.designation}
										required
										onChange={inputHandler}
										name="designation"
										className="home-input"
									/>
								</div>
								<div className="input-wrapper">
									<label htmlFor="">Testimonial</label>
									<textarea
										name="testimonial"
										value={formData.testimonial}
										required
										onChange={inputHandler}
										className="home-input"
										id=""
										cols="30"
										rows="10"
									></textarea>
								</div>
							</div>
							<button className="btn-submit">Upload</button>
						</form>
						<div className="table-wrapper">
							<PrimaryTable
								tableHeader={tableHeader}
								tableBody={textTestimonials}
								deleteCol={true}
								deleteRow={deleteTextTestimonials}
								updateRow={updateTextTestimonials}
							/>
						</div>
					</>
				) : section === "video" ? (
					<>
						<form className="home-page-form" onSubmit={handleVideoSubmission}>
							<div className="two-columns-wrapper">
								<div className="input-wrapper">
									<label htmlFor="">Add Video link</label>
									<input
										type="text"
										name="url"
										required
										value={videoUrl}
										onChange={(e) => setVideoUrl(e.target.value)}
										className="home-input"
									/>
								</div>
							</div>
							<button className="btn-submit">Upload</button>
						</form>
						<div className="table-wrapper">
							<PrimaryTable
								tableHeader={videoTable}
								tableBody={textTestimonials}
								deleteCol={true}
								deleteRow={deleteTextTestimonials}
							/>
						</div>
					</>
				) : null}
			</div>
		</main>
	);
}
