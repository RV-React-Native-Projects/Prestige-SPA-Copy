import Qs from "qs";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestOptions {
  params?: Record<string, any>;
}

interface HttpResponse {
  data: any;
}

interface HttpError {
  data: any;
}

function shouldNotIncludeCredentials(url: string): boolean {
  return (
    url.indexOf("search-staging") >= 0 ||
    url.indexOf("staging-websites") >= 0 ||
    url.indexOf("search-search-prod") >= 0
  );
}

function get(
  url: string,
  params?: RequestOptions,
  headers?: Record<string, string>,
  body: AxiosRequestConfig = {},
): Promise<HttpResponse> {
  const isStaging = shouldNotIncludeCredentials(url);

  if (params && params.params) {
    url = url + "?" + Qs.stringify(params.params);
  }

  return new Promise((success, failure) => {
    axios({
      url: url,
      params: params && params.params,
      responseType: "json",
      withCredentials: isStaging ? false : true,
      headers: { "Content-Type": "application/json", ...headers },
      ...body,
    })
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data });
        } else {
          failure({ data: response.data });
        }
      })
      .catch(error => {
        failure({ data: error });
      });
  });
}

function deleteRequest(
  url: string,
  headers?: Record<string, string>,
  body: AxiosRequestConfig = {},
): Promise<HttpResponse> {
  const isStaging = shouldNotIncludeCredentials(url);

  return new Promise((success, failure) => {
    axios
      .delete(url, {
        withCredentials: isStaging ? false : true,
        headers: { "Content-Type": "application/json", ...headers },
        ...body,
      })
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data });
        } else {
          failure({ data: response.data });
        }
      })
      .catch(error => {
        failure({ data: error });
      });
  });
}

function post(
  url: string,
  data: any,
  headers?: Record<string, string>,
  body: AxiosRequestConfig = {},
): Promise<HttpResponse> {
  const isStaging = shouldNotIncludeCredentials(url);

  return new Promise((success, failure) => {
    axios
      .post(url, data, {
        responseType: "json",
        withCredentials: isStaging ? false : true,
        headers: { "Content-Type": "application/json", ...headers },
        ...body,
      })
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data ?? response });
        } else {
          failure({ data: response.data ?? response });
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          failure({ data: error.response.data });
        } else {
          failure({ data: error });
        }
      });
  });
}

function put(
  url: string,
  params: RequestOptions,
  headers?: Record<string, string>,
  body: AxiosRequestConfig = {},
): Promise<HttpResponse> {
  const isStaging = shouldNotIncludeCredentials(url);

  return new Promise((success, failure) => {
    axios
      .put(url, JSON.stringify(params), {
        withCredentials: isStaging ? false : true,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...body,
      })
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data });
        } else {
          failure({ data: response.data });
        }
      })
      .catch(error => {
        failure({ data: error });
      });
  });
}

const defaults: Record<string, any> = {};

export default {
  get,
  post,
  put,
  delete: deleteRequest,
  defaults,
};
