import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle, faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [memberMenu, setMemberMenu] = useState(false);
    const [menu, setMenu] = useState(false);
    const [notificationMenu, setNotificationMenu] = useState(false);
    const [nickname, setNickname] = useState("익명 사용자"); // 닉네임 상태
    const [role, setRole] = useState("(Guest)"); // 역할 상태
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setNickname("익명 사용자");
        setRole("(Guest)");
        setIsAuthenticated(false);
        alert("로그아웃 되었습니다.");
        navigate("/Login");
    };

    const toggleMenu = () => {
        setMenu((prev) => !prev);
        setMemberMenu(false);
        setNotificationMenu(false);
    };

    const toggleDropDown = () => {
        setMemberMenu((prev) => !prev);
        setMenu(false);
        setNotificationMenu(false);
    };

    const toggleNotification = () => {
        setNotificationMenu((prev) => !prev);
        setMemberMenu(false);
        setMenu(false);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setNickname("익명 사용자");
                setRole("(Guest)");
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/members/role", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("사용자 정보를 가져올 수 없습니다.");
                }

                const data = await response.json();
                setNickname(data.nickname);
                setRole(data.role);
                setIsAuthenticated(data.role !== "(Guest)"); // role로 인증 상태 판단
            } catch (error) {
                setNickname("익명 사용자");
                setRole("(Guest)");
                setIsAuthenticated(false);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="top">
            <div className="header">
                <div className="menu" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} size="2x" className="fa-bars" title="메뉴" />
                </div>

                <span className="logo" onClick={() => handleNavigation("/")}>
          TaroLab
        </span>

                <div className="menu-right">
                    <div className="menu-item" onClick={toggleDropDown}>
                        <FontAwesomeIcon icon={faUserCircle} className="icon" title="회원메뉴" />
                    </div>
                    <div className="menu-item" onClick={toggleNotification}>
                        <FontAwesomeIcon icon={faBell} className="icon" title="알림" />
                    </div>
                </div>

                {menu && (
                    <div className="sidebar">
                        <div className="sidebar-item">타로 뽑기</div>
                        <div className="sidebar-item">문의하기</div>
                        <div className="sidebar-item">설정</div>
                    </div>
                )}

                {memberMenu && (
                    <div className="dropdown-menu">
                        <div className="role">
                            닉네임: <br />
                            <strong>{nickname}</strong> {role}
                        </div>
                        {isAuthenticated ? (
                            <>
                                <div className="dropdown-item" onClick={handleLogout}>
                                    로그아웃
                                </div>
                                <div className="dropdown-item" onClick={() => handleNavigation("/MyPage")}>
                                    마이페이지
                                </div>
                                {role === "ADMIN" && (
                                    <div className="dropdown-item" onClick={() => handleNavigation("/admin")}>
                                        사용자 관리
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="dropdown-item" onClick={() => handleNavigation("/Login")}>
                                    로그인
                                </div>
                                <div className="dropdown-item" onClick={() => handleNavigation("/Signup")}>
                                    회원가입
                                </div>
                            </>
                        )}
                    </div>
                )}

                {notificationMenu && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">새 알림 1</div>
                        <div className="dropdown-item">새 알림 2</div>
                        <div className="dropdown-item">새 알림 3</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
