import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import '../style/UserList.css'

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;

  // JWT 토큰 가져오기
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleNicknameChange = async (id) => {
    const newNickname = prompt("새 닉네임을 입력하세요:");
    if (!newNickname) return;

    try {
      await axios.post(
        `http://localhost:8080/admin/${id}/nickname?nickname=${newNickname}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("닉네임이 변경되었습니다.");
      fetchUsers();
    } catch (error) {
      console.error("Error changing nickname:", error);
    }
  };

  const handleBanUser = async (id) => {
    const days = prompt("정지 기간(일)을 입력하세요:");
    const reason = prompt("정지 사유를 입력하세요:");

    try {
      await axios.post(
        `http://localhost:8080/admin/${id}/ban`,
        { days, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("유저가 정지되었습니다.");
      fetchUsers();
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => (
      <div key={user.id} className="user-card">
        <div>
          <strong>닉네임:</strong> {user.nickname} <br />
          <strong>이메일:</strong> {user.email}
        </div>
        <div>
          <button onClick={() => handleNicknameChange(user.id)}>닉네임 변경</button>
          <button onClick={() => handleBanUser(user.id)}>정지</button>
        </div>
      </div>
    ));

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <h2>관리자 페이지</h2>
      {displayUsers}
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default AdminPage;
