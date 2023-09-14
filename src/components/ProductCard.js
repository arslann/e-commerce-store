/* eslint-disable @next/next/no-img-element */
import React from 'react';

function ProductCard({ category, description, image, price, title }) {
  return (
    <div className="card w-80 bg-base-100 shadow-xl text-primary flex items-center">
      <figure className="flex-1 ">
        <img src={image} alt={category} className="object-contain max-h-72" />
      </figure>
      <div className="card-body flex-[1] max-h-80 ">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="max-h-24 max-w-[300px] overflow-auto">{description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center w-full pb-4">
        <p>${price}</p>
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
