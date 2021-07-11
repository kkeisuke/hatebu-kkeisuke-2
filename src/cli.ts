import cac from 'cac'
import { execPush } from './application/HatebuMarkdownToGitHubApp'
import { createHatebuToMarkdown } from './application/HatebuToMarkdownApp'

const cli = cac()

cli.command('date', 'ローカルで Markdown ファイルをビルドします。').action(() => {
  createHatebuToMarkdown(cli.args[0])
})

cli.command('push', 'Markdown ファイルを GitHub に push します。').action(() => {
  execPush(cli.args[0])
})

cli.command('algolia', 'Algolia へ json データを追加します。').action(() => {
  console.log('algolia')
})

cli.parse()
