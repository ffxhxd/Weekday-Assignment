import React from 'react';
import './Styles/Shimmer.css';

function Shimmer() {
  // Create an array to render three shimmer cards
  const shimmerCards = Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="card">
      <div className="shimmerBG media"></div>
      <div className="p-32">
        <div className="shimmerBG title-line"></div>
        <div className="shimmerBG title-line end"></div>
        <div className="shimmerBG content-line m-t-24"></div>
        <div className="shimmerBG content-line"></div>
        <div className="shimmerBG content-line"></div>
        <div className="shimmerBG content-line"></div>
        <div className="shimmerBG content-line end"></div>
      </div>
    </div>
  ));

  return <div className="shimmer-container">{shimmerCards}</div>;
}

export default Shimmer;
