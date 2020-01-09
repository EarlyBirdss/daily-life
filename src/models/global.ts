import { getBreadcrumbArr } from '@/utils';
import menuConfig from '@/configs/menu.config';

export default {
  namespace: 'GlobalModel',

  state: {
    breadcrumbConfig: [],
  },

  reducers: {
    setBreadcrumbConfig(state: object, { payload: { breadcrumbConfig } } : { payload: { breadcrumbConfig: Array<string> } }) {
      return {
        ...state,
        breadcrumbConfig,
      };
    }
  },

  effects: {

  },

  subscriptions: {
    setup({ history, dispatch }: { history: { listen: any }, dispatch: any }) {
      history.listen(({ pathname }: { pathname: string }) => {
        const breadcrumbConfig = getBreadcrumbArr(menuConfig, pathname);
        dispatch({
          type: 'setBreadcrumbConfig',
          payload: { breadcrumbConfig }
        })
      });
    },
  }
};