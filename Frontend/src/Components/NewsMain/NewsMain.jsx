import React from "react";
import "./NewsMain.css";

const newsData = [
  {
    id: 1,
    category: "Pest Identification",
    title: "Preventing Rodents in Homes and Businesses",
    description:
      "Learn how to identify rodent activity early and protect your home or business with effective prevention methods.",
    image: "/src/assets/news-1.jpg",
  },
  {
    id: 2,
    category: "Bed Bug Treatment",
    title: "Bed Bug Identification and Treatment Guide",
    description:
      "Discover the common signs of bed bugs and the best ways to eliminate infestations effectively.",
    image: "/src/assets/news-2.jpg",
  },
  {
    id: 3,
    category: "Ant Infestation",
    title: "Effective Mosquito Control for Your Home",
    description:
      "Keep your surroundings safe and comfortable with professional mosquito control and prevention tips.",
    image: "/src/assets/news-3.jpg",
  },
  {
    id: 4,
    category: "Professional Pest Care",
    title: "Why Professional Pest Control Matters",
    description:
      "Understand why professional pest management is essential for maintaining a clean and healthy environment.",
    image: "/src/assets/news-3.jpg",
  },
  {
    id: 5,
    category: "Home Protection",
    title: "Simple Ways to Keep Your Home Pest-Free",
    description:
      "Follow these simple preventive measures to keep unwanted pests away from your living spaces.",
    image: "/src/assets/news-2.jpg",
  },
  {
    id: 6,
    category: "Pest Prevention",
    title: "Seasonal Pest Problems and Their Solutions",
    description:
      "Explore common seasonal pest problems and learn how to protect your property throughout the year.",
    image: "/src/assets/news-1.jpg",
  },
];

const NewsMain = () => {
  return (
    <section className="news-main-section">
      <div className="news-main-container">

        <div className="news-main-heading">
          <span className="news-main-subtitle">LATEST NEWS & ARTICLES</span>
          <h2>Explore Our Latest <span>Insights</span></h2>
          <p>
            Stay informed with expert advice, helpful tips and the latest
            updates from the world of pest management.
          </p>
        </div>

        <div className="news-main-grid">
          {newsData.map((item) => (
            <article className="news-main-card" key={item.id}>

              <div className="news-main-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-main-image"
                />
                <div className="news-main-image-overlay"></div>
                <span className="news-main-image-number">
                  {String(item.id).padStart(2, "0")}
                </span>
              </div>

              <div className="news-main-content">
                <span className="news-main-category">
                  {item.category}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <a href="#" className="news-main-read-more">
                  <span>Read More</span>
                  <span className="news-main-arrow">↗</span>
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsMain;