export class HatebuDate {
  private date: Date

  /**
   * はてなブックマーク日
   * @param date ブックマーク日
   */
  constructor(date: Date) {
    this.date = date
  }

  toString(): string {
    return this.date.toLocaleDateString('ja', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }
}
