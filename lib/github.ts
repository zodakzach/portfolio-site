// lib/github.ts
import { graphql } from "@octokit/graphql";
import type { ContributionCalendar, LanguageStats } from "@/types";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

if (!GITHUB_TOKEN) throw new Error("Missing GITHUB_TOKEN");
if (!GITHUB_USERNAME) throw new Error("Missing GITHUB_USERNAME");

const YEARLY_QUERY = /* GraphQL */ `
  query ($from: DateTime!, $to: DateTime!) {
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubActivity(): Promise<ContributionCalendar> {
  const now = new Date();
  const currentYear = now.getFullYear();

  let totalContributions = 0;
  let allWeeks: ContributionCalendar["weeks"] = [];

  for (let year = 2023; year <= currentYear; year++) {
    const from = new Date(year, 0, 1).toISOString();
    const to =
      year === currentYear
        ? now.toISOString()
        : new Date(year, 11, 31, 23, 59, 59).toISOString();

    const { user } = await graphql<{
      user: {
        contributionsCollection: {
          contributionCalendar: ContributionCalendar;
        };
      };
    }>(YEARLY_QUERY, {
      from,
      to,
      headers: { authorization: `token ${GITHUB_TOKEN}` },
    });

    const { contributionCalendar } = user.contributionsCollection;
    totalContributions += contributionCalendar.totalContributions;
    allWeeks.push(...contributionCalendar.weeks);
  }

  return { totalContributions, weeks: allWeeks };
}

const LANGUAGES_QUERY = /* GraphQL */ `
  query ($after: String) {
    user(login: "${GITHUB_USERNAME}") {
      repositories(
        first: 100,
        ownerAffiliations: OWNER,
        isFork: false,
        after: $after
      ) {
        pageInfo { hasNextPage endCursor }
        nodes {
          languages(first: 100, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name }
            }
          }
        }
      }
    }
  }
`;

export async function fetchMostUsedLanguages(): Promise<LanguageStats> {
  const totals: Record<string, number> = {};
  let hasNextPage = true;
  let cursor: string | undefined = undefined;

  while (hasNextPage) {
    const resp = await graphql<{
      user: {
        repositories: {
          pageInfo: { hasNextPage: boolean; endCursor: string };
          nodes: Array<{
            languages: {
              edges: Array<{ size: number; node: { name: string } }>;
            };
          }>;
        };
      };
    }>(LANGUAGES_QUERY, {
      after: cursor,
      headers: { authorization: `token ${GITHUB_TOKEN}` },
    });

    const {
      pageInfo: { hasNextPage: next, endCursor },
      nodes,
    } = resp.user.repositories;
    hasNextPage = next;
    cursor = endCursor || undefined;

    for (const repo of nodes) {
      for (const { size, node } of repo.languages.edges) {
        totals[node.name] = (totals[node.name] || 0) + size;
      }
    }
  }

  return Object.entries(totals)
    .map(([language, bytes]) => ({ language, bytes }))
    .sort((a, b) => b.bytes - a.bytes);
}
