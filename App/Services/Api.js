// @flow

import apisauce from 'apisauce';

const create = (baseURL: string = 'https://api.weinnovators.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000,
  });

  // 我们可以把所有公开接口放在这里
  const getActivities = () => api.get('activities?corpid=wxd9ed6139adfa53ce');
  const getNewses = () => api.get('news');

  return {
    getActivities,
    getNewses,
  }
};

export default {
  create,
};
