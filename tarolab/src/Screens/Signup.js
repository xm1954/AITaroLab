import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../style/login.css';
import Header from './Header'; // Header 컴포넌트를 import
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";


const Signup = () => {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [nickname, setnickname] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const nevigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);





    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }

        try {

            const requestData ={
                name: name.trim(),
                nickname: nickname.trim(),
                email: email.trim(),
                password: password.trim(),
            }
          const response = await axios.post("http://localhost:8080/api/members/register", requestData);
            alert(response.data.nickname + " 회원가입을 축하드립니다!");
            nevigate('/')

        } catch (error) {
            // 서버 에러 메시지 확인
            const errorMessage = error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
            alert("회원가입에 실패했습니다: " + errorMessage);
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <div className="login-form">
                    <h1 className="login-title">
                        회원가입 <span role="img" aria-label="wave">👋</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {/* 이름 입력 */}
                        <div className="form-group">
                            <label htmlFor="name">이름</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e)=> setname(e.target.value)}
                                    placeholder="이름을 입력해주세요"
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 이메일 입력 */}
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="이메일을 입력해주세요"
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 닉네임 입력 */}
                        <div className="form-group">
                            <label htmlFor="nickname">닉네임</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="nickname"
                                    value={nickname}
                                    onChange={(e) => setnickname(e.target.value)}
                                    placeholder="닉네임을 입력해주세요"
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
                                    value={password}
                                    onChange={(e)=> setpassword(e.target.value)}
                                    placeholder="비밀번호를 입력해주세요"
                                    className="form-input"
                                    required
                                />
                                <span
                                    className="password-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>

                        {/* 비밀번호 확인 입력 */}
                        <div className="form-group">
                            <label htmlFor="confirm-password">비밀번호 확인</label>
                            <div className="input-container">
                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    id="confirm-password"
                                    value ={confirmPassword}
                                    onChange={(e)=>setconfirmPassword(e.target.value)}
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    className="form-input"
                                    required
                                />
                                <span
                                    className="password-icon"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>

                        {/* 회원가입 버튼 */}
                        <button type="submit" className="login-button">회원가입</button>
                    </form>

                    {/* SNS 로그인 버튼 */}
                    <div className="sns-login">
                        <p>다음 계정으로 계속하기:</p>
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
                            <img className = "kakao"
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

export default Signup;
