import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("authToken");

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 사용자 역할 확인
    const getRoleFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // 토큰 payload 디코딩
            return payload.role; // 'role' 값 반환 (예: ADMIN, USER)
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    const role = getRoleFromToken(token);

    // role이 'ADMIN'이 아닌 경우 접근 불가
    if (role !== "ADMIN") {
        alert("관리자만 접근할 수 있습니다.");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
