export const HATEBU_DATA_STRING = `
TITLE1
COMMENT1
URL1
TITLE2
COMMENT2
URL2
10	20210624135245
20	20210623174628
`

export const MOCK_MARKDOWN = `---
title: 2021-06-24
date: 2021-06-24
description: B! 2
---

#### TITLE
URL<br>
2021/06/24 09:00:00<br>
COMMIT


#### TITLE2
URL2<br>
2021/06/23 09:00:00<br>
COMMIT2


`
export const hatebuData = [
  {
    title: 'TITLE',
    comment: 'COMMIT',
    url: 'URL',
    date: new Date('2021-06-24')
  },
  {
    title: 'TITLE2',
    comment: 'COMMIT2',
    url: 'URL2',
    date: new Date('2021-06-23')
  }
]
