import { message } from 'antd';
import URI from 'urijs';
import { STORAGE_USER_KEY } from '@/configs/constant.config';

// TODO 优化
interface Options {
  readonly showTip?: boolean;
  readonly tipType?: string;
}

let userId: string;

function getUserId() {
  const userInfoStr = localStorage.getItem(STORAGE_USER_KEY);
  if (userInfoStr) {
    return JSON.parse(userInfoStr).userId;
  }
}

userId = getUserId();

export default function request(url: string, options?: any, config = { showTip: false, tipType: 'error' }) {
  const defaultOptions = {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  options = Object.assign({}, defaultOptions, options);

  const data = options.data || options.params || {};

  if (!userId) {
    userId = getUserId();
  }
  data.userId = userId;

  if (options.method.toUpperCase() !== 'GET') {
    options.body = options ? JSON.stringify(data) : '';
  } else {
    const urlObj = new URI(url);
    Object.keys(data).map(key => urlObj.addQuery(key, data[key]));
    url = urlObj.toString();
  }

  return fetch(url, {
      ...options
    })
    .then(res => res.json())
    .then(res => {
      const { success, tip } = res;
      if (success === false) {
        message.error(tip);
        return Promise.reject(res);
      }
      config.showTip === true && message[config.tipType](tip);
      return res;
    });
};
