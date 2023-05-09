import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PAGE_SIZE = 10;
const URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNews = createAsyncThunk('news/fetchNews', async (params) => {
  const response = await axios.get(URL, { 
    params: {
      ...params,
      pageSize: PAGE_SIZE,
      apiKey: '71abe30d644640ed82b5fd676f82348c'
    },
    credentials: 'omit',
  });
  return response.data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    status: 'initial',
    error: null,
    country: 'in',
    category: '',
    activePage: 1,
    totalResults: null,
  },
  reducers: {
    countryChanged(state, action) {
      state.country = action.payload;
    },
    categoryChanged(state, action) {
      state.category = action.payload;
    },
    pageChanged(state, action) {
      state.activePage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { countryChanged, categoryChanged, pageChanged } = newsSlice.actions;

export default newsSlice.reducer;
