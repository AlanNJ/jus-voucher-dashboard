import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminPageManager from '../../../../APIServices/AdminPageManager'
import axiosInstance from '../../../../Axios/axiosInstance'
import ImageUploader from '../../../Utils/ImageUploader/ImageUploader'
import PrimaryTable from '../../../Utils/PrimaryTable/PrimaryTable'

let tableHeader = {
    section1: ['SiNo','Title','Description','Delete'],
    section2: ['SiNo','Item','Discount','Delete'],
    section3: ['SiNo','Discount','Delete']

}
let tableBody = {
    section1: [
        {
            siNo: 1,
            title: "Laminated Floor",
            describtion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem placeat voluptatibus totam aut necessitatibus veritatis, illo harum mollitia quidem optio asperiores modi nesciunt consequuntur facilis nisi odio ipsa veniam reprehenderit blanditiis minus sunt non doloremque? Fugit error nemo ipsam dignissimos! Est voluptatum consequatur exercitationem fugiat ipsum officiis id, repellat a?",
            delete: 'delete'
        },
        {
            siNo: 2,
            title: "Laminated Floor",
            describtion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem placeat voluptatibus totam aut necessitatibus veritatis, illo harum mollitia quidem optio asperiores modi nesciunt consequuntur facilis nisi odio ipsa veniam reprehenderit blanditiis minus sunt non doloremque? Fugit error nemo ipsam dignissimos! Est voluptatum consequatur exercitationem fugiat ipsum officiis id, repellat a?",
            delete: 'delete'
        },
        {
            siNo: 3,
            title: "Laminated Floor",
            describtion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem placeat voluptatibus totam aut necessitatibus veritatis, illo harum mollitia quidem optio asperiores modi nesciunt consequuntur facilis nisi odio ipsa veniam reprehenderit blanditiis minus sunt non doloremque? Fugit error nemo ipsam dignissimos! Est voluptatum consequatur exercitationem fugiat ipsum officiis id, repellat a?",
            delete: 'delete'
        },
        {
            siNo: 4,
            title: "Laminated Floor",
            describtion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem placeat voluptatibus totam aut necessitatibus veritatis, illo harum mollitia quidem optio asperiores modi nesciunt consequuntur facilis nisi odio ipsa veniam reprehenderit blanditiis minus sunt non doloremque? Fugit error nemo ipsam dignissimos! Est voluptatum consequatur exercitationem fugiat ipsum officiis id, repellat a?",
            delete: 'delete'
        }
    ],
    section2: [
        {
            siNo: 1,
            title: "Laminated Floor",
            discount: 20,
            delete: 'delete'
        },
        {
            siNo: 2,
            title: "Laminated Floor",
            discount: 20,
            delete: 'delete'
        },
        {
            siNo: 3,
            title: "Laminated Floor",
            discount: 20,
            delete: 'delete'
        },
        {
            siNo: 4,
            title: "Laminated Floor",
            discount: 20,
            delete: 'delete'
        }
    ],
    section3: [
        {
            siNo: 1,
            discount: 20,
            delete: 'delete'
        },
        {
            siNo: 2,
            discount: 20,
            delete: 'delete'
        },
        {
            siNo: 3,
            discount: 20,
            delete: 'delete'
        },
        {
            siNo: 4,
            discount: 20,
            delete: 'delete'
        }
    ]
}

export default function SpecialOfferManager() {
    const { section } = useParams()
    const [sec1Image,setSec1Image] = useState(null)
    const [firstSection,setFirstSection] = useState({title:'',content:''});
    const [sectionData,setSectionData] = useState([])
    const [sec2Image,setSec2Image] = useState(null);
    const [secondSection,setSecondSection] = useState({title:'',discount:''})
    const [discount,setDiscount] = useState(0);
    const [sec3Image,setSec3Image] = useState(null)

    useEffect(() => {
        AdminPageManager.getSectionItems('specialoffers',section)
            .then(data => {
                setSectionData(data)
            })
    },[section])
    
    const handleFirstForm = async (event) => {
        event.preventDefault();
        if(sec1Image){
            let isUpload = await AdminPageManager.uploadForm('specialoffers',1,{...firstSection,img:sec1Image})
            setFirstSection({title:'',content:''})
            setSec1Image(null)
        }else{
            toast.error("Image is required!");
        }
    }

    const handleSecondForm = (event) => {
        event.preventDefault();
        if(sec2Image){
            AdminPageManager.uploadForm('specialoffers',section,{...secondSection,img: sec2Image})
            setSecondSection({title:'',discount:''})
            setSec2Image(null)
        }else{
            toast.error("Image is required!")
        }
    }

    const handleThirdForm = (event) => {
        event.preventDefault();
        if(sec3Image){
            AdminPageManager.uploadForm('specialoffers',section,{discount: discount,img: sec3Image})
            setDiscount('')
            setSec3Image(null)
        }else{
            toast.error("Image is required!")
        }
    }

    const deleteTableRow = (id) => {
        AdminPageManager.deleteItem('specialoffers',section,id)
    }

    return (
        <section className="home-page-manager">
            {
                section == 1 ?
                    <>
                        <form className="home-page-form" onSubmit={handleFirstForm}>
                            <div className="two-columns-wrapper">
                                <div className="input-wrapper">
                                    <label htmlFor="">Title</label>
                                    <input type="text" name='title' className='home-input' required onChange={(e) => setFirstSection({...firstSection,[e.target.name]:e.target.value})}/>
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Description</label>
                                    <textarea name="content" className='home-input' id="" cols="30" required rows="10" onChange={(e) => setFirstSection({...firstSection,[e.target.name]:e.target.value})}></textarea>
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Image</label>
                                    <ImageUploader name="SPECIAL_OFFER_CAROUSEL" passImage={setSec1Image} isFileAvailable={sec1Image ? true: false} />
                                </div>
                            </div>
                            <button className="btn-submit">Upload</button>
                        </form>
                        <div className="table-wrapper">
                            <PrimaryTable tableHeader={tableHeader.section1} tableBody={sectionData} deleteCol={true} deleteRow={deleteTableRow} />
                        </div>
                    </>
                    : section == 2 ?
                    <>
                        <form className="home-page-form" onSubmit={handleSecondForm}>
                            <div className="two-columns-wrapper">
                                <div className="input-wrapper">
                                    <label htmlFor="">Item</label>
                                    <input type="text" name='title' className='home-input' required onChange={(e) => setSecondSection({...secondSection,[e.target.name]: e.target.value})}/>
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Discount</label>
                                    <input type="number" name="discount" required onChange={(e) => setSecondSection({...secondSection,[e.target.name]: e.target.value})} className='home-input' id="" />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Image</label>
                                    <ImageUploader name="SECOND_CAROUSEL_IMAGE"  passImage={setSec2Image} isFileAvailable={sec2Image? true: false} />
                                </div>
                            </div>
                            <button className="btn-submit">Upload</button>
                        </form>
                        <div className="table-wrapper">
                            <PrimaryTable tableHeader={tableHeader.section2} tableBody={sectionData} deleteCol={true} deleteRow={deleteTableRow} />
                        </div>
                    </>
                    : section == 3 ?
                    <>
                        <form className="home-page-form" onSubmit={handleThirdForm}>
                            <div className="two-columns-wrapper">
                                <div className="input-wrapper">
                                    <label htmlFor="">Discount</label>
                                    <input type="number" name="discount" required onChange={(e) => setDiscount(e.target.value) } className='home-input' id="" />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="">Image</label>
                                    <ImageUploader name="THIRD_CAROUSEL_IMAGE"  passImage={setSec3Image} isFileAvailable={sec3Image? true: false} />
                                </div>
                            </div>
                            <button className="btn-submit">Upload</button>
                        </form>
                        <div className="table-wrapper">
                            <PrimaryTable tableHeader={tableHeader.section3} tableBody={sectionData} deleteCol={true} deleteRow={deleteTableRow}/>
                        </div>
                    </>
                    : null
            }
        </section>
    )
}
