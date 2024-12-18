import React from "react";
import '../style/footer.css';

const Footer = () => {
    return (
        <footer className="footer-con">
            <div className="footer-content2">
                {/* 왼쪽 섹션 */}
                <div className="footer-section">
                    <h3 className="footer-title">TaroLab</h3>
                    <p className="footer-description">
                        TaroLab: 정확한 AI 타로 리딩 | 무료 온라인 예측
                    </p>
                </div>

                {/* 가운데 섹션 */}
                <div className="footer-section">
                    <h3 className="footer-title">사이트맵</h3>
                    <ul className="footer-links">
                        <li>홈</li>
                        <li>타로 리딩</li>
                        <li>타로 일일운세</li>
                        <li>예/아니오 타로</li>
                        <li>카드 의미</li>
                        <li>카드 스프레드</li>
                        <li>블로그</li>
                        <li>전문 타로 카드 리더</li>
                        <li>문제 피드백</li>
                    </ul>
                </div>

                {/* 오른쪽 섹션 */}
                <div className="footer-section">
                    <h3 className="footer-title">문의하기</h3>
                    <p className="footer-contact">xm1954@naver.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
