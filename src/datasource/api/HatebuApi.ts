import https from 'https'

export const ENV_ERROR_MESSAGE = 'no HATEB_ORIGIN or HATEB_PATH'

/**
 * はてなブックマークデータを取得します。
 * @param timestamp yyyymmddhhmmss書式での日付を指定。指定以降のブックマークデータを取得します。
 * @returns はてなブックマークデータ
 */
export const fetchHatebuData = (timestamp = ''): Promise<string> => {
  if (!process.env.HATEB_ORIGIN || !process.env.HATEB_PATH) {
    console.error(ENV_ERROR_MESSAGE)
    return Promise.reject(ENV_ERROR_MESSAGE)
  }
  const path = `${process.env.HATEB_ORIGIN}${process.env.HATEB_PATH}${timestamp ? `?timestamp=${timestamp}` : ''}`

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
