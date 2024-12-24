import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../style/FeedbackList.css";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [answers, setAnswers] = useState({}); // 모든 답변을 저장할 객체
    const [pageNumber, setPageNumber] = useState(0);
    const feedbacksPerPage = 10;

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/question", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFeedbacks(response.data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            alert("피드백 목록을 불러오는 중 에러가 발생했습니다.");
        }
    };

    const handleAnswerChange = (id, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [id]: value,
        }));
    };

    const handleAnswerSubmit = async (id) => {
        const answer = answers[id];
        if (!answer) {
            alert("답변을 입력하세요.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/question/${id}/answer`,
                { answer },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("답변이 성공적으로 제출되었습니다.");
            fetchFeedbacks();
        } catch (error) {
            console.error("Error submitting answer:", error);
            alert("답변 제출에 실패했습니다.");
        }
    };

    const pagesVisited = pageNumber * feedbacksPerPage;

    const displayFeedbacks = feedbacks
        .slice(pagesVisited, pagesVisited + feedbacksPerPage)
        .map((feedback) => (
            <div key={feedback.id} className="feedback-box">
                <div className="feedback-info">
                    <p>
                        <strong>작성자:</strong> {feedback.memberEmail}
                    </p>
                    <p>
                        <strong>내용:</strong> {feedback.content}
                    </p>
                    <p>
                        <strong>생성일:</strong>{" "}
                        {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>답변:</strong> {feedback.answer || "답변 없음"}
                    </p>
                </div>
                <div className="feedback-action">
          <textarea
              placeholder="답변을 입력하세요"
              value={answers[feedback.id] || ""}
              onChange={(e) => handleAnswerChange(feedback.id, e.target.value)}
              className="answer-textarea"
          ></textarea>
                    <button
                        onClick={() => handleAnswerSubmit(feedback.id)}
                        className="submit-answer-button"
                    >
                        답변 제출
                    </button>
                </div>
            </div>
        ));

    const pageCount = Math.ceil(feedbacks.length / feedbacksPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="feedback-container">
            <h2 className="title">피드백 목록</h2>
            {feedbacks.length > 0 ? (
                <>
                    {displayFeedbacks}
                    {pageCount > 1 && (
                        <ReactPaginate
                            previousLabel={"이전"}
                            nextLabel={"다음"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    )}
                </>
            ) : (
                <p>피드백이 없습니다.</p>
            )}
        </div>
    );
};

export default FeedbackList;
