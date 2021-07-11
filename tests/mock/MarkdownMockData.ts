import type { HatebuData } from 'hatebu-mydata-parser'
import { hatebuData } from './HatebuMockData'
import { createMarkdownsForGitHub } from '../../src/domain/service/MarkdownService'
import { HatebuMarkdown } from '../../src/domain/entity/HatebuMarkdown'

export const getMockMarkdown = (date: string): HatebuMarkdown[] => {
  const dataByDate = new Map<string, HatebuData[]>()
  dataByDate.set(date, hatebuData)
  return createMarkdownsForGitHub(dataByDate)
}
