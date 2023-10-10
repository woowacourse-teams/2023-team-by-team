import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';

export const { REACT_APP_BASE_URL: baseUrl } = process.env;

const BASE_URL = baseUrl === undefined ? '' : baseUrl;

const createPostHeaders = (body: unknown) => ({
  headers: {
    'Content-Type':
      body instanceof FormData ? 'multipart/form-data' : 'application/json',
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.ACCESS_TOKEN,
    )}`,
  },
  body: body instanceof FormData ? body : JSON.stringify(body),
});

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

    if (!response.ok) {
      throw response;
    }

    return response.json();
  },

  post: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(BASE_URL + url, {
      method: 'POST',
      ...createPostHeaders(body),
    });

    if (!response.ok) {
      throw response;
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

    if (!response.ok) {
      throw response;
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

    if (!response.ok) {
      throw response;
    }

    return response;
  },
};
