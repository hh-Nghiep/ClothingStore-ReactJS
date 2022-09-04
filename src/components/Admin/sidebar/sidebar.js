import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faBoxArchive, faUserGear, faUser, faAlignJustify, faTruckFast, faPercent } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const userRole = useSelector(state => state.user.role)
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.setItem("isLogin", false);
        var infoUser = {
            maNguoiDung: "",
            hoTen: "",
            email: "",
            sdt: "",
            diaChi: "",
        }
        localStorage.setItem("infoUser", JSON.stringify(infoUser));
        navigate('/login');
    }

    var navItem = [
        {
            link: "/admin/revenue",
            icon: <FontAwesomeIcon icon={faChartPie} />,
            title: " Doanh Thu",
            role: 1,
        },
        {
            link: "/admin/product",
            icon: <FontAwesomeIcon icon={faBoxArchive} />,
            title: " Sản Phẩm",
            role: 2,
        },
        {
            link: "/admin/category",
            icon: <FontAwesomeIcon icon={faAlignJustify} />,
            title: " Thể Loại",
            role: 2,
        },
        {
            link: "/admin/sale",
            icon: <FontAwesomeIcon icon={faPercent} />,
            title: "Khuyến Mãi",
            role: 2,
        },
        {
            link: "/admin/order",
            icon: <FontAwesomeIcon icon={faTruckFast} />,
            title: "Quản Lý Đơn Hàng",
            role: 2,
        },
        {
            link: "/admin/manageruser",
            icon: <FontAwesomeIcon icon={faUserGear} />,
            title: "Quản Lý Người Dùng",
            role: 1,
        },
        {
            link: "/admin/manageruser",
            icon: <FontAwesomeIcon icon={faUser} />,
            title: "Tài Khoản",
            role: 2,
        },
    ]

    useEffect(() => {
        if (userRole !== 1 && userRole !== 2) {
            alert("Bạn Không Có Quyền Vào Site Này !!!!!")
            navigate('/')
        }
    }, [])

    return (
        <>
            <ul
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
                        Site Admin MultiShop
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
                {navItem.filter(item => item.role >= userRole).map((item, index) => {
                    return (
                        <li className="nav-item active" key={index}>
                            <NavLink className="nav-link" to={item.link}>
                                {item.icon}
                                <span> {item.title}</span>
                            </NavLink>
                        </li>
                    )
                })}

                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button onClick={() => Logout()} className="rounded-circle border-0" id="sidebarToggle" />
                </div>
            </ul>
        </>
    )
}
