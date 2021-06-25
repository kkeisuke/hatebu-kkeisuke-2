import nock from 'nock'
import { HATEBU_DATA_STRING } from './HatebuMockData'

export const MOCK_TIMESTAMP = '20210624'

export const setMockServer = (timestamp = ''): void => {
  nock(String(process.env.HATEB_ORIGIN))
    .get(`${process.env.HATEB_PATH}?timestamp=${timestamp || MOCK_TIMESTAMP}`)
    .reply(200, HATEBU_DATA_STRING)
}
