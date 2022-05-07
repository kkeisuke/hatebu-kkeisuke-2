import { writeFile } from 'fs'
import type { HatebuData } from 'hatebu-mydata-parser'
import { HatebuDataByDate } from '../entity/HatebuData'
import { HatebuMarkdown } from '../entity/HatebuMarkdown'
import { HatebuDate } from '../value/HatebuDate'

export const MD_FILE_PATH = 'tmp'

/**
 * Markdown 文字列を作成します。
 * @param date 日付
 * @param bookmarks はてなブックマークデータ [{ タイトル, url, コメント, 日付 }]
 * @returns Markdown 文字列
 */
export const createMarkdown = (date: string, bookmarks: HatebuData[]): string => {
  const header = `---
title: ${date}
date: ${date}
description: B! ${bookmarks.length}
---
`

  // ブックマーク毎
  const body: string[] = []
  bookmarks.forEach((bookmark) => {
    const comment = bookmark.comment ? `${bookmark.comment}\n` : ''
    const date = new HatebuDate(bookmark.date).toStringDateTime()
    body.push(`#### ${bookmark.title.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}
${bookmark.url}<br>
${date}<br>
${comment}

`)
  })

  return header + '\n' + body.join('')
}

/**
 * Markdown ファイルを作成します。
 * @param dataByDate パースされたはてなブックマークデータ
 */
export const createMarkdownFile = (dataByDate: HatebuDataByDate): Promise<void[]> => {
  const promises: Promise<void>[] = []
  dataByDate.forEach((data, date) => {
    // Markdown 作成
    const markdown = createMarkdown(date, data)
    promises.push(
      new Promise((resolve, reject) => {
        // .md ファイル作成
        writeFile(`./${MD_FILE_PATH}/${date}.md`, markdown, (error) => {
          if (error) {
            console.error(`${date}.md ファイルが作成できませんでした`)
            console.error(error)
            reject()
          } else {
            console.log(`${date}.md ファイルを作成しました`)
            resolve()
          }
        })
      })
    )
  })
  return Promise.all(promises)
}

/**
 * GitHub用にマークダウンデータを作成します。
 * @param dataByDate パースされたはてなブックマークデータ
 * @returns GitHub に push する配列
 */
export const createMarkdownsForGitHub = (dataByDate: HatebuDataByDate): HatebuMarkdown[] => {
  const markdowns: HatebuMarkdown[] = []

  // 日毎
  dataByDate.forEach((data, date) => {
    // Markdown 作成
    markdowns.push({
      objectID: date,
      path: `${process.env.GITHUB_PATH}/${date}.md`,
      content: createMarkdown(date, data)
    })
    console.log(`${date}.md を作成しました`)
  })

  return markdowns
}
