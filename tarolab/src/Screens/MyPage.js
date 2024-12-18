import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style/myPage.css";
import userImage from "../assets/images/user.jpg";

const MyPage = () => {
    const [records, setRecords] = useState([]); // 점술 기록 목록
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [isLatestFirst, setIsLatestFirst] = useState(true); // 정렬 상태: 최신순 여부
    const [currentPage, setCurrentPage] = useState(1);
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [role, setRole] = useState(""); // 역할 상태
    const recordsPerPage = 10;
    const navigate = useNavigate();

    const baseUrl = "http://localhost:8080";

    // 저장된 점술 기록 가져오기
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(`${baseUrl}/api/tarot/results`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("점술 기록을 가져오지 못했습니다.");
                }

                const data = await response.json();

                // 기본 정렬: 최신순
                const sortedData = [...data].sort(
                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                );
                setRecords(sortedData);
            } catch (error) {
                console.error("기록 조회 오류:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecords();
    }, []);

    // 정렬 변경 함수
    const toggleSortOrder = () => {
        const sortedRecords = [...records].sort((a, b) => {
            if (isLatestFirst) {
                // 오래된순 정렬
                return new Date(a.createdDate) - new Date(b.createdDate);
            } else {
                // 최신순 정렬
                return new Date(b.createdDate) - new Date(a.createdDate);
            }
        });

        setRecords(sortedRecords);
        setIsLatestFirst(!isLatestFirst); // 정렬 상태 반전
    };

    //사용자 정보 가져오기

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("authToken"); // JWT 토큰 가져오기
            console.log("JWT Token from localStorage:", token);

            if (!token) {
                console.log("No token found. Setting default values.");
                setNickname("익명 사용자");
                setRole("(Guest)");
                return;
            }

            try {
                console.log("Fetching user info...");
                const response = await fetch("http://localhost:8080/api/members/role", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더로 전달
                        "Content-Type": "application/json",
                    },
                });

                console.log("API Response Status:", response.status);
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API Response Error:", errorData);
                    throw new Error("사용자 정보를 가져올 수 없습니다.");
                }

                const data = await response.json(); // 닉네임과 역할 데이터
                console.log("Fetched User Data:", data);

                setNickname(data.nickname);
                setRole(data.role);
            } catch (error) {
                setNickname("익명 사용자");
                setRole("");
            }
        };

        fetchUserInfo();
    }, []);

    const deleteRecord = async (recordId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${baseUrl}/api/tarot/delete/results/${recordId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("점술 기록 삭제에 실패했습니다.");
            }

            // 삭제 후, 기록 목록에서 해당 항목을 제거합니다.
            setRecords(records.filter((record) => record.id !== recordId));
        } catch (error) {
            console.error("삭제 오류:", error);
        }
    };

    //현재 페이지 데이터 가져오기
/*
    records: 전체 데이터 목록입니다.
        indexOfLastRecord: 현재 페이지의 마지막 항목 인덱스.
        예: 페이지 2일 때 → 2 * 10 = 20
    indexOfFirstRecord: 현재 페이지의 첫 번째 항목 인덱스.
        예: 페이지 2일 때 → 20 - 10 = 10
    slice: 배열의 일부분을 잘라서 반환합니다.
        예: records.slice(10, 20) → 11번째부터 20번째까지의 항목만 가져옵니다.
  */

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 결과 상세 페이지로 이동
    const handleResultClick = (resultId) => {
        navigate("/result", { state: { resultId } });
    };

    // 회원정보 수정 페이지 이동
    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    if (isLoading) {
        return <p>점술 기록을 불러오는 중입니다...</p>;
    }

    return (
        <div>
            <Header />
            <div className="mypage-container">
                <div className="profile-section">
                    <div className="profile-image">
                        <img src={userImage} alt="User"/>
                        <button className="edit-button" onClick={handleEditProfile}>
                            회원정보 수정
                        </button>
                    </div>
                    <div className="profile-info">
                        닉네임 : <span>{nickname}</span>
                        <br/> {/* 줄바꿈 */}
                        <p>{role}</p>
                    </div>
                </div>


                <div className="records-section">
                    <h2>점술 기록</h2>

                    {/* 정렬 버튼 */}
                    <div className="sort-button">
                        <button onClick={toggleSortOrder}>
                            {isLatestFirst ? "최신순" : "오래된순"}
                        </button>
                    </div>

                    {currentRecords.length > 0 ? (
                        currentRecords.map((record) => (
                            <div
                                key={record.id}
                                className="record-item"
                                onClick={() => handleResultClick(record.id)}
                            >
                                <p>{record.question}</p>
                                <span>
                                    {record.createdDate
                                        ? new Date(record.createdDate).toLocaleString()
                                        : "날짜 정보 없음"}
                                </span>
                                <button className="delete-button" onClick={(e) => {e.stopPropagation();
                                deleteRecord(record.id).then(r => alert("기록 삭제가 완료되었습니다."));
                                }}>🗑️</button>
                            </div>
                        ))
                    ) : (
                        <p>저장된 점술 기록이 없습니다.</p>
                    )}


                    {/* 페이지네이션 버튼 */}
                    <div className="pagination">
                        {[...Array(Math.ceil(records.length / recordsPerPage)).keys()].map( // Math.ceil: 소수점을 올림하여 페이지 수를 구합니다.
                            (number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number + 1)}
                                    className={currentPage === number + 1 ? "active" : ""}
                                >
                                    {number + 1}
                                </button>
                            )
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyPage;
