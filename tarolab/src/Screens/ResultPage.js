import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style/resultPage.css"; // CSS 파일 연결
import userAvatar from "../assets/images/user.jpg"; // 사용자 프로필 이미지
import gyreongAvatar from "../assets/images/oldman.jpg"; // 기령님 프로필 이미지

const ResultPage = () => {
    const location = useLocation();
    const resultId = location.state?.resultId;
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const baseUrl = "http://localhost:8080";

    useEffect(() => {
        const fetchResultData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/tarot/results/${resultId}`, {
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("결과 데이터를 가져오지 못했습니다.");
                }

                const data = await response.json();
                console.log("Fetched Result Data:", data);
                setResultData(data);
            } catch (error) {
                console.error("결과 데이터 조회 오류:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (resultId) {
            fetchResultData();
        }
    }, [resultId]);

    if (isLoading) {
        return <p>결과 데이터를 불러오는 중입니다...</p>;
    }

    if (!resultData) {
        return <p>결과 데이터를 찾을 수 없습니다.</p>;
    }

    const cards = [
        { id: resultData.card1Id, name: resultData.card1Name, imageUrl: resultData.card1ImageUrl, meaningReverse: resultData.card1MeaningReverse },
        { id: resultData.card2Id, name: resultData.card2Name, imageUrl: resultData.card2ImageUrl, meaningReverse: resultData.card2MeaningReverse },
        { id: resultData.card3Id, name: resultData.card3Name, imageUrl: resultData.card3ImageUrl, meaningReverse: resultData.card3MeaningReverse },
        { id: resultData.card4Id, name: resultData.card4Name, imageUrl: resultData.card4ImageUrl, meaningReverse: resultData.card4MeaningReverse },
        { id: resultData.card5Id, name: resultData.card5Name, imageUrl: resultData.card5ImageUrl, meaningReverse: resultData.card5MeaningReverse },
        { id: resultData.card6Id, name: resultData.card6Name, imageUrl: resultData.card6ImageUrl, meaningReverse: resultData.card6MeaningReverse },
    ];

    const splitIntoTwoSentences = (text) => {
        const sentences = text.split(/(?<=[.!?])\s+/); // 문장 단위로 분할 (정규식 사용)
        const result = [];
        for (let i = 0; i < sentences.length; i += 2) {
            result.push(sentences.slice(i, i + 2).join(" ")); // 두 문장씩 묶음
        }
        return result;
    };

// 조언 블록 생성 부분 수정
    const gptBlocks = resultData.gptResult
        ? splitIntoTwoSentences(resultData.gptResult)
        : [];

    // 날짜 표시 포맷
    const formattedDate = resultData.createdDate
        ? new Date(resultData.createdDate).toLocaleString()
        : "날짜 정보 없음";

    return (
        <div>
            <Header/>

            <div className="result-container">
                <h1 className="result-title">
                    AI 타로 <span className="highlight">점술 결과</span>
                </h1>
                <p className="result-subtitle">AI 타로 점술을 통해 통찰과 지침을 얻으세요</p>

                {/* 날짜 표시 */}
                <div className="result-date">
                    <p><strong>결과 생성 날짜:</strong> {formattedDate}</p>
                </div>

                {/* 카드 결과 영역 */}
                <div className="card-results">
                    {cards.map((card, index) => (
                        <div key={index} className="result-card">
                            <img src={`${baseUrl}${card.imageUrl}`} alt={card.name} className="result-card-image"/>
                            <p className="result-card-name">{card.name}</p>
                            <p className="result-card-meaning">{card.meaningReverse}</p>
                        </div>
                    ))}
                </div>

                {/* 사용자 질문 블록 */}
                <div className="dialog-box">
                    <img src={userAvatar} alt="User" className="avatar-image"/>
                    <div className="dialog-content user-dialog">
                        <p>{resultData.question}</p>
                    </div>
                </div>

                {/* 기령님의 조언 블록 */}
                {gptBlocks.length > 0 &&
                    gptBlocks.map((block, index) => (
                        <div key={index} className="dialog-box">
                            <img src={gyreongAvatar} alt="Gyreong" className="avatar-image"/>
                            <div className="dialog-content gyreong-dialog">
                                <p>{block}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="retry-container">
                <button className="retry-button" onClick={() => navigate("/Question")}>
                    다시 점치기
                </button>
            </div>
            <Footer/>
        </div>
    );
};

export default ResultPage;
