import { LOCAL_STORAGE_KEY } from '~/constants/localStorage';
import { PATH_NAME } from '~/constants/routes';

export const http = {
  get: async <T>(url: RequestInfo | URL): Promise<T> => {
    const response = await fetch(url, {
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

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response.json();
  },

  post: async (url: RequestInfo | URL, body: unknown, reissue?: boolean) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (reissue) {
      headers['Authorization-Refresh'] = `Bearer ${localStorage.getItem(
        LOCAL_STORAGE_KEY.REFRESH_TOKEN,
      )}`;
    } else {
      headers['Authorization'] = `Bearer ${localStorage.getItem(
        LOCAL_STORAGE_KEY.ACCESS_TOKEN,
      )}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (response.status === 401 || response.status === 404) {
      throw response;
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  patch: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        )}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      throw response;
    }

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  delete: async (url: RequestInfo | URL) => {
    const response = await fetch(url, {
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
