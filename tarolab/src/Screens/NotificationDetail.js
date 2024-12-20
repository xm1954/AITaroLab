import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/NotificationDetail.css";

const NotificationDetail = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState(null);
    const [relatedQuestion, setRelatedQuestion] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotification = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(`http://localhost:8080/api/notifications/${id}`, {
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
                console.log("알림 데이터:", data); // 데이터 확인
                setNotification(data);

                if (data.relatedQuestionId) {
                    console.log("질문 ID:", data.relatedQuestionId); // 질문 ID 확인
                    fetchQuestion(data.relatedQuestionId, token);
                } else {
                    console.log("관련 질문 ID가 없습니다.");
                }
            } catch (err) {
                setError(err.message);
            }
        };


        const fetchQuestion = async (questionId, token) => {
            try {
                const response = await fetch(`http://localhost:8080/api/questions/${questionId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("질문 정보를 가져올 수 없습니다.");
                }

                const data = await response.json();
                console.log("질문 데이터:", data); // 데이터 확인

                setRelatedQuestion(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchNotification();
    }, [id]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!notification) {
        return <div className="loading-message">로딩 중...</div>;
    }

    return (
        <div className="notification-detail-container">
            <div className="notification-card">
                <h1>알림 상세보기</h1>
                <div className="notification-content">
                    <p><strong>메시지:</strong> {notification.message}</p>
                    <p><strong>작성일:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
                    <p><strong>관련 질문 ID:</strong> {notification.relatedQuestionId || "없음"}</p>
                </div>
                {relatedQuestion && (
                    <div className="related-question">
                        <h2>관련 질문</h2>
                        <div className="question-content">
                            <p><strong>작성자:</strong> {relatedQuestion.memberEmail}</p>
                            <p><strong>내용:</strong> {relatedQuestion.content}</p>
                            <p><strong>생성일:</strong> {new Date(relatedQuestion.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                )}
                <button className="back-button" onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
        </div>
    );
};

export default NotificationDetail;
