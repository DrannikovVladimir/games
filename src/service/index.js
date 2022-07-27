import axios from 'axios';

export const token = {
  key: '7fbf598ce4cd4607a7d61ae3b7e46dd8',
};

export const getParams = (token, page, sortByReleased, sortByRating, filteredPlatforms, search) => ({
  ...token,
  page,
  ordering: sortByReleased || sortByRating,
  parent_platforms: filteredPlatforms.length === 0 ? null : filteredPlatforms.join(','),
  search,
});

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 5000,
  withCredentials: false,
});