/**
 * This represents a user as returned by the GitHub API.
 * Note that we are only mapping the fields we care about. There are many more.
 */
export interface GitHubUser {
  avatar_url: string;
  login: string;
  id: string;
  html_url: string;
}
