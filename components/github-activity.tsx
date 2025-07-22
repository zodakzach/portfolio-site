"use client";

import { useState, useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ContributionCalendar, LanguageStat } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";
import { Flame } from "lucide-react";

interface GitHubActivityProps {
  calendar: ContributionCalendar;
  topLanguages: LanguageStat[];
}

export default function GitHubActivity({
  calendar,
  topLanguages,
}: GitHubActivityProps) {
  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const allDays = useMemo(
    () => calendar.weeks.flatMap((w) => w.contributionDays),
    [calendar],
  );

  const years = useMemo(() => {
    const s = new Set(allDays.map((d) => parseDate(d.date).getFullYear()));
    return Array.from(s).sort((a, b) => b - a);
  }, [allDays]);

  const [year, setYear] = useState<number>(
    years[0] || new Date().getFullYear(),
  );

  const daysForYear = useMemo(
    () => allDays.filter((d) => parseDate(d.date).getFullYear() === year),
    [allDays, year],
  );

  const totalCommits = daysForYear.reduce(
    (sum, d) => sum + d.contributionCount,
    0,
  );

  const { currentStreak, longestStreak, longestStreakStart, longestStreakEnd } =
    useMemo(() => {
      const today = new Date();
      today.setDate(today.getDate() - 1); // Exclude today for streak calculations

      const sorted = daysForYear
        .map((d) => ({ date: parseDate(d.date), count: d.contributionCount }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      let longest = 0,
        run = 0;
      let runStart: Date | null = null,
        bestStart: Date | null = null,
        bestEnd: Date | null = null;

      for (const { date, count } of sorted) {
        if (count > 0) {
          run++;
          runStart = runStart || date;
          if (run > longest) {
            longest = run;
            bestStart = runStart;
            bestEnd = date;
          }
        } else {
          run = 0;
          runStart = null;
        }
      }

      const pastDays = sorted.filter(({ date }) => date <= today);
      let current = 0;
      for (let i = pastDays.length - 1; i >= 0; i--) {
        if (pastDays[i].count > 0) current++;
        else break;
      }

      return {
        currentStreak: current,
        longestStreak: longest,
        longestStreakStart: bestStart,
        longestStreakEnd: bestEnd,
      };
    }, [daysForYear]);

  const progressValue =
    longestStreak > 0
      ? Math.min((currentStreak / longestStreak) * 100, 100)
      : currentStreak > 0
        ? 100
        : 0;

  const excluded = ["Jupyter Notebook", "ASP.NET"];
  const filteredLangs = useMemo(
    () => topLanguages.filter((lang) => !excluded.includes(lang.language)),
    [topLanguages],
  );

  // now slice the top 5 of the filtered list
  const top5 = useMemo(() => filteredLangs.slice(0, 5), [filteredLangs]);
  //  Calculate sum of Top 5 bytes
  const totalBytes = useMemo(
    () => top5.reduce((sum, l) => sum + l.bytes, 0),
    [top5],
  );

  return (
    <section className="container mx-auto px-4 py-16 lg:px-16 lg:py-20">
      {/* Header + Year Selector */}
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

      {/* Stats */}
      <Card className="mb-8 py-0 md:py-8">
        <CardContent className="p-6 text-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Total Commits */}
            <div className="space-y-1">
              <div className="text-2xl font-bold">{totalCommits}</div>
              <div className="text-muted-foreground text-sm">Total Commits</div>
            </div>

            {/* Current Streak */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Flame className="h-5 w-5 text-rose-500" />
                <span className="text-2xl font-bold">{currentStreak} days</span>
              </div>
              <div className="text-muted-foreground text-sm">
                Current Streak
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>

            {/* Longest Streak */}
            <div className="space-y-1">
              <div className="text-2xl font-bold">{longestStreak} days</div>
              <div className="text-muted-foreground text-sm">
                Longest Streak
              </div>
              {longestStreakStart && longestStreakEnd && (
                <div className="text-muted-foreground text-xs">
                  {longestStreakStart.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  –{" "}
                  {longestStreakEnd.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap */}
      <Card className="mb-8 px-2">
        <CardHeader>
          <CardTitle>Contribution Calendar ({year})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[1024px]">
            <CalendarHeatmap
              startDate={new Date(year, 0, 1)}
              endDate={new Date(year, 11, 31)}
              values={daysForYear.map((d) => ({
                date: d.date,
                count: d.contributionCount,
              }))}
              classForValue={(v) => {
                if (!v || v.count === 0) return "fill-background";
                if (v.count < 5) return "fill-primary/30";
                if (v.count < 10) return "fill-primary/60";
                return "fill-primary";
              }}
              showWeekdayLabels
              titleForValue={(v) => {
                if (!v?.date) return "No contributions";
                const date = parseDate(v.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                return `${date}: ${v.count} contribution${v.count === 1 ? "" : "s"}`;
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Languages */}
      <Card className="px-4 py-6">
        <CardHeader>
          <CardTitle>Top 5 Most Used Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {top5.map(({ language, bytes }) => {
            // compute each as a percentage of the Top 5 total
            const pct = totalBytes > 0 ? (bytes / totalBytes) * 100 : 0;
            return (
              <div key={language} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{language}</span>
                  <span>{pct.toFixed(1)}%</span>
                </div>
                <Progress value={Math.round(pct)} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
