import React, { useState } from "react";
import "../style/QuestionSection.css";
import Header from "./Header";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";

const QuestionSection = () => {
    const [inputValue, setInputValue] = useState("");
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const Navigate = useNavigate();

    const handleSend = () => {
        if (inputValue.trim() !== "") {

            Navigate("/Card", {state : {question : inputValue}});
            setInputValue(""); // 입력 초기화
        }
    };

    return (
        <div>
            <Header />
            <div className="question-container fade-in">
                {/* 제목 섹션 */}
                <h1 className="title fade-in">
                    <span className="highlight fade-in">당신의<br/></span> AI 타로 질문
                </h1>
                <p className="subtitle fade-in">어떤 질문에 대해 점을 치고 싶으신가요?</p>

                {/* 질문 입력창 */}
                <div className="input-container fade-in">
          <textarea
              className={"question-input"}
              placeholder="점을 치고 싶은 질문을 입력하세요"
              required
              maxLength={300}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
          ></textarea>

                    {/* 보내기 버튼 */}
                    <button className={`send-button ${inputValue ? "active" : ""}`} onClick={handleSend}
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}

                    >
                        <i className="fas fa-arrow-up"> </i>
                    </button>

                    {isTooltipVisible && (
                        <div className="tooltip">메시지 보내기</div>
                    )}

                </div>

                <div className="char-counter">{`${inputValue.length}/300`}</div>

                {/* 질문 예시 버튼 */}
                <div className="example-questions fade-in">
                    <div
                        className="question-box"
                        onClick={(e) => setInputValue(e.target.innerText)}
                    >
                        우리 관계에 기회가 있을까요?
                    </div>
                    <div
                        className="question-box "
                        onClick={(e) => setInputValue(e.target.innerText)}
                    >
                        그/그녀가 저에 대해 진정으로 어떻게 생각하나요?
                    </div>
                    <div
                        className="question-box"
                        onClick={(e) => setInputValue(e.target.innerText)}
                    >
                        그(그녀)가 먼저 연락할까요?
                    </div>
                    <div
                        className="question-box"
                        onClick={(e) => setInputValue(e.target.innerText)}
                    >
                        이상적인 직업을 찾을 수 있을까요?
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default QuestionSection;
