import React from "react";
import "../style/content.css"; // CSS 파일 임포트

const CardSection = () => {
    // 카드 데이터 배열
    const cards = [
        {
            icon: "🕒", // 아이콘 대신 이미지도 사용 가능
            title: "24시간 타로 상담",
            description: "AI 타로 시스템으로 언제 어디서나 즉시 타로 인사이트를 받아보세요.",
        },
        {
            icon: "👥",
            title: "다양한 리더 스타일",
            description: "여러 AI 타로 리더 중 원하는 스타일을 선택하여 개인화된 경험을 즐기세요.",
        },
        {
            icon: "🔮",
            title: "오라클 카드 축복",
            description: "전통 타로 외에도 다양한 오라클 카드로 더욱 풍부한 안내를 받아보세요.",
        },
        {
            icon: "🛠️",
            title: "인터랙티브 카드 선택",
            description: "디지털 카드 선택 과정에 직접 참여하여 몰입도 높은 타로 체험을 즐기세요.",
        },
        {
            icon: "📅",
            title: "일일 타로 운세",
            description: "매일 받아보는 맞춤형 타로 인사이트로 하루를 시작하세요.",
        },
        {
            icon: "❓",
            title: "예/아니오 타로 질문",
            description: "간단한 예/아니오 타로로 특정 질문에 대한 빠른 답변을 얻어보세요.",
        },
    ];

    return (
        <div className="card-section fade-in-cardsection">
            {cards.map((card, index) => (
                <div className="card" key={index}>
                    <div className="icon">{card.icon}</div>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CardSection;
