import React, { useState } from "react";
import Card from "./PortfolioCard";
import axios from "axios";
import "./styles/Portfolio.css";

function Portfolio() {
  const [showInput, setShowInput] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [currentPortfolioData, setPortfolioData] = useState([]);

  const START_DATE = "2021-01-04";
  const END_DATE = "2024-05-01";

  // startDate로부터 1개월 뒤 날짜 계산 함수
  const getDate = (currentDate) => {
    if (!currentDate) return "";
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1); // 한달 후
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  };

  const handleAddPortfolio = async () => {
    const newPortfolio = {
      id: Date.now(),
      startDate,
      endDate,
      comment,
    };
    try {
      // 백엔드로 데이터 전송
      const response = await axios.post(
        "http://localhost:5000/api/update_portfolio",
        newPortfolio
      );

      // 요청 성공 시 portfolio에 새로운 포트폴리오 추가
      setPortfolioData((prev) => [...prev, newPortfolio]);
      setStartDate("");
      setEndDate("");
      setComment("");
      setShowInput(false);
    } catch (error) {
      console.error("포트폴리오 추가 중 오류 발생:", error);
    }
  };

  const handlePortfolio = () => {
    setShowInput(true);
  };

  return (
    <div className="portfolio_container">
      <ul>
        {currentPortfolioData.map((data) => (
          <li key={data.id}>
            <Card data={data} />
          </li>
        ))}
      </ul>
      {!showInput && (
        <button className="outline" onClick={handlePortfolio}>
          포트폴리오 추가하기
        </button>
      )}
      {showInput && (
        <div style={{ marginTop: "10px" }}>
          <div>
            <input
              type="date"
              value={startDate}
              min={START_DATE}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              value={endDate}
              min={startDate || START_DATE}
              max={startDate ? getDate(startDate) : END_DATE}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder=""
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button className="outline" onClick={handleAddPortfolio}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
