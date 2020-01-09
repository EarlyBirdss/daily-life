import fetchMock from 'fetch-mock';

/** 参考文档
 * http://www.wheresrhys.co.uk/fetch-mock/#aboutquickstart
 * params: url, respond, header
 */
fetchMock.mock('/getDairyList', { success: false, data: [], tip: '获取失败' }, {
  delay: 1000,
});
