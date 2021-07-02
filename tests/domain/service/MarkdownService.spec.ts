import fs from 'fs'
import type { HatebuData } from 'hatebu-mydata-parser'
import { createMarkdown, createMarkdownFile, MD_FILE_PATH } from '../../../src/domain/service/MarkdownService'
import { MOCK_MARKDOWN } from '../../mock/HatebuMockData'

describe('MarkdownService.spec', () => {
  const bookmarks: HatebuData[] = [
    {
      title: 'TITLE',
      comment: 'COMMIT',
      url: 'URL',
      date: new Date('2021-06-24')
    },
    {
      title: 'TITLE2',
      comment: 'COMMIT2',
      url: 'URL2',
      date: new Date('2021-06-23')
    }
  ]

  describe('createMarkdown', () => {
    it('マークダウン作成', () => {
      const markdown = createMarkdown('2021-06-24', bookmarks)

      expect(markdown).toBe(MOCK_MARKDOWN)
    })
  })
  describe('createMarkdownFile', () => {
    let callback: fs.NoParamCallback
    jest.spyOn(fs, 'writeFile').mockImplementation((_, __, cb) => {
      callback = cb
    })

    it('マークダウンを作成してファイルを書き込む', () => {
      const dataByDate = new Map<string, HatebuData[]>()
      const date = '2021-06-24'
      dataByDate.set(date, bookmarks)
      createMarkdownFile(dataByDate)

      expect(fs.writeFile).toBeCalledWith(`./${MD_FILE_PATH}/${date}.md`, MOCK_MARKDOWN, callback)
    })
  })
})
