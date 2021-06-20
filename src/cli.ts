import cac from 'cac'

const cli = cac()

cli.command('date', 'ローカルで Markdown ファイルをビルドします。').action(() => {
  console.log('date')
})

cli.command('push', 'Markdown ファイルを GitHub に push します。').action(() => {
  console.log('push')
})

cli.command('algolia', 'Algolia へ json データを追加します。').action(() => {
  console.log('algolia')
})

cli.parse()