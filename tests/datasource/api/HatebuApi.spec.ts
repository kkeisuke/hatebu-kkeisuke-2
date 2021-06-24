import { HatebuDate } from '../../../src/domain/value/HatebuDate'
import { fetchHatebuData } from '../../../src/datasource/api/HatebuApi'

describe('HatebuApi.spec', () => {
  // タイムアウト時間調整
  // jest.setTimeout(10000)

  it('fetchHatebuData', async () => {
    const yesterday = new HatebuDate(new Date(new Date().setDate(new Date().getDate() - 1))).toString().replace(/\//g, '')
    const hatebuData = await fetchHatebuData(yesterday)
    expect(hatebuData.length).not.toBe(0)
  })
})
