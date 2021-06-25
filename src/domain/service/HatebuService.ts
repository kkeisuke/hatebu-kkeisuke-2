import { HatebuData, parse } from 'hatebu-mydata-parser'
import { fetchHatebuData } from '../../datasource/api/HatebuApi'
import { HatebuDate } from '../value/HatebuDate'

export type HatebuDataByDate = Map<string, HatebuData[]>

/**
 * parser でパース後に日毎データに整形
 * @param hatebuData はてなブックマークデータ
 * @returns パースされたはてなブックマークデータ
 */
export const parseData = (hatebuData: string): HatebuDataByDate => {
  const parsedDatas = parse(hatebuData)
  const dataByDate: HatebuDataByDate = new Map()

  parsedDatas.forEach((hatebuData) => {
    const date = new HatebuDate(hatebuData.date).toString().replace(/\//g, '-')
    if (dataByDate.has(date)) {
      dataByDate.get(date)?.push(hatebuData)
    } else {
      dataByDate.set(date, [hatebuData])
    }
  })

  if (dataByDate.size) {
    console.log(`${dataByDate.size}件のデータをパースしました。`)
  } else {
    console.error('はてなブックマークデータをパースできませんでした。')
  }

  return dataByDate
}

/**
 * はてなブックマークデータを取得します。
 * @param date 日付（指定がない場合は昨日のデータを取得します）
 * @returns パースされたはてなブックマークデータ
 */
export const getHatebuDailyData = async (date = ''): Promise<HatebuDataByDate> => {
  const yesterday = new HatebuDate(new Date(new Date().setDate(new Date().getDate() - 1))).toString().replace(/\//g, '')
  const hatebuData = await fetchHatebuData(date || yesterday)

  return parseData(hatebuData)
}
