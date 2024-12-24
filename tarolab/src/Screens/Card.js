import React, { useState, useRef, useEffect } from "react";
import "../style/card.css";
import cardBack from "../assets/images/b2b.png";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Card = () => {
    const totalCardsToDraw = 6; // 총 6장 뽑아야 함
    const totalCards = 72; // 카드 개수
    const scrollRef = useRef(null);
    const [selectedCards, setSelectedCards] = useState([]); // 뽑은 카드 목록
    const [isReversedArray, setIsReversedArray] = useState([]); // 역방향 여부 배열
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [loadingPercentage, setLoadingPercentage] = useState(0); // 퍼센트 상태 추가

    const location = useLocation();
    const navigate = useNavigate();
    const question = location.state?.question || "기본 질문";

    const baseUrl = "http://localhost:8080";

    useEffect(() => {
        let currentPercentage = 0;
        const duration = 30000; // 총 로딩 시간 (단위: 밀리초)
        const stepTime = duration / 100; // 1% 증가에 걸리는 시간
        let timer;

        const animateLoading = () => {
            timer = setTimeout(() => {
                currentPercentage += 1;
                setLoadingPercentage(currentPercentage);

                if (currentPercentage < 100) {
                    animateLoading(); // 계속 진행
                }
            }, stepTime);
        };

        if (isLoading) {
            animateLoading(); // 로딩 시작
        }

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [isLoading]);


    const handleCardSelect = async () => {
        if (selectedCards.length >= totalCardsToDraw) return;

        try {
            const token = localStorage.getItem("authToken");
            let cardId;
            do {
                cardId = Math.floor(Math.random() * totalCards) + 1;
            } while (selectedCards.some((card) => card.id === cardId));

            const response = await fetch(`${baseUrl}/api/tarot/select`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cardId }),
            });

            if (response.status === 401) {
                alert("로그인 후 이용 가능합니다.");
                navigate("/Login"); // 로그인 페이지로 이동
                return;
            }

            if (!response.ok) throw new Error("카드 정보를 가져올 수 없습니다.");

            const card = await response.json();
            const isReversed = Math.random() < 0.3;

            setSelectedCards((prev) => [...prev, card]);
            setIsReversedArray((prev) => [...prev, isReversed]);

            if (selectedCards.length + 1 === totalCardsToDraw) {
                setIsLoading(true);
                await sendSelectedCardsToServer(
                    [...selectedCards, card].map((c) => c.id),
                    [...isReversedArray, isReversed]
                );
                setIsLoading(false);
            }
        } catch (error) {
            console.error("카드 선택 중 오류:", error);
        }
    };

    const sendSelectedCardsToServer = async (selectedCardIds, isReversedArray) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("authToken");

            const payload = {
                selectedCardIds: selectedCardIds,
                isReversedArray: isReversedArray,
                question: question,
            };

            const response = await fetch(`${baseUrl}/api/tarot/saveResult`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 401) {
                alert("로그인 후 이용 가능합니다.");
                navigate("/Login"); // 로그인 페이지로 이동
                return;
            }

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("서버 오류 메시지:", errorMessage);
                throw new Error("결과 저장에 실패했습니다.");
            }

            const resultId = await response.json();
            console.log("저장된 Result ID:", resultId);

            navigate("/result", { state: { resultId } });
        } catch (error) {
            console.error("결과 전송 중 오류:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const remainingCards = totalCardsToDraw - selectedCards.length;

    return (
        <div className="body">
            <Header />
            <div className="content-wrapper">
                <div className="card-container fade-in">
                    <h1 className="card-title">
                        원하시는 카드를<br />
                        <span className="highlight">뽑아주세요</span>
                    </h1>
                    <p className="card-description">카드를 클릭해서 뽑으세요</p>

                    <div className="card-stack-wrapper">
                        <div className="card-stack" ref={scrollRef}>
                            {Array.from({ length: totalCards }).map((_, index) => (
                                <img
                                    key={index}
                                    src={cardBack}
                                    alt={`카드 ${index + 1}`}
                                    className="Drawcard"
                                    onClick={handleCardSelect}
                                    style={{ marginRight: "-40px", zIndex: totalCards - index }}
                                />
                            ))}
                        </div>
                    </div>

                    {remainingCards > 0 && (
                        <div className="remaining-cards">
                            <p>카드를 {remainingCards}장 더 뽑아주세요.</p>
                        </div>
                    )}

                    <div className="selected-cards">
                        {selectedCards.map((card, index) => (
                            <div key={index} className="selected-card">
                                <img
                                    src={`${baseUrl}${card.image_url}`}
                                    alt={card.name}
                                    className="selected-card-image"
                                />
                                <p>{card.name}</p>
                                <p>{isReversedArray[index] ? "역방향" : "정방향"}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {isLoading && (
                    <div className="loading-overlay">
                        <div
                            className="loading-container"
                            style={{
                                background: "linear-gradient(135deg, #7e57c2, #ab47bc)",
                            }}
                        >
                            <div
                                className="loading-circle"
                                style={{
                                    background: `conic-gradient(#fff ${loadingPercentage}%, rgba(255, 255, 255, 0.2) ${loadingPercentage}% 100%)`,
                                    transition: "background 0.5s ease-in-out", // 부드러운 게이지 차오르기
                                }}
                            >
                                <div className="loading-text">{loadingPercentage}%</div>
                            </div>
                            <button className="loading-button">스프레드 추천 중</button>
                        </div>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default Card;
