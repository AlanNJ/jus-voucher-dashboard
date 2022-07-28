import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from '../../../Axios/axiosInstance'
import PrimaryTable from '../../Utils/PrimaryTable/PrimaryTable'

let tableHeader = ["SiNo", "Email","Actions"]
export default function NewsLetter() {
    const [newsLetter,setNewsLetter] = useState([]);

    useEffect(() => {
        getNewsLetters();
    },[])

    const getNewsLetters = () => {
        axiosInstance.get('/newsletter/get-news-letters')
        .then(res => {
            setNewsLetter(res.data.letters)
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="news-letter">
            <div className="table-wrapper">
                {
                    newsLetter[0]&&
                    <PrimaryTable tableHeader={tableHeader} tableBody={newsLetter} isAction={true} />
                }
            </div>
        </div>
    )
}
