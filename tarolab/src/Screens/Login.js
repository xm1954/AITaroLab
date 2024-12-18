import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../style/login.css';
import Header from './Header';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer"; // Header 컴포넌트를 import

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const nevigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:8080/api/members/login",
                {
                    email: email,
                    password: password
                });

            const token = response.data.token;
            const nickname = response.data.nickname;

            localStorage.setItem('authToken', token);
            console.log("Stored Token in localStorage:", localStorage.getItem('authToken')); // 저장된 값 확인

            alert(`${nickname}님 환영합니다. 👏`);
            nevigate('/')

        }catch(error){

            const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다";
            alert("로그인이 실패했습니다." + errorMessage);
        }
    }

    return (
        <div>
            <Header />
            <div className="login-container">
                <div className="login-form">
                    <h1 className="login-title">
                        로그인 <span role="img" aria-label="wave">💖</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {/* 이메일 입력 */}
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="email"
                                    value = {email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="이메일을 입력해주세요"
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <div className="input-container">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    value = {password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    placeholder="비밀번호를 입력해주세요"
                                    className="form-input"
                                />
                                <span
                                    className="password-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>

                        {/* 로그인 정보 저장 */}
                        <div className="form-group checkbox-group">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">로그인 정보 저장</label>
                        </div>

                        {/* 로그인 버튼 */}
                        <button type="submit" className="login-button">로그인</button>
                        <button type="submit" className="login-button">회원가입</button>
                    </form>

                    {/* SNS 로그인 섹션 */}
                    <div className="sns-login">
                        <p>SNS 계정으로 로그인</p>
                        <div className="sns-icons">
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="sns-icon"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                                alt="Instagram"
                                className="sns-icon"
                            />
                            <img className="kakao"
                                 src="/images/kakao_login_medium.png"
                                 alt="Kakao Login"
                            />
                            <img
                                src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
                                alt="Twitter"
                                className="sns-icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
