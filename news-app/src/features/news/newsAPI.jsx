import { fetchNews } from './newsSlice';

export const getNews = ({ country, category, page }) => {
  return fetchNews({ country, category, page });
};