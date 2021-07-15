import { saveObjects } from '../../datasource/api/AlgoliaApi'
import { HatebuMarkdown } from '../entity/HatebuMarkdown'

/**
 * Algolia へデータを追加します
 * @param markdowns GitHub に push する配列と同じ配列
 */
export const saveHatebuMarkdown = (markdowns: HatebuMarkdown[]): Promise<void> => {
  return saveObjects(markdowns)
}
