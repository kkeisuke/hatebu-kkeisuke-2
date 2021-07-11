import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { HatebuMarkdown } from '../../domain/entity/HatebuMarkdown'

type Tree = RestEndpointMethodTypes['git']['createTree']['parameters']['tree']
type ResTrees = RestEndpointMethodTypes['git']['createTree']['response']['data']['tree']

const owner = process.env.GITHUB_OWNER || ''
const repo = process.env.GITHUB_REPO || ''
const ref = process.env.GITHUB_REF || ''
const message = process.env.COMMIT_MSG || ''

export const GITHUB_API_TOKEN_ERROR = 'GITHUB_API_TOKEN がありません'

export class GitHubApi {
  octokit: Octokit

  /**
   * コンストラクタ
   * @param token APIトークン
   */
  constructor(token: string) {
    this.octokit = this.authenticate(token)
  }

  /**
   * APIトークンをセットします。
   * @param token APIトークン
   * @returns Octokit instance
   */
  private authenticate(token: string): Octokit {
    if (!token) {
      throw new Error(GITHUB_API_TOKEN_ERROR)
    }
    return new Octokit({ auth: token })
  }

  /**
   * 派生元の SHA1 と tree の SHA1 を取得します。
   * @returns 派生元の SHA1 と tree の SHA1
   */
  async getLatestCommit(): Promise<{ latestSha: string; baseTree: string }> {
    const latestRef = await this.octokit.git.getRef({ owner, repo, ref })
    const commit_sha = latestRef.data.object.sha
    console.log('commit_sha', commit_sha)

    // Get the current commit object
    // Retrieve the tree it points to
    const latestCommit = await this.octokit.git.getCommit({ owner, repo, commit_sha })
    const latestSha = latestCommit.data.sha
    const baseTree = latestCommit.data.tree.sha
    console.log('latestSha', latestSha)
    console.log('baseTree', baseTree)

    return {
      latestSha: latestCommit.data.sha,
      baseTree
    }
  }

  /**
   * Blob を作成します。
   * @param markdowns マークダウンファイルの配列
   * @returns 新しい tree
   */
  async createBlob(markdowns: HatebuMarkdown[]): Promise<Tree> {
    const newTree: Tree = []
    for (const md of markdowns) {
      const content = Buffer.from(md.content).toString()
      const blob = await this.octokit.git.createBlob({ owner, repo, content })
      console.log('Blob SHA1', blob.data.sha)
      newTree.push({
        path: md.path,
        mode: '100644',
        type: 'blob',
        sha: blob.data.sha
      })
    }
    return newTree
  }

  /**
   * tree を作成します。
   * @param tree tree の配列（Objects (of path, mode, type, and sha) specifying a tree structure）
   * @param baseTree 派生元の tree の SHA1
   * @returns tree SHA1, 派生元を含めた Tree (テストで使用します。)
   */
  async createTree(tree: Tree, baseTree: string): Promise<{ tree: string; trees: ResTrees }> {
    const { data } = await this.octokit.rest.git.createTree({ owner, repo, tree, base_tree: baseTree })
    console.log('tree', data.sha)

    return {
      tree: data.sha,
      trees: data.tree
    }
  }

  /**
   * 新しいコミットを作成します。
   * @param latestSha 派生元
   * @param tree 作成した tree
   */
  async createCommit(latestSha: string, tree: string): Promise<void> {
    const parents = [latestSha]
    const newCommit = await this.octokit.git.createCommit({ owner, repo, message, tree, parents })
    const sha = newCommit.data.sha
    console.log('SHA1', sha)

    // Update the reference of your branch to point to the new commit SHA
    const { data } = await this.octokit.git.updateRef({ owner, repo, ref, sha })
    console.log('SHA1', data.object.sha)
  }
}

/**
 * マークダウンファイルを GitHub のリポジトリへ push します。
 * @param markdowns マークダウンファイルの配列
 */
export const push = async (markdowns: HatebuMarkdown[]): Promise<void> => {
  try {
    const api = new GitHubApi(process.env.GITHUB_API_TOKEN || '')
    const { latestSha, baseTree } = await api.getLatestCommit()

    // Retrieve the content of the blob object that tree has for that particular file path
    // Change the content somehow and post a new blob object with that new content, getting a blob SHA back
    const newTree = await api.createBlob(markdowns)

    // Post a new tree object with that file path pointer replaced with your new blob SHA getting a tree SHA back
    const { tree } = await api.createTree(newTree, baseTree)

    // Create a new commit object with the current commit SHA as the parent and the new tree SHA, getting a commit SHA back
    api.createCommit(latestSha, tree)

    console.log('push 成功しました。')
  } catch (error) {
    console.error(error)
    console.log('push 失敗しました。')

    return Promise.reject(error)
  }
}
