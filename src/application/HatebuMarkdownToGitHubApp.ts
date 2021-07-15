import { pushHatebuMarkdown } from '../domain/service/GitHubService'
import { getHatebuDailyData } from '../domain/service/HatebuService'
import { createMarkdownsForGitHub } from '../domain/service/MarkdownService'

/**
 * マークダウンファイルを作成し、GitHub のリポジトリへ push します。
 * @param date 日付（指定がない場合は昨日のデータを取得しマークダウンファイルを作成します）
 */
export const pushToGitHub = async (date: string): Promise<void> => {
  const dairyDatas = await getHatebuDailyData(date)
  const markdowns = createMarkdownsForGitHub(dairyDatas)
  await pushHatebuMarkdown(markdowns)
}
