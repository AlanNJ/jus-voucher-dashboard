import React, { useState, useEffect } from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axiosInstance";

export const Blogs = (props) => {
	const [content, setContent] = useState("");
	console.log(content);
	const submitBlog = async () => {
		console.log(content);
		await axiosInstance
			.post("blogs/add-blog", content)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<h1>hello</h1>
			<EditorToolbar toolbarId={"t1"} />
			<ReactQuill
				value={content}
				placeholder={"Write something awesome..."}
				modules={modules("t1")}
				formats={formats}
			/>
			{content && <h1>content</h1>}
			<button onClick={(e) => submitBlog()}></button>
		</div>
	);
};
export default Blogs;
