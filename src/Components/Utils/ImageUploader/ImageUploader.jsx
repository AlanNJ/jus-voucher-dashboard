import React, { useState } from "react";
import { useEffect } from "react";
import imageUploaderIcon from "../../asset/image-uploader.png";
import "./ImageUploader.css";

export default function ImageUploader({
	name,
	passImage,
	isFileAvailable,
	backendURL,
}) {
	const [file, setFile] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		if (!isFileAvailable) {
			setUrl(null);
			setFile(null);
			passImage && passImage(null);
		}
	}, [isFileAvailable]);

	const dragOver = (event) => {
		event.preventDefault();
		event.target.classList.add("image-uploader-drag");
		console.log(event);
	};

	const dragLeave = (event) => {
		event.preventDefault();
		event.target.classList.remove("image-uploader-drag");
	};

	const dropHandler = (event) => {
		event.preventDefault();
		event.target.classList.remove("image-uploader-drag");
		setFile(event.dataTransfer.files[0]);
		setUrl(URL.createObjectURL(event.dataTransfer.files[0]));
		passImage(event.dataTransfer.files[0]);
	};

	const inputChangeHandler = (event) => {
		event.preventDefault();
		event.target.classList.remove("image-uploader-drag");
		setFile(event.target.files[0]);
		setUrl(URL.createObjectURL(event.target.files[0]));
		passImage(event.target.files[0]);
	};
	return (
		<label
			htmlFor={name}
			className="image-uploader"
			onDragOver={dragOver}
			onDragLeave={dragLeave}
			onDrop={dropHandler}
		>
			{url || backendURL ? (
				<img
					src={backendURL ? backendURL : url}
					className="file-preview"
					alt=""
				/>
			) : (
				<>
					<span>
						<img
							src={imageUploaderIcon}
							className="image-uploader-icon"
							alt=""
						/>
						Drag and Drop or Browse File
					</span>
					<input
						type="file"
						name={name}
						id={name}
						className="image-input"
						onChange={inputChangeHandler}
					/>
				</>
			)}
		</label>
	);
}
