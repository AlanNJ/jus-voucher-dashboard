import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import AdminPageManager from '../../../../APIServices/AdminPageManager';
import ImageUploader from '../../../Utils/ImageUploader/ImageUploader';
import PrimaryTable from '../../../Utils/PrimaryTable/PrimaryTable';

const testimonials = {
  tableHeader: ['SiNo', 'Name', 'Testimonial', 'Delete'],
}

export default function TestimonialManager() {
  const { section } = useParams();
  const [thirdSection,setThirdSection] = useState({name:'',content:''});
  const [sec3Image,setSec3Image] = useState(null);
  const [thirdSectionData,setThirdSectionData] = useState([])

  useEffect(() => {
    AdminPageManager.getSectionItems('homepage',3)
        .then(res => {
          setThirdSectionData(res)
        })
  },[])

  const handleThirdSection = (event) => {
    event.preventDefault();
    AdminPageManager.uploadForm('homepage',3,{...thirdSection,img: sec3Image});
  }

  const deleteItems = (id) => {
    AdminPageManager.deleteItem('homepage',3,id);
  }
  return (
    <section className="home-page-manager">
      {
        section == 1 ?
          <>
            <form className="home-page-form" onSubmit={handleThirdSection}>
              <div className="two-columns-wrapper">
                <div className="input-wrapper">
                  <label htmlFor="">Name</label>
                  <input type="text" name='name' required className='home-input' onChange={e => setThirdSection({ ...thirdSection, [e.target.name]: e.target.value })} />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="">Testimonial</label>
                  <textarea name="content" required className='home-input' id="" cols="30" rows="10" onChange={e => setThirdSection({ ...thirdSection, [e.target.name]: e.target.value })}></textarea>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="">Profile</label>
                  <ImageUploader name="HOME_CAROUSEL" passImage={setSec3Image} isFileAvailable={sec3Image ? true : false} />
                </div>
              </div>
              <button className="btn-submit">Upload</button>
            </form>
            <div className="table-wrapper">
              <PrimaryTable tableBody={thirdSectionData} tableHeader={testimonials.tableHeader} deleteCol={true} deleteRow={deleteItems} />
            </div>
          </>
          : null
      }
    </section>
  )
}
