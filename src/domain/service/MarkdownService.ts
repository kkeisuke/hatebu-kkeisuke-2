import { writeFile } from 'fs'
import type { HatebuData } from 'hatebu-mydata-parser'
import { HatebuDate } from '../value/HatebuDate'
import { HatebuDataByDate } from './HatebuService'

export const MD_FILE_PATH = 'tmp'

/**
 * Markdown 文字列を作成します。
 * @param date 日付
 * @param bookmarks はてなブックマークデータ [{ タイトル, url, コメント, 日付 }]
 * @returns Markdown 文字列
 */
export const createMarkdown = (date: string, bookmarks: HatebuData[]): string => {
  const markdown = `---
title: ${date}
date: ${date}
description: B! ${bookmarks.length}
---
`

  // ブックマーク毎
  const bookmarkMarkdowns: string[] = []
  bookmarks.forEach((bookmark) => {
    const comment = bookmark.comment ? `${bookmark.comment}\n` : ''
    const date = new HatebuDate(bookmark.date).toStringDateTime()
    bookmarkMarkdowns.push(`#### ${bookmark.title}
${bookmark.url}<br>
${date}<br>
${comment}

`)
  })

  return markdown + '\n' + bookmarkMarkdowns.join('')
}

/**
 * Markdown ファイルを作成します。
 * @param dataByDate パースされたはてなブックマークデータ
 */
export const createMarkdownFile = (dataByDate: HatebuDataByDate): void => {
  dataByDate.forEach((data, date) => {
    // Markdown 作成
    const markdown = createMarkdown(date, data)
    // .md ファイル作成
    writeFile(`./${MD_FILE_PATH}/${date}.md`, markdown, (error) => {
      if (error) {
        console.error(`${date}.md ファイルが作成できませんでした`)
        console.error(error)
      } else {
        console.log(`${date}.md ファイルを作成しました`)
      }
    })
  })
}
