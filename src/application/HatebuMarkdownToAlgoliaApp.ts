import { saveHatebuMarkdown } from '../domain/service/AlgoliaService'
import { getHatebuDailyData } from '../domain/service/HatebuService'
import { createMarkdownsForGitHub } from '../domain/service/MarkdownService'

/**
 * Algolia へデータを追加します
 * @param date 日付（指定がない場合は昨日のデータを取得します）
 */
export const saveToAlgolia = async (date: string): Promise<void> => {
  const dairyDatas = await getHatebuDailyData(date)
  const markdowns = createMarkdownsForGitHub(dairyDatas)
  await saveHatebuMarkdown(markdowns)
}
