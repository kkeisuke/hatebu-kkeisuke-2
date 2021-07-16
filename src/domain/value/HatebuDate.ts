export class HatebuDate {
  private date: Date

  /**
   * はてなブックマーク日
   * @param date ブックマークした日
   */
  constructor(date: Date) {
    this.date = date
  }

  /**
   * 日付を返します
   * @returns yyyy/mm/dd
   */
  toString(): string {
    return this.date.toLocaleDateString('ja', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  /**
   * 日時を返します
   * @returns yyyy/mm/dd hh:mm:ss
   */
  toStringDateTime(): string {
    return this.date.toLocaleString('ja', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }
}
