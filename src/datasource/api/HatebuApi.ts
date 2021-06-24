import https from 'https'

/**
 * はてなブックマークデータを取得します。
 * @param timestamp yyyymmddhhmmss書式での日付を指定。指定以降のブックマークデータを取得します。
 * @returns はてなブックマークデータ
 */
export const fetchHatebuData = (timestamp = ''): Promise<string> => {
  if (!process.env.HATEB_URL) {
    console.error('no HATEB_URL')
    throw new Error('no HATEB_URL')
  }
  const path = `${process.env.HATEB_URL}${timestamp ? `?timestamp=${timestamp}` : ''}`

  console.log(`${path} ダウンロード開始`)

  return new Promise((resolve, reject) => {
    https
      .get(path, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          console.log(`${path} ダウンロード完了`)
          resolve(data)
        })
      })
      .on('error', (err) => {
        console.error(err.message)
        console.log(`${path} ダウンロード失敗`)
        reject(err.message)
      })
  })
}
