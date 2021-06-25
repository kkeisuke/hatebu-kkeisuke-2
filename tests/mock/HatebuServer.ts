import nock from 'nock'
import { hatebuDataString } from './HatebuDataString'

export const MOCK_TIMESTAMP = '20210624'

export const setMockServer = (timestamp = ''): void => {
  nock(String(process.env.HATEB_ORIGIN)).get(`${process.env.HATEB_PATH}?timestamp=${timestamp || MOCK_TIMESTAMP}`).reply(200, hatebuDataString)
}
