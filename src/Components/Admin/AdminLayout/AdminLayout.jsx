import React, { useRef } from 'react'
import AdminSideNavigation from '../AdminSideNavigation/AdminSideNavigation'
import './AdminLayout.css'
import profileAvatar from '../../asset/profile avatar.png'
import { Link, Outlet } from 'react-router-dom'
import logo from "../../../Images/Navbar/Logo.png"



export default function AdminLayout() {
    const hamRef = useRef(null)
    const menuRef = useRef(null)

    const handleHamburgerClick = (event) => {
        let activeItem = document.querySelector(".dropdown--active")
        event.target.classList.toggle("hamburger--active")
        menuRef.current.classList.toggle("menu--active")
        if(activeItem){
          activeItem.classList.remove("dropdown--active")
        }
    }

    const closeNav = () => {
        menuRef.current.classList.remove("menu--active")
        hamRef.current.classList.remove("hamburger--active")
    }

    return (
        <main className="admin-layout">
            <div className="side-nav-container" ref={menuRef}>
                <AdminSideNavigation closeNav={closeNav} />
            </div>
            <div className="admin-header-wrapper">
                <header className="admin-header">
                    <h3 className="header-title">Welcome to: Jus Voucher</h3>
                    <ul className="hamburger" ref={hamRef} onClick={handleHamburgerClick}>
                     
                    </ul>
                    <Link to="/" className='header-logo-wrapper'>
                        <img src={logo} className="header-logo" alt="" />
                    </Link>
                  
                </header>
            </div>

            <section className="admin-content">
                <Outlet />
            </section>
        </main>
    )
}
