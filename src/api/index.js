import axios from "./resouce";
export const get = () => {
  return axios.get('/api/v2/index_show/data/1');
};
export const post = params => {
  return axios.post('/api/v2/index_show/data/1', params);
};

export const index_data = params => {
  return axios.post('/index/data', params);
};
