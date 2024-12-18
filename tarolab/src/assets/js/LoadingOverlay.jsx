import React from "react";
import "../style/loadingOverlay.css"; // 로딩 스타일 분리

const LoadingOverlay = ({ loadingPercentage }) => {
    return (
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
                <button className="loading-button">결과를 불러오는 중...</button>
            </div>
        </div>
    );
};

export default LoadingOverlay;
