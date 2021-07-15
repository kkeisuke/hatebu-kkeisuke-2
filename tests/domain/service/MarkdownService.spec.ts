import fs from 'fs'
import type { HatebuData } from 'hatebu-mydata-parser'
import { HatebuMarkdown } from '../../../src/domain/entity/HatebuMarkdown'
import { createMarkdown, createMarkdownFile, createMarkdownsForGitHub, MD_FILE_PATH } from '../../../src/domain/service/MarkdownService'
import { hatebuData, MOCK_MARKDOWN } from '../../mock/HatebuMockData'

describe('MarkdownService.spec', () => {
  describe('createMarkdown', () => {
    it('markdown 作成', () => {
      const markdown = createMarkdown('2021-06-24', hatebuData)

      expect(markdown).toBe(MOCK_MARKDOWN)
    })
  })

  describe('createMarkdownFile', () => {
    let callback: fs.NoParamCallback
    jest.spyOn(fs, 'writeFile').mockImplementation((_, __, cb) => {
      callback = cb
    })

    const dataByDate = new Map<string, HatebuData[]>()
    const date = '2021-06-24'
    dataByDate.set(date, hatebuData)

    it('markdown を作成してファイルを書き込む', () => {
      createMarkdownFile(dataByDate)

      expect(fs.writeFile).toBeCalledWith(`./${MD_FILE_PATH}/${date}.md`, MOCK_MARKDOWN, callback)
    })

    it('データがない場合', async () => {
      const result = await createMarkdownFile(new Map())
      expect(result.length).toBe(0)
    })
  })

  describe('createMarkdownsForGitHub', () => {
    const dataByDate = new Map<string, HatebuData[]>()
    const date = '2021-06-24'
    dataByDate.set(date, hatebuData)

    it('GitHub 用の markdown 配列を作成する', () => {
      const markdowns = createMarkdownsForGitHub(dataByDate)

      expect(markdowns).toStrictEqual([
        {
          objectID: date,
          path: `${process.env.GITHUB_PATH}/${date}.md`,
          content: MOCK_MARKDOWN
        } as HatebuMarkdown
      ])
    })
  })
})
