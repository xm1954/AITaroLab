import React, { useState } from "react";
import axios from "axios";
import "../style/FeedbackForm.css";
import Header from "./Header";
import Footer from "./Footer";

const FeedbackForm = () => {
    const [feedbackType, setFeedbackType] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("로그인이 필요합니다. 다시 로그인 해주세요.");
                return;
            }

            // API 호출
            const response = await axios.post(
                "http://localhost:8080/api/question",
                {
                    feedbackType, // `feedbackType`은 서버에서 처리하도록 요청
                    content, // 피드백 내용
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // 성공 처리
            alert("피드백이 성공적으로 제출되었습니다.");
            console.log("서버 응답:", response.data);

            // 폼 초기화
            setFeedbackType("");
            setContent("");
        } catch (error) {
            console.error("피드백 제출 실패:", error);
            alert(
                `피드백 제출에 실패했습니다.\n오류: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
    };

    return (
        <div>
            <Header />
            <div className="feedback-form-container">
                <h1 className="feedback-title">사용자 피드백</h1>
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="feedbackType">피드백 유형 *</label>
                        <select
                            id="feedbackType"
                            value={feedbackType}
                            onChange={(e) => setFeedbackType(e.target.value)}
                            required
                        >
                            <option value="">피드백 유형을 선택해 주세요</option>
                            <option value="bug">버그 신고</option>
                            <option value="feature">기능 요청</option>
                            <option value="other">기타</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">피드백 내용 *</label>
                        <textarea
                            id="content"
                            placeholder="피드백 내용을 자세히 설명해 주세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                        피드백 제출
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default FeedbackForm;
