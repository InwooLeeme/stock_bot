import "./styles/Login.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log(formData);

      const res = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        { withCredentials: true }
      );
      if (res.data.message === "로그인 성공!") {
        navigate("/chart");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("로그인 중 오류가 발생");
      }
    }
  };
  return (
    <div className="loginForm_container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>계정이름</label>
          <input
            type="text"
            name="text"
            placeholder="아이디"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;