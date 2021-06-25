import { HatebuDate } from '../../../src/domain/value/HatebuDate'
import { getHatebuDailyData, parseData } from '../../../src/domain/service/HatebuService'
import { hatebuDataString } from '../../mock/HatebuDataString'
import { setMockServer } from '../../mock/HatebuServer'

describe('HatebuService.spec', () => {
  describe('parseData パース成功', () => {
    const hatebuDataByDate = parseData(hatebuDataString)

    it('キーが存在する', () => {
      expect(hatebuDataByDate.has('2021-06-23')).toBe(true)
      expect(hatebuDataByDate.has('2021-06-24')).toBe(true)
    })

    it('キーが存在しない', () => {
      expect(hatebuDataByDate.has('20210623')).toBe(false)
      expect(hatebuDataByDate.has('2021-06-25')).toBe(false)
    })

    it('件数が正しい', () => {
      expect(hatebuDataByDate.size).toBe(2)
    })
  })

  describe('parseData パース失敗', () => {
    it('空文字', () => {
      const hatebuDataByDate = parseData('')
      expect(hatebuDataByDate.size).toBe(0)
    })

    it('フォーマットが異なる', () => {
      const hatebuDataByDate = parseData('test')
      expect(hatebuDataByDate.size).toBe(0)
    })
  })

  describe('fetchHatebuData', () => {
    const yesterday = new HatebuDate(new Date(new Date().setDate(new Date().getDate() - 1))).toString()

    it('データ取得成功', async () => {
      setMockServer(yesterday.replace(/\//g, ''))
      const hatebuData = await getHatebuDailyData()
      expect(hatebuData.has('2021-06-24')).toBe(true)
    })

    it('データ取得失敗', async () => {
      setMockServer('test')
      try {
        await getHatebuDailyData()
      } catch (error) {
        expect(String(error).includes('Nock: No match for request')).toBe(true)
      }
    })
  })
})
