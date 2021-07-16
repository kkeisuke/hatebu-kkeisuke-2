import { AlgoliaApi, ALGOLIA_API_KEY_ERROR, ALGOLIA_APPLICATION_ERROR, ALGOLIA_INDEX_ERROR } from '../../../src/datasource/api/AlgoliaApi'

describe('AlgoliaApi', () => {
  describe('constructor', () => {
    it('アプリケーション名が無い', () => {
      try {
        new AlgoliaApi('', process.env.ALGOLIA_API_KEY)
      } catch (error) {
        expect(error.message).toBe(ALGOLIA_APPLICATION_ERROR)
      }
    })
    it('APIキーが無い', () => {
      try {
        new AlgoliaApi(process.env.ALGOLIA_APPLICATION, '')
      } catch (error) {
        expect(error.message).toBe(ALGOLIA_API_KEY_ERROR)
      }
    })
  })
  describe('saveObjects', () => {
    it('インデックス名が無い', async () => {
      try {
        const api = new AlgoliaApi(process.env.ALGOLIA_APPLICATION, process.env.ALGOLIA_API_KEY)
        await api.saveObjects('', [{ objectID: '' }])
      } catch (error) {
        expect(error.message).toBe(ALGOLIA_INDEX_ERROR)
      }
    })
  })
})
