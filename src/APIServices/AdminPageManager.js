import { toast } from "react-toastify";
import axiosInstance from "../Axios/axiosInstance";

export default {
    uploadForm: (page, section, data,isImage) => {
        let formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })
        axiosInstance.post(`/crousels/${page}/section-${section}/${isImage? 'image':''}`, formData)
            .then(res => {
                if (res.data.success) {
                    toast.success("Uploaded successfully")
                    window.location.reload();
                    return true;
                } else {
                    toast.error("Something went wrong!")
                    return false
                }
            }).catch(err => {
                toast.error("Something went wrong!")
                return false;
            })
    },

    

    deleteItem: (page, section, id) => {
        let isConfirmed = window.confirm("Are you sure to delete?");
        if (isConfirmed) {
            axiosInstance.delete(`/crousels/delete-content/${page}/section-${section}/` + id)
                .then(res => {
                    if (res.data.success) {
                        toast.success("Item deleted successfully")
                        window.location.reload()
                    } else {
                        toast.error("Something went wrong")
                    }
                }).catch(err => {
                    toast.error("Something went wrong")
                })
        }
    },

    getSectionItems: (page, section) => {
        return new Promise((resolve, reject) => {
            axiosInstance.get(`/crousels/get-content/${page}/section-${section}`)
                .then(res => {
                    console.log(res.data.item);
                    resolve(res.data.items)
                }).catch(err => {
                    toast.error("Something went wrong with fetching!")
                })
        })
    }
}