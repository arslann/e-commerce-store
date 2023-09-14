import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: null,
    searchText: '',
  },
  sortingOption: 'default',
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Add reducers for filtering
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceRangeFilter: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setSortingOption: (state, action) => {
      state.sortingOption = action.payload;
    },
    setSearchText: (state, action) => {
      state.filters.searchText = action.payload;
    },
    sortProductsByPrice: (state) => {
      // Sort the products array based on the sorting option
      if (state.sortingOption === 'lowToHigh') {
        state.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (state.sortingOption === 'highToLow') {
        state.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },
    applyFilters: (state) => {
      // Filter products based on selected filters
      state.filteredProducts = state.products.filter((product) => {
        const searchMatch =
          state.filters.searchText === ''
            ? product
            : product.title
                .toLowerCase()
                .includes(state.filters.searchText.toLowerCase());

        // Check if the product matches the selected category
        const categoryMatch =
          !state.filters.category || state.filters.category === 'all'
            ? (state.filteredProducts = state.products)
            : product.category === state.filters.category;

        // Check if the product falls within the selected price range
        const priceMatch =
          !state.filters.priceRange ||
          (product.price >= state.filters.priceRange.min &&
            product.price <= state.filters.priceRange.max);

        // Include the product in the filtered list if it matches both category and price filters
        return categoryMatch && priceMatch && searchMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = state.products;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setCategoryFilter,
  setPriceRangeFilter,
  applyFilters,
  setSortingOption,
  sortProductsByPrice,
  setSearchText,
} = productsSlice.actions;
export default productsSlice.reducer;
