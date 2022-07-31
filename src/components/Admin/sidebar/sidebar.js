import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faBoxArchive, faUserGear, faUser } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar() {
    return (
        <><ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            {/* Sidebar - Brand */}
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="index.html"
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    SB Admin
                </div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Addons</div>
            {/* Nav Item - Pages Collapse Menu */}

            {/* Nav Item - Tables */}
            <li className="nav-item active">
                <a className="nav-link" href="/admin/revenue">
                    <FontAwesomeIcon icon={faChartPie} />
                    <span> Revenue</span>
                </a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/admin/product">
                    <FontAwesomeIcon icon={faBoxArchive} />
                    <span> Product</span>
                </a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/admin/managerUser">
                    <FontAwesomeIcon icon={faUserGear} />
                    <span> Manager User</span>
                </a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/admin/account">
                    <FontAwesomeIcon icon={faUser} />
                    <span> Account</span>
                </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
        </ul>
        </>
    )
}
