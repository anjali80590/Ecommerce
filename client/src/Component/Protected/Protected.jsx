import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import "./Protected.css";
import Baseurl from "../BaseUrl/BaseUrl";

const Interests = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userInterests, setUserInterests] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const categoryResponse = await axios.get(
          `${Baseurl}/api/category/?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const interestsResponse = await axios.get(
          `${Baseurl}/api/category/get`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(categoryResponse.data.categories);
        setTotalPages(categoryResponse.data.totalPages);

        setUserInterests(new Set(interestsResponse.data));
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [currentPage]);

  const handleInterestChange = async (categoryId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${Baseurl}/api/category/interest`,
        { categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserInterests((prevInterests) => {
        const newInterests = new Set(prevInterests);
        console.log(newInterests);
        if (newInterests.has(categoryId)) {
          newInterests.delete(categoryId);
        } else {
          newInterests.add(categoryId);
        }
        return newInterests;
      });
    } catch (error) {
      setError("Error updating user interests. Please try again later.");
    }
  };
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const maxPageNumbersDisplayed = 7;
  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / maxPageNumbersDisplayed) *
      maxPageNumbersDisplayed;
    return new Array(maxPageNumbersDisplayed)
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <Navigation />
      <div className="interests-container">
        <h2>Please mark your interests!</h2>
        <p>We will keep you notified.</p>
        {error && <p className="error">{error}</p>}
        <div className="saved-interests">
          <p className="saved">My saved interests!</p>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <label className="cont">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={userInterests.has(category._id)}
                      onChange={() => handleInterestChange(category._id)}
                    />
                    <span className="checkbox-custom"></span>
                  </div>
              <div className="custom">    {category.name}</div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {getPaginationGroup().map(
            (number) =>
              number <= totalPages && (
                <button
                  key={number}
                  onClick={() => handlePageClick(number)}
                  className={currentPage === number ? "active" : null}
                >
                  {number}
                </button>
              )
          )}
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interests;
