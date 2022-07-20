import React from 'react'

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
                    SB Admin <sup>2</sup>
                </div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Addons</div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a
                    className="nav-link collapsed"
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapsePages"
                    aria-expanded="true"
                    aria-controls="collapsePages"
                >
                    <i className="fas fa-fw fa-folder" />
                    <span>Pages</span>
                </a>
                <div
                    id="collapsePages"
                    className="collapse"
                    aria-labelledby="headingPages"
                    data-parent="#accordionSidebar"
                >
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <a className="collapse-item" href="login.html">
                            Login
                        </a>
                        <a className="collapse-item" href="register.html">
                            Register
                        </a>
                        <a className="collapse-item" href="forgot-password.html">
                            Forgot Password
                        </a>
                        <div className="collapse-divider" />
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="404.html">
                            404 Page
                        </a>
                        <a className="collapse-item" href="blank.html">
                            Blank Page
                        </a>
                    </div>
                </div>
            </li>
            {/* Nav Item - Tables */}
            <li className="nav-item active">
                <a className="nav-link" href="/admin/revenue">
                    <i className="fas fa-fw fa-table" />
                    <span>Revenue</span>
                </a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/admin/product">
                    <i className="fas fa-fw fa-table" />
                    <span>Product</span>
                </a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/admin/account">
                    <i className="fas fa-fw fa-table" />
                    <span>Account</span>
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
