const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}}`,
  },
};

export const http = {
  get: async <T>(url: RequestInfo | URL): Promise<T> => {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response.json();
  },

  post: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(url, {
      method: 'POST',
      ...options,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  patch: async (url: RequestInfo | URL, body: unknown) => {
    const response = await fetch(url, {
      method: 'PATCH',
      ...options,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },

  delete: async (url: RequestInfo | URL) => {
    const response = await fetch(url, {
      method: 'DELETE',
      ...options,
    });

    if (!response.ok) {
      throw new Error('네트워크 통신 중 에러가 발생했습니다.');
    }

    return response;
  },
};
