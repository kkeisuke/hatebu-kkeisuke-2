import cac from 'cac'
import { saveToAlgolia } from './application/HatebuMarkdownToAlgoliaApp'
import { pushToGitHub } from './application/HatebuMarkdownToGitHubApp'
import { createHatebuToMarkdown } from './application/HatebuToMarkdownApp'

const cli = cac()

cli.command('date', 'ローカルで Markdown ファイルをビルドします。').action(async () => {
  try {
    await createHatebuToMarkdown(cli.args[0])
  } catch (error) {
    process.exit(1)
  }
})

cli.command('push', 'Markdown ファイルを GitHub に push します。').action(async () => {
  try {
    await pushToGitHub(cli.args[0])
  } catch (error) {
    process.exit(1)
  }
})

cli.command('algolia', 'Algolia へ json データを追加します。').action(async () => {
  try {
    await saveToAlgolia(cli.args[0])
  } catch (error) {
    process.exit(1)
  }
})

cli.help()

cli.parse()
