import { graphql } from "@octokit/graphql";
import type { ContributionCalendar } from "@/types";

/**
 * Fetches ALL GitHub contributions across each calendar year from a minimum start
 * year up to the current year, then combines them into a single calendar.
 * GitHub limits each contributionsCollection query to a 1-year span, so we chunk.
 */
const YEARLY_QUERY = `
  query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
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

const GITHUB_ACCOUNT_START_YEAR = 2023; // earliest reliable data year

export async function fetchGitHubActivity(
  username: string,
  token: string,
): Promise<{ calendar: ContributionCalendar }> {
  const now = new Date();
  const currentYear = now.getFullYear();

  let totalCommits = 0;
  let combinedWeeks: ContributionCalendar["weeks"] = [];

  // Loop from account start year through current year
  for (let year = GITHUB_ACCOUNT_START_YEAR; year <= currentYear; year++) {
    const from = new Date(year, 0, 1).toISOString();
    const to =
      year === currentYear
        ? now.toISOString()
        : new Date(year, 11, 31, 23, 59, 59).toISOString();

    const { user } = await graphql<{
      user: {
        contributionsCollection: {
          totalCommitContributions: number;
          contributionCalendar: ContributionCalendar;
        };
      };
    }>(YEARLY_QUERY, {
      username,
      from,
      to,
      headers: { authorization: `token ${token}` },
    });

    const { totalCommitContributions, contributionCalendar } =
      user.contributionsCollection;

    totalCommits += totalCommitContributions;
    combinedWeeks.push(...contributionCalendar.weeks);
  }

  // Build a unified calendar
  const calendar: ContributionCalendar = {
    totalContributions: totalCommits,
    weeks: combinedWeeks,
  };

  return { calendar };
}
