"use client";

import { useState, useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ContributionCalendar, ContributionDay } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function GitHubActivity({
  calendar,
}: {
  calendar: ContributionCalendar;
}) {
  // Helper function to parse date consistently
  const parseDate = (dateString: string) => {
    // GitHub returns dates in YYYY-MM-DD format
    // Parse as local date to avoid timezone shifts
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // flatten weeks → days with proper date parsing
  const allDays: ContributionDay[] = useMemo(
    () => calendar.weeks.flatMap((w) => w.contributionDays),
    [calendar],
  );

  // unique years, sorted desc
  const years = useMemo(() => {
    const s = new Set(allDays.map((d) => parseDate(d.date).getFullYear()));
    return Array.from(s).sort((a, b) => b - a);
  }, [allDays]);

  // selected year state
  const [year, setYear] = useState<number>(
    years[0] || new Date().getFullYear(),
  );

  // days for that year
  const daysForYear = useMemo(
    () => allDays.filter((d) => parseDate(d.date).getFullYear() === year),
    [allDays, year],
  );

  // total commits
  const totalCommits = daysForYear.reduce(
    (sum, d) => sum + d.contributionCount,
    0,
  );

  return (
    <section className="container mx-auto px-4 py-16 lg:px-16 lg:py-20">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">GitHub Activity</h2>
        <Select
          value={String(year)}
          onValueChange={(val) => setYear(Number(val))}
        >
          <SelectTrigger className="border-primary w-[100px] shadow-md">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="border-primary">
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stat Card */}
      <Card className="mb-8 py-0 md:py-8">
        <CardContent className="p-6 text-center">
          <div className="mb-1 text-2xl font-bold">{totalCommits}</div>
          <div className="text-muted-foreground text-sm">
            Total Commits in {year}
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Calendar */}
      <Card className="px-2">
        <CardHeader>
          <CardTitle>Contribution Calendar ({year})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[1024px]">
            <CalendarHeatmap
              startDate={new Date(year, 0, 1)}
              endDate={new Date(year, 11, 31)}
              values={daysForYear.map((d) => ({
                date: d.date, // Keep original string format
                count: d.contributionCount,
              }))}
              classForValue={(value) => {
                if (!value || value.count === 0) return "fill-background";
                if (value.count < 5) return "fill-primary/30";
                if (value.count < 10) return "fill-primary/60";
                return "fill-primary";
              }}
              showWeekdayLabels
              titleForValue={(value) => {
                if (!value || !value.date) return "No contributions";
                // Parse date properly for display
                const date = parseDate(value.date).toLocaleDateString(
                  undefined,
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                );
                const count = value.count;
                return `${date}: ${count} contribution${count === 1 ? "" : "s"}`;
              }}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
