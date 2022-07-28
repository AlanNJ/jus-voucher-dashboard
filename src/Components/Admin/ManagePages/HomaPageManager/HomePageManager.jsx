import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "../../../Utils/ImageUploader/ImageUploader";
import PrimaryTable from "../../../Utils/PrimaryTable/PrimaryTable";
import "./HomePageManager.css";
import aboutImage from "../../../asset/laminate-m-380x254.jpg";
import axiosInstance from "../../../../Axios/axiosInstance";
import { toast } from "react-toastify";
import { useEffect } from "react";
import config from "../../../../Constants/config";
import AdminPageManager from "../../../../APIServices/AdminPageManager";
import axios from "axios";

let tableHeader1 = ["SiNo", "Image", "Title", "Delete", "Update"];
let tableHeader2 = ["SiNo", "Image", "Title", "Delete", "Update"];
let tableHeader3 = ["SiNo", "Image", "Title", "Delete", "Update"];
let tableHeader4 = ["SiNo", "Image", "Title", "Role", , "Delete", "Update"];
let tableHeader5 = ["SiNo", "Image", "Title", "Delete", "Update"];
let tableHeader6 = [
	"SiNo",
	"Image",
	"message",
	"email",
	"approved",
	"role",
	"name",
	"Delete",
	"Update",
];
let tableHeader7 = ["SiNo", "Image", "Title", "Delete", "Update"];
const baseURL = "http://localhost:5000/api";

const testimonials = {
	tableHeader: ["SiNo", "Name", "Testimonial", "Delete"],
	tableBody: [
		{
			sino: 1,
			name: "Muhsin",
			testimonials:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum excepturi ratione impedit, ipsam maiores quae totam sunt aperiam iste!",
			delete: "delete",
		},
		{
			sino: 2,
			name: "Muhsin",
			testimonials:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum excepturi ratione impedit, ipsam maiores quae totam sunt aperiam iste!",
			delete: "delete",
		},
		{
			sino: 3,
			name: "Muhsin",
			testimonials:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum excepturi ratione impedit, ipsam maiores quae totam sunt aperiam iste!",
			delete: "delete",
		},
		{
			sino: 4,
			name: "Muhsin",
			testimonials:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum excepturi ratione impedit, ipsam maiores quae totam sunt aperiam iste!",
			delete: "delete",
		},
		{
			sino: 5,
			name: "Muhsin",
			testimonials:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum excepturi ratione impedit, ipsam maiores quae totam sunt aperiam iste!",
			delete: "delete",
		},
	],
};

export default function HomePageManager() {
	const { section } = useParams();
	const [sec1Image, setSec1Image] = useState(null);
	const [firstSection, setFirstSection] = useState({
		title: null,
	});
	const [firstSectionData, setFirstSectionData] = useState([]);
	const [sec2Image, setSec2Image] = useState(null);
	const [secondSection, setSecondSection] = useState({
		title: "",
		content: "",
	});
	const [secondSectionData, setSecondSectionData] = useState([]);

	const [thirdSection, setThirdSection] = useState({ title: null });
	const [sec3Image, setSec3Image] = useState(null);
	const [thirdSectionData, setThirdSectionData] = useState([]);

	const [fourthSection, setFourthSection] = useState({
		name: "",

		role: "",
	});
	const [sec4Image, setSec4Image] = useState(null);
	const [fourthSectionData, setFourthSectionData] = useState([]);

	const [fifthSection, setFifthSection] = useState({
		title: "",
	});
	const [sec5Image, setSec5Image] = useState(null);
	const [fifthSectionData, setFifthSectionData] = useState([]);

	const [sixthSection, setSixthSection] = useState({
		name: "",
		message: "",
		email: "",

		role: "",
	});
	const [sec6Image, setSec6Image] = useState(null);
	const [sixthSectionData, setSixthSectionData] = useState([]);

	const [backendURL, setBackendURL] = useState("");
	const [updateButoon, setUpdateButton] = useState(false);
	const [updateId, setUpdateId] = useState();

	useEffect(() => {
		setBackendURL(null);
		setFirstSection({});
		setSecondSection({});
		setUpdateButton(false);
		if (section == 1) {
			getFirstSection();
		} else if (section == 2) {
			getSecondSection();
		} else if (section == 3) {
			getThirdSection();
			//setThirdSectionData();
		} else if (section == 4) {
			getFourthSection();
		} else if (section == 5) {
			getFifthSection();
		} else if (section == 6) {
			getSixthSection();
		}
	}, [section]);

	const handleFirstSectionSubmission = (event) => {
		event.preventDefault();
		if (firstSection.title && sec1Image) {
			let formData = new FormData();
			formData.append("title", firstSection.title);
			formData.append("img", sec1Image);
			axiosInstance
				.post("/products/add-banner-items", formData)
				.then((res) => {
					if (res.data.success) {
						toast.success("Uploaded successfully");
						setSec1Image(null);
						setFirstSection({ title: "" });
					} else {
						toast.error("Something went wrong!");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong!");
				});
		}
	};

	const getFirstSection = () => {
		axiosInstance
			.get("/products/get-banner-items")
			.then((res) => {
				setFirstSectionData(res.data.item);
			})
			.catch((err) => {
				toast.error("Something went wrong with fetching!");
			});
	};

	const deleteSection1 = (id, index) => {
		let isConfirmed = window.confirm("Are you sure to delete?");
		console.log(id);
		if (isConfirmed) {
			axiosInstance
				.delete("/products/delete-banner-item/" + id)
				.then((res) => {
					if (res.data.success) {
						toast.success("Item deleted successfully");
						window.location.reload();
					} else {
						toast.error("Something went wrong");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		}
	};
	const updateSection1 = async (id, index) => {
		setUpdateId(id);
		const data = await axios.get(
			`http://localhost:5000/api/products/get-single-banner-item/${id}`
		);
		console.log(data.data.item);
		setFirstSection({ title: data.data.item.info });
		setBackendURL(`http://localhost:5000/BannerImages/${data.data.item.img}`);

		console.log(id);
		setUpdateButton(true);
	};
	const finalUpdate = (string) => {
		axiosInstance.put(`products/${string}/${updateId}`, firstSection);
	};
	//Second Section
	const handleSecondSection = (event) => {
		event.preventDefault();
		let formData = new FormData();
		formData.append("info", secondSection.title);
		formData.append("content", secondSection.content);
		formData.append("img", sec2Image);
		if (sec2Image) {
			axiosInstance
				.post(`/products/add-discount-items`, formData)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success("Added Successfully");
						setSecondSection({ title: "", content: "" });
						setSec2Image(null);
						setTimeout(() => {
							window.location.reload();
						}, [1500]);
					} else {
						toast.error("Something went wrong!");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong!");
				});
		} else {
			toast.error("Please add a image!");
		}
	};

	const getSecondSection = () => {
		axiosInstance
			.get("/products/get-discount-items")
			.then((res) => {
				console.log(res.data);
				setSecondSectionData(res.data);
			})
			.catch((err) => {
				toast.error("Something went wrong with fetching!");
			});
	};
	const deleteSection2 = (id, index) => {
		let isConfirmed = window.confirm("Are you sure to delete?");
		console.log(id);
		if (isConfirmed) {
			axiosInstance
				.delete("/products/delete-discount-item/" + id)
				.then((res) => {
					if (res.data) {
						toast.success("Item deleted successfully");
						window.location.reload();
					} else {
						toast.error("Something went wrong");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		}
	};
	const updateSection2 = async (id, index) => {
		const data = await axios.get(
			`http://localhost:5000/api/products/get-single-discount-item/${id}`
		);
		console.log(data.data);
		setSecondSection({ title: data.data.info });
		setBackendURL(`http://localhost:5000/DiscountImages/${data.data.img}`);

		console.log(id);
	};

	//Third-section
	const handleThirdSection = (event) => {
		event.preventDefault();
		let formData = new FormData();
		formData.append("info", thirdSection.title);
		formData.append("content", thirdSection.content);
		formData.append("img", sec3Image);
		if (sec3Image && thirdSection) {
			axiosInstance
				.post(`/products/add-free-gift-voucher-items`, formData)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success("Added Successfully");
						setSecondSection({ title: "", content: "" });
						setSec2Image(null);
						setTimeout(() => {
							window.location.reload();
						}, [1500]);
					} else {
						toast.error("Something went wrong!");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong!");
				});
		} else {
			toast.error("Please add a image!");
		}
	};

	const getThirdSection = () => {
		axiosInstance
			.get("/products/get-free-gift-voucher-items")
			.then((res) => {
				console.log(res.data);
				setThirdSectionData(res.data);
			})
			.catch((err) => {
				toast.error("Something went wrong with fetching!");
			});
	};
	const deleteSection3 = (id, index) => {
		let isConfirmed = window.confirm("Are you sure to delete?");
		console.log(id);
		if (isConfirmed) {
			axiosInstance
				.delete("/products/delete-free-gift-voucher-item/" + id)
				.then((res) => {
					if (res.data) {
						toast.success("Item deleted successfully");
						window.location.reload();
					} else {
						toast.error("Something went wrong");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		}
	};
	const updateSection3 = async (id, index) => {
		const data = await axios.get(
			`http://localhost:5000/api/products/get-single-gift-voucher-item/${id}`
		);
		console.log(data.data);
		setThirdSection({ title: data.data.info });
		setBackendURL(
			`http://localhost:5000/FreeGiftVouchersImages/${data.data.img}`
		);
	};

	//Fourth-section
	const handleFourthSection = (event) => {
		event.preventDefault();
		let formData = new FormData();
		formData.append("name", fourthSection.name);
		formData.append("role", fourthSection.role);
		formData.append("img", sec4Image);
		if (sec4Image && fourthSection) {
			axiosInstance
				.post(`/products/add-our-clients-items`, formData)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success("Added Successfully");
						setSecondSection({ title: "", content: "" });
						setSec2Image(null);
						setTimeout(() => {
							window.location.reload();
						}, [1500]);
					} else {
						toast.error("Something went wrong!");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong!");
				});
		} else {
			toast.error("Please add a image!");
		}
	};

	const getFourthSection = () => {
		axiosInstance
			.get("/products/get-our-clients-items")
			.then((res) => {
				console.log(res.data);
				setFourthSectionData(res.data);
			})
			.catch((err) => {
				toast.error("Something went wrong with fetching!");
			});
	};
	const deleteSection4 = (id, index) => {
		let isConfirmed = window.confirm("Are you sure to delete?");
		console.log(id);
		if (isConfirmed) {
			axiosInstance
				.delete("/products/delete-our-clients-item/" + id)
				.then((res) => {
					if (res.data) {
						toast.success("Item deleted successfully");
						window.location.reload();
					} else {
						toast.error("Something went wrong");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		}
	};
	const updateSection4 = async (id, index) => {
		const data = await axios.get(
			`http://localhost:5000/api/products/get-single-our-client/${id}`
		);
		console.log(data.data);
		setFourthSection({ name: data.data.name, role: data.data.role });
		setBackendURL(`http://localhost:5000/OurClientsImages/${data.data.img}`);

		console.log(id);
	};

	//Fifth-section
	const handleFifthSection = (event) => {
		event.preventDefault();
		let formData = new FormData();
		formData.append("title", fifthSection.title);

		formData.append("img", sec5Image);
		if (sec5Image && fifthSection) {
			axiosInstance
				.post(`/products/add-trending-offer-items`, formData)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success("Added Successfully");
						setFifthSection({ title: "" });
						setSec2Image(null);
						setTimeout(() => {
							window.location.reload();
						}, [1500]);
					} else {
						toast.error("Something went wrong!");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong!");
				});
		} else {
			toast.error("Please add a image!");
		}
	};

	const getFifthSection = () => {
		axiosInstance
			.get("/products/get-trending-offer-items")
			.then((res) => {
				console.log(res.data);

				setFifthSectionData(res.data);
			})
			.catch((err) => {
				toast.error("Something went wrong with fetching!");
			});
	};
	const deleteSection5 = (id, index) => {
		let isConfirmed = window.confirm("Are you sure to delete?");
		console.log(id);
		if (isConfirmed) {
			axiosInstance
				.delete("/products/delete-trending-offer-item/" + id)
				.then((res) => {
					if (res.data) {
						toast.success("Item deleted successfully");
						window.location.reload();
					} else {
						toast.error("Something went wrong");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		}
	};
	const updateSection5 = async (id, index) => {
		const data = await axios.get(
			`http://localhost:5000/api/products/get-single-trending-offer/${id}`
		);

		setFifthSection({ title: data.data.info });

		setBackendURL(
			`http://localhost:5000/TrendingOffersImages/${data.data.img}`
		);
	};

	//Sixth-section
	const handleSixthSection = (event) => {
		event.preventDefault();
		let formData = new FormData();
		formData.append("name", sixthSection.name);
		formData.append("email", sixthSection.email);
		formData.append("message", sixthSection.message);
		formData.append("role", sixthSection.role);
		formData.append("approved", false);
		formData.append("img", sec6Image);

		formData.append("img", sec6Image);
		if (sec6Image && sixthSection) {
			axiosInstance
				.post(`/products/add-client-testimonial-items`, formData)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success("Added Successfully");
						setSixthSection({ title: "", role: "", message: "", email: "" });
						setSec6Image(null);
						setTimeout(() => {
							window.location.reload();
						}, [1500]);
					} else {
						toast.error("Something went wrong!");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong!");
				});
		} else {
			toast.error("Please add a image!");
		}
	};

	const getSixthSection = () => {
		axiosInstance
			.get("/products/get-client-testimonial-items")
			.then((res) => {
				console.log(res.data);

				setSixthSectionData(res.data);
			})
			.catch((err) => {
				toast.error("Something went wrong with fetching!");
			});
	};
	const deleteSection6 = (id, index) => {
		let isConfirmed = window.confirm("Are you sure to delete?");
		console.log(id);
		if (isConfirmed) {
			axiosInstance
				.delete("/products/delete-client-testimonial-item/" + id)
				.then((res) => {
					if (res.data) {
						toast.success("Item deleted successfully");
						window.location.reload();
					} else {
						toast.error("Something went wrong");
					}
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		}
	};
	const updateSection6 = async (id, index) => {
		const data = await axios.get(
			`http://localhost:5000/api/products/get-single-client-testimonial-items/${id}`
		);

		setSixthSection({
			name: data.data.name,
			message: data.data.message,
			email: data.data.email,

			role: data.data.role,
		});

		setBackendURL(
			`http://localhost:5000/ClientTestimonialImages/${data.data.img}`
		);
	};

	return (
		<section className="home-page-manager">
			{section == 1 ? (
				<>
					<form className="home-page-form">
						<div className="two-columns-wrapper">
							<div className="input-wrapper">
								<label htmlFor="">Image</label>
								<ImageUploader
									name="HOME_IMAGE_1"
									passImage={setSec1Image}
									isFileAvailable={sec1Image ? true : false}
									backendURL={backendURL}
								/>
							</div>
							<div className="input-wrapper">
								<label htmlFor="">Info</label>
								<input
									type="text"
									name="name"
									value={firstSection.title}
									className="home-input"
									required
									onChange={(event) =>
										setFirstSection({ title: event.target.value })
									}
								/>
							</div>
						</div>
						{!updateButoon ? (
							<button
								className="btn-submit"
								onClick={handleFirstSectionSubmission}
							>
								Upload
							</button>
						) : (
							<button
								className="btn-submit"
								onClick={() => finalUpdate("update-banner-item")}
							>
								Update
							</button>
						)}
					</form>
					<div className="table-wrapper">
						<PrimaryTable
							tableHeader={tableHeader1}
							tableBody={firstSectionData}
							deleteCol={true}
							deleteRow={deleteSection1}
							updateRow={updateSection1}
						/>
					</div>
				</>
			) : section == 2 ? (
				<>
					<form className="home-page-form" onSubmit={handleSecondSection}>
						<div className="two-columns-wrapper">
							{/* <div className="input-wrapper">
                    <label htmlFor="">About</label>
                    <textarea
                      name="content"
                      className='home-input'
                      cols="30"
                      rows="10"
                      required
                      value={secondSection.content}
                      onChange={(event) => setSecondSection({ ...secondSection, [event.target.name]: event.target.value })}
                    ></textarea>
                  </div> */}
							<div className="input-wrapper">
								<label htmlFor="">Image</label>
								<ImageUploader
									name="HOME_IMAGE_2"
									passImage={setSec2Image}
									isFileAvailable={sec2Image ? true : false}
									backendURL={backendURL}
								/>
							</div>
						</div>
						<div className="input-wrapper">
							<label htmlFor="">Info</label>
							<input
								type="text"
								name="title"
								className="home-input"
								value={secondSection.title}
								required
								onChange={(event) =>
									setSecondSection({
										...secondSection,
										[event.target.name]: event.target.value,
									})
								}
							/>
						</div>
						<button className="btn-submit">Upload</button>
					</form>
					<PrimaryTable
						tableHeader={tableHeader2}
						tableBody={secondSectionData}
						deleteCol={true}
						deleteRow={deleteSection2}
						updateRow={updateSection2}
					/>
				</>
			) : section == 3 ? (
				<>
					<form className="home-page-form" onSubmit={handleThirdSection}>
						<div className="two-columns-wrapper">
							<div className="input-wrapper">
								<label htmlFor="">Image</label>
								<ImageUploader
									name="HOME_IMAGE_2"
									passImage={setSec3Image}
									isFileAvailable={sec3Image ? true : false}
									backendURL={backendURL}
								/>
							</div>

							<div className="input-wrapper">
								<label htmlFor="">Info</label>
								<input
									type="text"
									name="title"
									value={thirdSection.title}
									required
									className="home-input"
									onChange={(e) =>
										setThirdSection({
											...thirdSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							{/* <div className="input-wrapper">
                      <label htmlFor="">Testimonial</label>
                      <textarea name="content" required className='home-input' id="" cols="30" rows="10" onChange={e=> setThirdSection({...thirdSection,[e.target.name]: e.target.value})}></textarea>
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="">Profile</label>
                      <ImageUploader name="HOME_CAROUSEL" passImage={setSec3Image} isFileAvailable={sec3Image ? true : false}/>
                    </div> */}
						</div>
						<button className="btn-submit">Upload</button>
					</form>
					<div className="table-wrapper">
						<PrimaryTable
							tableBody={thirdSectionData}
							tableHeader={tableHeader3}
							deleteCol={true}
							deleteRow={deleteSection3}
							updateRow={updateSection3}
						/>
					</div>
				</>
			) : section == 4 ? (
				<>
					<form className="home-page-form" onSubmit={handleFourthSection}>
						<div className="two-columns-wrapper">
							<div className="input-wrapper">
								<label htmlFor="">Image</label>
								<ImageUploader
									name="HOME_IMAGE_2"
									passImage={setSec4Image}
									isFileAvailable={sec4Image ? true : false}
									backendURL={backendURL}
								/>
							</div>

							<div className="input-wrapper">
								<label htmlFor="">Name</label>
								<input
									type="text"
									name="name"
									value={fourthSection.name}
									required
									className="home-input"
									onChange={(e) =>
										setFourthSection({
											...fourthSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							<div className="input-wrapper">
								<label htmlFor="">Role</label>
								<input
									type="text"
									name="role"
									value={fourthSection.role}
									required
									className="home-input"
									onChange={(e) =>
										setFourthSection({
											...fourthSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							{/* <div className="input-wrapper">
                      <label htmlFor="">Testimonial</label>
                      <textarea name="content" required className='home-input' id="" cols="30" rows="10" onChange={e=> setThirdSection({...thirdSection,[e.target.name]: e.target.value})}></textarea>
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="">Profile</label>
                      <ImageUploader name="HOME_CAROUSEL" passImage={setSec3Image} isFileAvailable={sec3Image ? true : false}/>
                    </div> */}
						</div>
						<button className="btn-submit">Upload</button>
					</form>
					<div className="table-wrapper">
						<PrimaryTable
							tableBody={fourthSectionData}
							tableHeader={tableHeader4}
							deleteCol={true}
							deleteRow={deleteSection4}
							updateRow={updateSection4}
						/>
					</div>
				</>
			) : section == 5 ? (
				<>
					<form className="home-page-form" onSubmit={handleFifthSection}>
						<div className="two-columns-wrapper">
							<div className="input-wrapper">
								<label htmlFor="">Image</label>
								<ImageUploader
									name="HOME_IMAGE_2"
									passImage={setSec5Image}
									isFileAvailable={sec5Image ? true : false}
									backendURL={backendURL}
								/>
							</div>

							<div className="input-wrapper">
								<label htmlFor="">info</label>
								<input
									type="text"
									name="title"
									value={fifthSection.title}
									required
									className="home-input"
									onChange={(e) =>
										setFifthSection({
											...fifthSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>

							{/* <div className="input-wrapper">
                      <label htmlFor="">Testimonial</label>
                      <textarea name="content" required className='home-input' id="" cols="30" rows="10" onChange={e=> setThirdSection({...thirdSection,[e.target.name]: e.target.value})}></textarea>
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="">Profile</label>
                      <ImageUploader name="HOME_CAROUSEL" passImage={setSec3Image} isFileAvailable={sec3Image ? true : false}/>
                    </div> */}
						</div>
						<button className="btn-submit">Upload</button>
					</form>
					<div className="table-wrapper">
						<PrimaryTable
							tableBody={fifthSectionData}
							tableHeader={tableHeader5}
							deleteCol={true}
							deleteRow={deleteSection5}
							updateRow={updateSection5}
						/>
					</div>
				</>
			) : section == 6 ? (
				<>
					<form className="home-page-form" onSubmit={handleSixthSection}>
						<div className="two-columns-wrapper">
							<div className="input-wrapper">
								<label htmlFor="">Image</label>
								<ImageUploader
									name="HOME_IMAGE_2"
									passImage={setSec6Image}
									isFileAvailable={sec6Image ? true : false}
									backendURL={backendURL}
								/>
							</div>

							<div className="input-wrapper">
								<label htmlFor="">Name</label>
								<input
									type="text"
									name="name"
									value={sixthSection.name}
									required
									className="home-input"
									onChange={(e) =>
										setSixthSection({
											...sixthSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							<div className="input-wrapper">
								<label htmlFor="">Role</label>
								<input
									type="text"
									name="role"
									value={sixthSection.role}
									required
									className="home-input"
									onChange={(e) =>
										setSixthSection({
											...sixthSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							<div className="input-wrapper">
								<label htmlFor="">message</label>
								<input
									type="text"
									name="message"
									value={sixthSection.message}
									required
									className="home-input"
									onChange={(e) =>
										setSixthSection({
											...sixthSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							<div className="input-wrapper">
								<label htmlFor="">email</label>
								<input
									type="text"
									name="email"
									value={sixthSection.email}
									required
									className="home-input"
									onChange={(e) =>
										setSixthSection({
											...sixthSection,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							{/* <div className="input-wrapper">
                      <label htmlFor="">Testimonial</label>
                      <textarea name="content" required className='home-input' id="" cols="30" rows="10" onChange={e=> setThirdSection({...thirdSection,[e.target.name]: e.target.value})}></textarea>
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="">Profile</label>
                      <ImageUploader name="HOME_CAROUSEL" passImage={setSec3Image} isFileAvailable={sec3Image ? true : false}/>
                    </div> */}
						</div>
						<button className="btn-submit">Upload</button>
					</form>
					<div className="table-wrapper">
						<PrimaryTable
							tableBody={sixthSectionData}
							tableHeader={tableHeader6}
							deleteCol={true}
							deleteRow={deleteSection6}
							updateRow={updateSection6}
						/>
					</div>
				</>
			) : null}
		</section>
	);
}
