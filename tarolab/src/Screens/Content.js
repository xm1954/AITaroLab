import React from "react";
import CardSection from "./CardSection"; // CardSection 컴포넌트 추가
import "../style/content.css";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";


const Content = () => {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path)
    }


    return (
        <div className="container">
            {/* 첫 번째 섹션 */}
            <h1 className="title fade-in">무료 온라인</h1>
            <span className="highlight fade-in">AI 타로점</span>

            <p className="description fade-in">
                운명이 궁금한 당신을 위한 특별한 시간. <br />
                AI 타로가 전하는 섬세한 이야기로 미래를 만나보세요.
            </p>
            <div className="card-container fade-in">
                <img
                    src="/images/b2b.png"
                    alt="Tarot Card"
                    className="tarot-card fade-in"
                />
            </div>
            <button
                className="start-button fade-in-button"
                onClick={(e) => {
                    handleNavigate("Question");
                }}
            >
                점 보기 시작
            </button>

            {/*/!* 두 번째 섹션 *!/*/}
            {/*<div className="reading-container">*/}
            {/*    <div className="image-group">*/}
            {/*        <img*/}
            {/*            src="https://via.placeholder.com/100"*/}
            {/*            alt="리더 1"*/}
            {/*            className="circle-image"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="text-group">*/}
            {/*        <h2 className="title">AI 타로 리딩</h2>*/}
            {/*        <p className="description">*/}
            {/*            직관적인 타로 리딩, 다양한 스타일의 타로 리더가 <br />*/}
            {/*            당신의 질문을 명확하게 해석해드립니다.*/}
            {/*        </p>*/}
            {/*        <button className="start-button">리딩 시작</button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!* 세 번째 섹션 *!/*/}
            {/*<div className="reading-container2">*/}
            {/*    <div className="text-group">*/}
            {/*        <h2 className="title2">맞춤형 답변</h2>*/}
            {/*        <p className="description2">*/}
            {/*            당신의 상황과 고민에 맞춘 특별한 리딩을 경험해보세요.<br />*/}
            {/*            AI 타로가 세심하게 준비한 해답으로 마음의 평화를 찾으세요.*/}
            {/*        </p>*/}
            {/*        <button className="start-button">지금 확인하기</button>*/}
            {/*    </div>*/}

            {/*    <div className="image-group2">*/}
            {/*        <img*/}
            {/*            src="https://via.placeholder.com/100"*/}
            {/*            alt="리더 2"*/}
            {/*            className="circle-image"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!* 네 번째 섹션 *!/*/}
            {/*<div className="reading-container">*/}
            {/*    <div className="image-group">*/}
            {/*        <img*/}
            {/*            src="https://via.placeholder.com/100"*/}
            {/*            alt="리더 3"*/}
            {/*            className="circle-image"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="text-group">*/}
            {/*        <h2 className="title">운명의 메시지</h2>*/}
            {/*        <p className="description">*/}
            {/*            타로가 당신에게 전하는 특별한 메시지를 확인하세요.<br />*/}
            {/*            매 순간의 선택에 도움을 드리는 신비로운 가이드입니다.*/}
            {/*        </p>*/}
            {/*        <button className="start-button">메시지 확인하기</button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* 카드 섹션 추가 */}
            <CardSection />
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Content;
