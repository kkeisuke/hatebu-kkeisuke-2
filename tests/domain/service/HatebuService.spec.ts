import { HatebuDate } from '../../../src/domain/value/HatebuDate'
import { getHatebuDailyData } from '../../../src/domain/service/HatebuService'

describe('HatebuService.spec', () => {
  // タイムアウト時間調整
  // jest.setTimeout(10000)

  it('fetchHatebuData', async () => {
    const yesterday = new HatebuDate(new Date(new Date().setDate(new Date().getDate() - 1))).toString().replace(/\//g, '-')
    const tomorrow = new HatebuDate(new Date(new Date().setDate(new Date().getDate() + 1))).toString().replace(/\//g, '-')

    const hatebuData = await getHatebuDailyData()
    expect(hatebuData.has(yesterday)).toBe(true)
    expect(hatebuData.has(tomorrow)).toBe(false)
  })
})
