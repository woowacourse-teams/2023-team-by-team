import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

export const { REACT_APP_BASE_URL: baseUrl } = process.env;

const BASE_URL = baseUrl === undefined ? '' : baseUrl;

export const http = {
  get: async <T>(url: RequestInfo | URL): Promise<T> => {
    const response = await fetch(BASE_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
    });

    if (response.status === 401) {
      throw response;
    }

    if (response.status === 403) {
      throw response;
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response.json();
  },

  post: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
      body: JSON.stringify(body),
    });

    if (
      response.status === 401 ||
      response.status === 404 ||
      response.status === 500
    ) {
      throw response;
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  patch: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(BASE_URL + url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401 || response.status === 500) {
      throw response;
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  delete: async (url: RequestInfo | URL) => {
    const response = await fetch(BASE_URL + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
    });

    if (response.status === 401) {
      throw response;
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },
};
