export type NavItem = {
  label: string;
  href: string;
  target: boolean;
};

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
}

export interface GitHubStats {
  totalCommits: number;
  contributionsThisYear: number;
}
