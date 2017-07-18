import { request, config } from '../utils';

const { api } = config;
const { winList, banbleDetail } = api;

export async function getWinListDetail(data) {
  return request({
    url: winList,
    method: 'get',
    data,
  });
}

export async function getBalanceDetail() {
  return request({
    url: banbleDetail,
    method: 'get',
  });
}
