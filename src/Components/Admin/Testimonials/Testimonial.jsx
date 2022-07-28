import React from "react";
import ImageUploader from "../../Utils/ImageUploader/ImageUploader";
import "../ManagePages/HomaPageManager/HomePageManager.css";

export const Testimonial = () => {
	return (
		<div className="home-page-manager ">
			<ImageUploader />
			<div className="input-wrapper">
				<label htmlFor="">Info</label>
				<input
					type="text"
					name="title"
					className="home-input"
					value=""
					required
				/>
			</div>
		</div>
	);
};
export default Testimonial;
