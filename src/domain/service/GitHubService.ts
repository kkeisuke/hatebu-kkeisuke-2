import { push } from '../../datasource/api/GitHubApi'
import { HatebuMarkdown } from '../entity/HatebuMarkdown'

/**
 * マークダウンファイルを GitHub のリポジトリへ push します。
 * @param markdowns マークダウンファイルの配列
 */
export const pushHatebuMarkdown = (markdowns: HatebuMarkdown[]): Promise<void> => {
  return push(markdowns)
}
