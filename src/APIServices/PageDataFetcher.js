import { toast } from "react-toastify";
import axiosInstance from "../Axios/axiosInstance";

export default {
    getSectionItems: (page, section) => {
        return new Promise((resolve, reject) => {
            axiosInstance.get(`/front/${page}/section-${section}`)
                .then(res => {
                    resolve(res.data.items)
                }).catch(err => {
                    toast.error("Something went wrong with fetching!")
                })
        })
    },

    getWhyChooseFeatures : () => {
        return new Promise((resolve,reject) => {
            axiosInstance.get('/crousels/about-feature')
            .then(res => {
                resolve(res.data.item[0])
            }).catch(err => {
                toast.error("Something went wrong with fetching!")
            })
        })
    }
}