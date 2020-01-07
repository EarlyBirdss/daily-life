import { message } from 'antd';

// TODO 优化
interface Options {
  readonly showTip?: boolean;
  readonly tipType?: string;
}

export default function request(url: string, params: object, options = { showTip: false, tipType: 'error' }) {
  return fetch(url, params)
    .then(res => res.json())
    .then(res => {
      const { success, tip } = res;
      success === false && message.error(tip);
      options.showTip === true && message[options.tipType](tip);
      return res;
    });
};
