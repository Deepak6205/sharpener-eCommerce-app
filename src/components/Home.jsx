import React from "react";
import "../styles/Home.css";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <header>
        <h1>The Generics</h1>
        <button className="latest-album">Get our Latest Album</button>
        <button className="play-btn">►</button>
      </header>
      <section id="tours" className="container">
  <h2>TOURS</h2>
  <div>
    {[
      { date: "JUL 16", place: "DETROIT, MI", venue: "DTE ENERGY MUSIC THEATRE" },
      { date: "JUL 19", place: "TORONTO, ON", venue: "BUDWEISER STAGE" },
      { date: "JUL 22", place: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
      { date: "JUL 29", place: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
      { date: "AUG 2",  place: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
      { date: "AUG 7",  place: "CONCORD, CA", venue: "CONCORD PAVILION" },
    ].map((tour, index) => (
      <div className="tour-item" key={index}>
        <span className="tour-date">{tour.date}</span>
        <span className="tour-place">{tour.place}</span>
        <span className="tour-spec-place">{tour.venue}</span>
        <button className="buy-btn">BUY TICKETS</button>
      </div>
    ))}
  </div>
</section>

      <Footer/>
    </div>
  );
};

export default Home;
