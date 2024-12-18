import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../style/UserList.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/members/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("회원 목록을 불러오는 중 에러가 발생했습니다.");
    }
  };

  const handleNicknameChange = async (id) => {
    const newNickname = prompt("새 닉네임을 입력하세요:");
    if (!newNickname) return;

    try {
      await axios.patch(
          `http://localhost:8080/api/members/${id}/nickname`,
          { nickname: newNickname },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("닉네임이 변경되었습니다.");
      fetchUsers();
    } catch (error) {
      console.error("Error changing nickname:", error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  const handleBanUser = async (id) => {
    const daysInput = prompt("정지 기간(일)을 입력하세요:");
    const reason = prompt("정지 사유를 입력하세요:");

    const days = parseInt(daysInput, 10);
    if (isNaN(days) || !reason) {
      alert("정지 기간은 숫자로 입력하고 사유를 반드시 입력하세요.");
      return;
    }

    try {
      await axios.post(
          `http://localhost:8080/api/members/${id}/ban`,
          { days, reason },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("유저가 정지되었습니다.");
      fetchUsers();
    } catch (error) {
      console.error("Error banning user:", error);
      alert("유저 정지에 실패했습니다.");
    }
  };

  const handleUnbanUser = async (id) => {
    try {
      await axios.patch(
          `http://localhost:8080/api/members/${id}/unban`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("유저 정지가 해제되었습니다.");
      fetchUsers();
    } catch (error) {
      console.error("Error unbanning user:", error);
      alert("정지 해제에 실패했습니다.");
    }
  };

  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => (
      <div key={user.id} className="user-box">
        <div className="user-info">
          <span className="user-nickname">{user.nickname}</span>
          <p>
            상태:{" "}
            {user.banEndDate && new Date(user.banEndDate) > new Date() ? (
                <span style={{ color: "red" }}>
              정지 중 (해제일: {new Date(user.banEndDate).toLocaleDateString()})
            </span>
            ) : (
                <span style={{ color: "green" }}>활성</span>
            )}
          </p>
          <span className="user-date">
          계정 생성: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
        </span>
        </div>
        <div className="user-actions">
          <button onClick={() => handleNicknameChange(user.id)}>닉네임 변경</button>
          <button className="ban-button" onClick={() => handleBanUser(user.id)}>
            정지
          </button>
          <button className="unban-button" onClick={() => handleUnbanUser(user.id)}>
            정지 해제
          </button>
        </div>
      </div>
  ));

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
      <div className="admin-container">
        <h2 className="title">유저 목록</h2>
        {users.length > 0 ? displayUsers : <p>유저 목록이 없습니다.</p>}
        {pageCount > 1 && (
            <ReactPaginate
                previousLabel={"이전"}
                nextLabel={"다음"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        )}
      </div>
  );
};

export default AdminPage;
