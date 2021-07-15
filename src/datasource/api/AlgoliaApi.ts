import algoliasearch, { SearchClient } from 'algoliasearch'

export const ALGOLIA_APPLICATION_ERROR = 'ALGOLIA_APPLICATION がありません'
export const ALGOLIA_API_KEY_ERROR = 'ALGOLIA_API_KEY がありません'
export const ALGOLIA_INDEX_ERROR = 'ALGOLIA_INDEX がありません'

export class AlgoliaApi {
  private client: SearchClient

  constructor(application: string | undefined, apiKey: string | undefined) {
    if (!application) {
      throw new Error(ALGOLIA_APPLICATION_ERROR)
    }
    if (!apiKey) {
      throw new Error(ALGOLIA_API_KEY_ERROR)
    }
    this.client = algoliasearch(application, apiKey)
  }

  /**
   * Algolia へデータを追加します
   * @param indexName Algolia の index 名
   * @param objects objectID を持つオブジェクトの配列
   */
  async saveObjects(indexName: string | undefined, objects: { objectID: string }[]): Promise<void> {
    if (!indexName) {
      throw new Error(ALGOLIA_INDEX_ERROR)
    }
    const index = this.client.initIndex(indexName)
    const contents = await index.saveObjects(objects)
    console.log(indexName)
    console.log(contents)
  }
}

/**
 * Algolia へデータを追加します
 * @param objects objectID を持つオブジェクトの配列
 */
export const saveObjects = async (objects: { objectID: string }[]): Promise<void> => {
  try {
    const api = new AlgoliaApi(process.env.ALGOLIA_APPLICATION, process.env.ALGOLIA_API_KEY)
    await api.saveObjects(process.env.ALGOLIA_INDEX, objects)
    console.log('Algolia へデータを追加しました')
  } catch (error) {
    console.error(error)
    console.error('Algolia へのデータ追加を失敗しました')

    return Promise.reject(error)
  }
}
