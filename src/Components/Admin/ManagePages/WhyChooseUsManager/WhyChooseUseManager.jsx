import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import AdminPageManager from '../../../../APIServices/AdminPageManager';
import axiosInstance from '../../../../Axios/axiosInstance';
import ImageUploader from '../../../Utils/ImageUploader/ImageUploader'

export default function WhyChooseUseManager() {
    const { section } = useParams()
    const [formData,setFormData] = useState({title:'',content:""});
    const [living,setLiving] = useState(null)
    const [bed,setBed] = useState(null)
    const [office,setOffice] = useState(null)
    const [dining,setDining] = useState(null)
    const [balcony,setBalcony] = useState(null)
    const [kitchen,setKitchen] = useState(null)
    const [image1,setImage1] = useState(null);
    const [image2,setImage2] = useState(null);
    const [image3,setImage3] = useState(null);
    const [image4,setImage4] = useState(null);
    const [image5,setImage5] = useState(null);
    const [image6,setImage6] = useState(null);
    const [image7,setImage7] = useState(null);
    const [image8,setImage8] = useState(null);

    const handleFeatureFormSubmission = (event) => {
        event.preventDefault();
        let fd = new FormData();
        let data = {
            ...formData,
            img_living: living,
            img_bed: bed,
            img_office:office,
            img_dining:dining,
            img_balcony: balcony,
            img_kitchen: kitchen
        }
        Object.keys(data).forEach((key) => {
            fd.append(key, data[key])
        })
        
        axiosInstance.put('/crousels/about-feature',fd)
            .then(res => {
                console.log(res);
                if(res.data.success){
                    toast.success("Uploaded successfully");
                    setFormData({title:'',content:''})
                    setBalcony(null);
                    setLiving(null);
                    setBed(null);
                    setDining(null);
                    setKitchen(null);
                    setOffice(null);
                }else{
                    toast.error("Something went wrong!")
                }
            }).catch(err =>{
                toast.error("Something went wrong!")
            })
    }

    const handleWorkSubmission = (event) => {
        event.preventDefault();
        let fd = new FormData();
        let data = {
            img_1: image1,
            img_2: image2,
            img_3: image3,
            img_4: image4,
            img_5: image5,
            img_6: image6,
            img_7: image7,
            img_8: image8,
        }
        console.log(formData.title,formData.content);
        if(formData.title !== "")
            data.title = formData.title
        if(formData.content !== "")
            data.content = formData.content 
        Object.keys(data).forEach((key) => {
            fd.append(key, data[key])
        })
        
        axiosInstance.put('/crousels/about-works',fd)
            .then(res => {
                console.log(res);
                if(res.data.success){
                    toast.success("Uploaded successfully");
                    setFormData({title:'',content:''})
                    setImage1(null)
                    setImage2(null)
                    setImage3(null)
                    setImage4(null)
                    setImage5(null)
                    setImage6(null)
                    setImage7(null)
                    setImage8(null)
                }else{
                    toast.error("Something went wrong!")
                }
            }).catch(err =>{
                toast.error("Something went wrong!")
            })
    }
    return (
        <div className="home-page-manager">
            {
                section == 1 ?
                    <>

                    </>
                    : (section == 2) ?
                        <>
                            <form className="home-page-form" onSubmit={handleFeatureFormSubmission}>
                                <div className="two-columns-wrapper">
                                    <div className="input-wrapper">
                                        <label htmlFor="">Title</label>
                                        <input type="text" name='title' value={formData.title} className="home-input" onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})}/>
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="">Description</label>
                                        <textarea name="content" className='home-input' value={formData.content} id="" cols="30" rows="10" onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})}></textarea>
                                    </div>
                                    <div className="image-two-columns">
                                        <div className="input-wrapper">
                                            <label htmlFor="">Living Room</label>
                                            <ImageUploader name="LIVING_ROOM" passImage={setLiving} isFileAvailable={living?true:false}/>
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="">Bed Room</label>
                                            <ImageUploader name="BED_ROOM" passImage={setBed} isFileAvailable={bed?true:false}/>
                                        </div>
                                    </div>
                                    <div className="image-two-columns">
                                        <div className="input-wrapper">
                                            <label htmlFor="">Office Room</label>
                                            <ImageUploader name="OFFICE_ROOM" passImage={setOffice} isFileAvailable={office?true:false}/>
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="">Dining</label>
                                            <ImageUploader name="DINING" passImage={setDining} isFileAvailable={dining?true:false}/>
                                        </div>
                                    </div>

                                    <div className="image-two-columns">
                                        <div className="input-wrapper">
                                            <label htmlFor="">Balcony</label>
                                            <ImageUploader name="BALCONY" passImage={setBalcony} isFileAvailable={balcony?true:false}/>
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="">Kitchen</label>
                                            <ImageUploader name="KITCHEN" passImage={setKitchen} isFileAvailable={kitchen?true:false} />
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-submit">Upload</button>
                            </form>
                        </>
                        : (section == 3) ?
                            <>
                                <form className="home-page-form" onSubmit={handleWorkSubmission}>
                                    <div className="two-columns-wrapper">
                                        <div className="input-wrapper">
                                            <label htmlFor="">Title</label>
                                            <input type="text" value={formData.title} name="title"  className="home-input" onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})} />
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="">Description</label>
                                            <textarea name="content" value={formData.content} className='home-input' id="" cols="30" rows="10" onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})}></textarea>
                                        </div>
                                        <div className="image-two-columns">
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 1</label>
                                                <ImageUploader name="IMAGE_1" passImage={setImage1} isFileAvailable={image1 ? true : false} />
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 2</label>
                                                <ImageUploader name="IMAGE_2" passImage={setImage2} isFileAvailable={image2 ? true : false}/>
                                            </div>
                                        </div>
                                        <div className="image-two-columns">
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 3</label>
                                                <ImageUploader name="IMAGE_3" passImage={setImage3} isFileAvailable={image3 ? true : false}/>
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 4</label>
                                                <ImageUploader name="IMAGE_4" passImage={setImage4} isFileAvailable={image4 ? true : false}/>
                                            </div>
                                        </div>


                                        <div className="image-two-columns">
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 5</label>
                                                <ImageUploader name="IMAGE_5" passImage={setImage5} isFileAvailable={image5 ? true : false}/>
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 6</label>
                                                <ImageUploader name="IMAGE_6" passImage={setImage6} isFileAvailable={image6 ? true : false}/>
                                            </div>
                                        </div>
                                        <div className="image-two-columns">
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 7</label>
                                                <ImageUploader name="IMAGE_7" passImage={setImage7} isFileAvailable={image7 ? true : false}/>
                                            </div>
                                            <div className="input-wrapper">
                                                <label htmlFor="">Image 8</label>
                                                <ImageUploader name="IMAGE_8" passImage={setImage8} isFileAvailable={image8 ? true : false}/>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn-submit">Upload</button>
                                </form>
                            </>
                            : null
            }
        </div>
    )
}
