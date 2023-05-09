import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, ConfigProvider } from "antd";
import { countries } from "./constants/countryList";
import { categories } from "./constants/categories";
import { getNews } from "./features/news/newsAPI";
import Footer from "./components/footer/Footer";
import {
  countryChanged,
  categoryChanged,
  pageChanged,
} from "./features/news/newsSlice";

import News from "./features/news/News";
import "./App.css";

const { Option } = Select;

const App = () => {
  const dispatch = useDispatch();
  const { status,country, category, activePage } =
    useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews({ country, category, page: activePage }));
  }, [dispatch, country, category, activePage]);

  const handleCountryChange = (country) => {
    dispatch(countryChanged(country));
    dispatch(getNews({ country, category, page: 1 }));
  };

  const handleCategoryChange = (category) => {
    dispatch(categoryChanged(category));
    dispatch(getNews({ country, category, page: 1 }));
  };

  const handlePageChange = (page) => {
    dispatch(pageChanged(page));
    dispatch(getNews({ country, category, page }));
  };

  console.log(process.env.REACT_APP_NEWS_API_KEY)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FA8C16",
          colorPrimaryBg: "#e6f7ff",
        },
      }}
    >
      <div className="container">
        <div className="header">
          <div>
            <h1>Headlines Today</h1>
          </div>
          <div className="activity">
            <Select placeholder="Category" style={{width:'30vw'}} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <Option key={category.value} value={category.value}>
                  {category.text}
                </Option>
              ))}
            </Select>
            <Select
              style={{width:'30vw'}}
              placeholder="Country"
              value={country}
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <Option key={country.value} value={country.value}>
                  {country.text}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {status !== "error" ? (
          <div className="content">
            <News handlePageChange={handlePageChange} />
          </div>
        ) : (
          <div className="error">
            <h1>
              <br />
              No News Available as some error has occured !!
            </h1>
          </div>
        )}
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default App;
