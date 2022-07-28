import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../../../Axios/axiosInstance'
import PrimaryTable from '../../Utils/PrimaryTable/PrimaryTable'

let tableHeader = ["Si.No", "Name", "Email", "Contact","Referal Id","Action"]

export default function ReferAndEarn() {
    const [referals,setReferals] = useState([])
    useEffect(() => {
        getReferals()
    },[])
    const getReferals = () => {
        axiosInstance.get('/referal/get-all-referals')
        .then(res => {
            setReferals(res.data.item)
        }).catch(err => {
            toast.error("Please refresh the page. Something went wrong!")
        })
    }
    return (
        <div className="refer-and-earn">
            <div className="table-wrapper">
                <PrimaryTable tableHeader={tableHeader} tableBody={referals} isAction={true} />
            </div>
        </div>
    )
}
