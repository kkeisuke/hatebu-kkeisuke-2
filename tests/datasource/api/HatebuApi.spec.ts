import { ENV_ERROR_MESSAGE, fetchHatebuData } from '../../../src/datasource/api/HatebuApi'
import { HATEBU_DATA_STRING } from '../../mock/HatebuMockData'
import { MOCK_TIMESTAMP, setMockServer } from '../../mock/HatebuServer'

describe('HatebuApi.spec', () => {
  beforeAll(() => {
    setMockServer()
  })

  it('fetchHatebuData ダウンロード成功', async () => {
    const hatebuData = await fetchHatebuData(MOCK_TIMESTAMP)
    expect(hatebuData).toBe(HATEBU_DATA_STRING)
  })

  it('fetchHatebuData ダウンロード失敗', async () => {
    try {
      await fetchHatebuData('test')
    } catch (error) {
      expect(String(error).includes('Nock: No match for request')).toBe(true)
    }
  })

  it('fetchHatebuData 環境変数不備の例外 HATEB_ORIGIN', async () => {
    try {
      process.env.HATEB_ORIGIN = ''
      await fetchHatebuData(MOCK_TIMESTAMP)
    } catch (error) {
      expect(error).toBe(ENV_ERROR_MESSAGE)
    }
  })

  it('fetchHatebuData 環境変数不備の例外 HATEB_PATH', async () => {
    try {
      process.env.HATEB_PATH = ''
      await fetchHatebuData(MOCK_TIMESTAMP)
    } catch (error) {
      expect(error).toBe(ENV_ERROR_MESSAGE)
    }
  })
})
