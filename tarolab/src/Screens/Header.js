import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle, faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [memberMenu, setMemberMenu] = useState(false);
    const [menu, setMenu] = useState(false);
    const [notificationMenu, setNotificationMenu] = useState(false);
    const [notifications, setNotifications] = useState([]); // 알림 상태
    const [nickname, setNickname] = useState("익명 사용자");
    const [role, setRole] = useState("(Guest)");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
                setIsAuthenticated(data.role !== "(Guest)");
            } catch (error) {
                setNickname("익명 사용자");
                setRole("(Guest)");
                setIsAuthenticated(false);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) return;

            try {
                const response = await fetch("http://localhost:8080/api/notifications", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("알림 정보를 가져올 수 없습니다.");
                }

                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("알림 정보를 가져오는 중 에러 발생:", error);
            }
        };

        if (isAuthenticated) {
            fetchNotifications();
        }
    }, [isAuthenticated]);

    const handleNotificationClick = (notificationId) => {
        // 알림 읽음 처리 API 호출

        navigate(`/notifications/${notificationId}`);

        const markNotificationAsRead = async () => {
            const token = localStorage.getItem("authToken");

            try {
                await fetch(`http://localhost:8080/api/notifications/${notificationId}/read`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                // 알림 목록 갱신
                setNotifications((prev) =>
                    prev.map((n) =>
                        n.id === notificationId ? { ...n, isRead: true } : n
                    )
                );
            } catch (error) {
                console.error("알림 읽음 처리 중 에러 발생:", error);
            }
        };

        markNotificationAsRead();
    };

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
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`dropdown-item ${notification.isRead ? "read" : "unread"}`}
                                    onClick={() => handleNotificationClick(notification.id)}
                                >
                                    {notification.message}
                                </div>
                            ))
                        ) : (
                            <div className="dropdown-item">새 알림이 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
