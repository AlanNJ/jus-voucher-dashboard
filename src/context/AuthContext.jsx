import React, { useContext, useEffect, useState } from "react";
const host = "http://localhost:8000/";
//create authentication Context
const AuthContext = React.createContext();

//create custom hook for using authContext
export function useAuth() {
  return useContext(AuthContext);
}

//Authentication Context Component
export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //create New user using email and password

  async function createUser(data) {
    const Url = host + "signup";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let resolve = await res.json();
    sessionStorage.setItem("authToken", resolve.token);
    setAuthToken(resolve.token);
    return resolve;
  }

  async function authenticateUser(data) {
    console.log(data);
    const Url = host + "login";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let resolve = await res.json();
    sessionStorage.setItem("authToken", resolve.token);
    setAuthToken(resolve.token);
    return resolve;
  }
  async function getUser() {
    const Url = host + "userInfo";
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user.data));
    setCurrentUser(user.data);

    return user.data;
  }
  async function getClinicList() {
    const Url = host + "getAllClinics";
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function uploadFile(file) {
    const data = new FormData();
    console.log(file);
    data.append("file", file);
    const Url = host + "upload";
    let res = await fetch(Url, {
      method: "POST",
      body: data,
    });
    let uploadedFile = await res.json();
    return await uploadedFile;
  }
  async function addCarouselimage(data) {
    let file = null;
    console.log(data);
    if (data.url) {
      file = await uploadFile(data.url);
    }
    const Url = host + "addCarouselimage";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
      body: JSON.stringify({
        url: host + file.filename,
        category: data.category,
        carousel_name: data.tablename,
      }),
    });
    let resolve = await res.json();
    return resolve;
  }
  async function getCarouselimage(data) {
    const Url = host + `getCarouselimage?carousel_name=${data}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function getALLCarouselImage(data) {
    const Url = host + "getAllCarouselimage";
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function getCarouselCategory(data) {
    const Url = host + `getCarouselCategory?category=${data}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function sendQuoteRequest(data) {
    console.log(data);

    let file1 = await uploadFile(data.dental_record_1);
    let imageUrl1 = host + (await file1.filename);
    let file2 = await uploadFile(data.dental_record_2);
    let imageUrl2 = host + (await file2.filename);
    console.log(imageUrl1, imageUrl2);
    const Url = host + "sendQuoteRequest";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        dental_record_1: imageUrl1,
        dental_record_2: imageUrl2,
      }),
    });
    let user = await res.json();
    return user;
  }
  async function addBlog(data) {
    let file = null;
    console.log(data);
    if (data.image_file) {
      file = await uploadFile(data.image_file);
    }
    const Url = host + "addBlog";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
      body: JSON.stringify({ ...data, image_url: host + file.filename }),
    });
    let resolve = await res.json();
    return resolve;
  }
  async function getAllBlogs() {
    const Url = host + "getAllBlogs";
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function getBlogById(id) {
    const Url = host + `getBlogById?id=${id}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function updateBlog(data) {
    let file = null;
    console.log(data);
    if (data.image_file) {
      file = await uploadFile(data.image_file);
    }
    let image_url = file ? host + file.filename : data.image_url;
    const Url = host + "updateBlog";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
      body: JSON.stringify({ ...data, image_url }),
    });
    let resolve = await res.json();
    return resolve;
  }
  async function deleteBlog(id, image_url) {
    const Url = host + `deleteBlogById?id=${id}&image_url=${image_url}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function postComment(data) {
    const Url = host + "postComment";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + authToken,
      },
      body: JSON.stringify(data),
    });
    let resolve = await res.json();
    return resolve;
  }
  async function verifyComment(data) {
    const Url = host + `verifyComment?id=${data}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + authToken,
      },
    });
    let resolve = await res.json();
    return resolve;
  }
  async function deleteComment(data) {
    const Url = host + `deleteComment?id=${data}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + authToken,
      },
    });
    let resolve = await res.json();
    return resolve;
  }
  async function getBlogComments(id) {
    const Url = host + `getBlogComments?id=${id}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function getAllComments(id) {
    const Url = host + `getAllComment`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function likeBlog(id) {
    const Url = host + `likeBlog?id=${id}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function postTestimonial(data) {
    const Url = host + "postTestimonial";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + authToken,
      },
      body: JSON.stringify(data),
    });
    let resolve = await res.json();
    return resolve;
  }
  async function getAllTestimonial(id) {
    const Url = host + `getAllTestimonial`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function verifyTestimonial(data) {
    const Url = host + `verifyTestimonial?id=${data}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + authToken,
      },
    });
    let resolve = await res.json();
    return resolve;
  }
  async function deleteTestimonial(data) {
    const Url = host + `deleteTestimonial?id=${data}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + authToken,
      },
    });
    let resolve = await res.json();
    return resolve;
  }
  async function getAllVerifiedTestimonials() {
    const Url = host + `getAllVerifiedTestimonial`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function addCategory(data) {
    let file = null;
    console.log(data);
    if (data.image_file) {
      file = await uploadFile(data.image_file);
    }
    const Url = host + "addCategory";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
      body: JSON.stringify({
        ...data,
        Category_image_url: host + file.filename,
      }),
    });
    let resolve = await res.json();
    return resolve;
  }
  async function getAllCategory() {
    const Url = host + "getALLCategory";
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await res.json();
    return user;
  }
  async function ContactUs(data) {
    const Url = host + "contactUs";
    let res = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let user = await res.json();
    return user;
  }
  async function deleteImageById(Id, url) {
    const Url = host + `deleteImageById?Id=${Id}&url=${url}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function getContactUsData() {
    const Url = host + "getContactUsData";
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function deleteCategory(Id, Category_image_url) {
    const Url =
      host + `deleteCategory?Id=${Id}&Category_image_url=${Category_image_url}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + authToken,
      },
    });
    let user = await res.json();
    return user;
  }
  async function deleteCustomerInfo(data) {
    const Url = host + `deleteCustomerInfo?Id=${data}`;
    let res = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + authToken,
      },
    });
    let resolve = await res.json();
    return resolve;
  }
  function logout() {
    sessionStorage.setItem("user", null);
    sessionStorage.setItem("authToken", null);
    setCurrentUser(null);
    setAuthToken(null);
    sessionStorage.clear();
  }
  //listen for authentication change event

  useEffect(() => {
    const checkToken = sessionStorage.getItem("authToken");
    const checkUser = sessionStorage.getItem("user");
    setLoading(false);
    if (!authToken) {
      setAuthToken(checkToken);
    }
    if (!checkUser) {
      setAuthToken(checkUser);
    }
  }, []);
  useEffect(() => {
    getUser();

    return () => {};
  }, [authToken]);

  const value = {
    currentUser,
    authToken,
    createUser,
    authenticateUser,
    sendQuoteRequest,
    getUser,
    getClinicList,
    addBlog,
    getAllBlogs,
    getBlogById,
    getBlogComments,
    likeBlog,
    postComment,
    logout,
    addCarouselimage,
    getCarouselimage,
    postTestimonial,
    verifyComment,
    getAllComments,
    getAllTestimonial,
    deleteComment,
    verifyTestimonial,
    deleteTestimonial,
    getAllVerifiedTestimonials,
    addCategory,
    getAllCategory,
    getCarouselCategory,
    updateBlog,
    deleteBlog,
    ContactUs,
    deleteImageById,
    getALLCarouselImage,
    getContactUsData,
    deleteCategory,
    deleteCustomerInfo
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
