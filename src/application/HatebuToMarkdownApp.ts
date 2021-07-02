import { getHatebuDailyData } from '../domain/service/HatebuService'
import { createMarkdownFile } from '../domain/service/MarkdownService'

/**
 * マークダウンファイル作成
 * @param date date 日付（指定がない場合は昨日のデータを取得しマークダウンファイルを作成します）
 */
export const createHatebuToMarkdown = async (date: string): Promise<void> => {
  const dairyDatas = await getHatebuDailyData(date)
  createMarkdownFile(dairyDatas)
}
