import React from "react";
import { Layout } from "../../components/Layout";
import "./News.css";
import { NewsCard } from "../../components/NewsCard";
import { useFetchData } from "../../hooks/useFetchData";
import { NavigationBar } from "../../components/NavigationBar";
import { CircularProgress } from "@mui/material";
import newsBanner from "../../assets/img/newsbanner.jpg";

export const News = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/news`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const news =
    data && data.news
      ? data.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [];

  return (
    <Layout>
      {/* News Hero  */}
      <div className="newsbanner flex items-center justify-center relative">
        {/* Lazy-loaded Background Image */}
        <img
          src={newsBanner}
          alt="News Banner"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="grid sm:grid-cols-12 relative z-10">
          <div className="col-span-12 text-center mt-10 lg:mt-20">
            <h1 className="font-sans font-bold text-white text-3xl lg:text-4xl">
              Latest News
            </h1>
          </div>
        </div>
      </div>

      <NavigationBar />

      {/* Latest News  */}
      <div className="my-5">
         <h1 className="font-roboto text-2xl font-bold lg:font-medium text-center text-[#1d2a3b]  py-3 lg:py-8">
          Latest News
        </h1> 

        <div className="grid sm:grid-cols-12 my-3 lg:my-5 max-w-[1280px] mx-auto">
          {loading && (
            <div className="col-span-12 flex justify-center">
              <CircularProgress size="30px" />
            </div>
          )}
          {error && <p>{error}</p>}
          {news?.map((item) => {
            return (
              <div
                key={item._id}
                className="col-span-12 md:col-span-6 lg:col-span-3 m-3"
              >
                <a href={item.url} target="_blank">
                  <NewsCard item={item} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
