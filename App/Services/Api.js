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

  const getActivities = () => api.get('activities?corpid=wxd9ed6139adfa53ce');

  return {
    getActivities,
  }
};

export default {
  create,
};
