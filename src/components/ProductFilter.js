'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryFilter,
  setPriceRangeFilter,
  applyFilters,
  setSortingOption,
  sortProductsByPrice,
  setSearchText,
} from '../store/productsSlice';

function ProductFilter() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const sortingOption = useSelector((state) => state.products.sortingOption);

  const categories = [...new Set(products.map((product) => product.category))];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(sortProductsByPrice());
  }, [dispatch, sortingOption]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    dispatch(setCategoryFilter(category));
    dispatch(applyFilters());
  };

  // Handle price range selection
  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
    dispatch(setPriceRangeFilter({ min, max }));
    dispatch(applyFilters());
  };

  // Handle sorting option selection
  const handleSortOptionChange = (option) => {
    dispatch(setSortingOption(option));
  };

  // Handle search query input
  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    dispatch(setSearchText(query));
    dispatch(applyFilters());
  };

  return (
    <div className="flex flex-col items-start justify-center sm:flex-row gap-6 mb-10 text-primary w-full px-2">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-2 items-center">
          <h3>Category</h3>
          <select
            value={selectedCategory || 'all'}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3>Price Range</h3>
          <input
            type="range"
            min={0}
            max={1000}
            className="range"
            value={priceRange.min}
            onChange={(e) =>
              handlePriceRangeChange(e.target.value, priceRange.max)
            }
          />
          <input
            type="range"
            min={0}
            max={1000}
            className="range"
            value={priceRange.max}
            onChange={(e) =>
              handlePriceRangeChange(priceRange.min, e.target.value)
            }
          />
          <span>
            ${priceRange.min} - ${priceRange.max}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-6 justify-start items-start">
        <div className="flex flex-col gap-2 items-center">
          <h3>Sort By Price</h3>
          <select
            id="sortSelect"
            onChange={(e) => handleSortOptionChange(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="default" defaultValue>
              Default
            </option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
