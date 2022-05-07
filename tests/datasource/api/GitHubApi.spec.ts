import { GitHubApi, GITHUB_API_TOKEN_ERROR } from '../../../src/datasource/api/GitHubApi'
import { getMockMarkdown } from '../../mock/MarkdownMockData'

describe('GitHubApi', () => {
  describe('authenticate', () => {
    it('失敗', () => {
      try {
        new GitHubApi('')
      } catch (error) {
        if (!(error instanceof Error)) {
          return
        }
        expect(error.message).toBe(GITHUB_API_TOKEN_ERROR)
      }
    })

    it('成功', () => {
      const api = new GitHubApi(process.env.GITHUB_API_TOKEN || '')
      expect(api.octokit).toBeTruthy()
    })
  })

  describe('getLatestCommit', () => {
    const api = new GitHubApi(process.env.GITHUB_API_TOKEN || '')

    it('成功', async () => {
      const { latestSha, baseTree } = await api.getLatestCommit()
      expect(latestSha).not.toBe('')
      expect(baseTree).not.toBe('')
    })
  })

  describe('createBlob', () => {
    const date = '2021-06-24'
    const markdowns = getMockMarkdown(date)
    const api = new GitHubApi(process.env.GITHUB_API_TOKEN || '')

    it('成功', async () => {
      const newTree = await api.createBlob(markdowns)
      expect(newTree[0].path).toBe(`${process.env.GITHUB_PATH}/${date}.md`)
      expect(newTree[0].mode).toBe('100644')
      expect(newTree[0].type).toBe('blob')
      expect(newTree[0].sha).not.toBe('')
    })
  })

  describe('createTree', () => {
    const markdowns = getMockMarkdown('2021-06-24')
    const api = new GitHubApi(process.env.GITHUB_API_TOKEN || '')

    it('成功', async () => {
      const { baseTree } = await api.getLatestCommit()
      const newTree = await api.createBlob(markdowns)
      const { tree, trees } = await api.createTree(newTree, baseTree)
      expect(tree).not.toBe('')
      // 「content/posts」以外がない場合、派生元を消している
      expect(trees.length).toBeGreaterThanOrEqual(2)
    })
  })
})
