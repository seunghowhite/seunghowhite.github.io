"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTH_LABELS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

export interface BigThreeDataPoint {
  monthLabel: string;
  benchPress: number | null;
  deadlift: number | null;
  squat: number | null;
}

/** 월별 1개 값. 1~12월 순서 (kg). 없는 월은 null */
export type MonthlyData = (number | null)[];

interface BigThreeChartProps {
  /** 1~12월, 월 첫날 기준 밴치프레스(kg). 없는 월은 null */
  monthlyBenchPress: MonthlyData;
  /** 1~12월, 월 첫날 기준 데드리프트(kg). 없는 월은 null */
  monthlyDeadlift: MonthlyData;
  /** 1~12월, 월 첫날 기준 스쿼트(kg). 없는 월은 null */
  monthlySquat: MonthlyData;
}

const SERIES_ORDER: Record<string, number> = { 밴치프레스: 0, 데드리프트: 1, 스쿼트: 2 };

// WeightChart와 겹치지 않게: 몸무게=초록(#22c55e), 근육량=빨강(#ef4444), 체지방=주황(#f59e0b)
const COLORS = {
  benchPress: "#3b82f6", // 파랑
  deadlift: "#8b5cf6", // 보라
  squat: "#06b6d4", // 시안
} as const;

function buildData(
  monthlyBench: MonthlyData,
  monthlyDeadlift: MonthlyData,
  monthlySquat: MonthlyData
): BigThreeDataPoint[] {
  return MONTH_LABELS.map((label, m) => ({
    monthLabel: label,
    benchPress: monthlyBench[m] != null ? Number(monthlyBench[m]) : null,
    deadlift: monthlyDeadlift[m] != null ? Number(monthlyDeadlift[m]) : null,
    squat: monthlySquat[m] != null ? Number(monthlySquat[m]) : null,
  }));
}

function makeRefLines(domain: [number, number], stepSize: number): number[] {
  const step = domain[1] - domain[0] > 50 ? stepSize * 5 : stepSize;
  const lines: number[] = [];
  for (let y = domain[0]; y <= domain[1]; y += step) {
    lines.push(y);
  }
  return lines;
}

export function BigThreeChart({ monthlyBenchPress, monthlyDeadlift, monthlySquat }: BigThreeChartProps) {
  const data = buildData(monthlyBenchPress, monthlyDeadlift, monthlySquat);

  const bench = data.map((d) => d.benchPress).filter((w): w is number => w != null);
  const dead = data.map((d) => d.deadlift).filter((w): w is number => w != null);
  const squat = data.map((d) => d.squat).filter((w): w is number => w != null);
  const allKg = [...bench, ...dead, ...squat];
  const minKg = allKg.length ? Math.min(...allKg) : 0;
  const maxKg = allKg.length ? Math.max(...allKg) : 200;
  const padding = 5;
  const domain: [number, number] = [Math.floor(minKg - padding), Math.ceil(maxKg + padding)];
  const refLines = makeRefLines(domain, 10);

  const chartMargin = { top: 10, right: 10, left: 0, bottom: 24 };
  const chartHeight = 280;

  const sharedTooltipStyle = {
    backgroundColor: "var(--background)",
    border: "1px solid var(--muted)",
    borderRadius: "6px",
  };

  return (
    <>
      <div
        className="w-full"
        style={{ height: chartHeight }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <ComposedChart
            data={data}
            margin={chartMargin}
          >
            <defs>
              <linearGradient
                id="bigThreeBench"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={COLORS.benchPress}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={COLORS.benchPress}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="bigThreeDeadlift"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={COLORS.deadlift}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={COLORS.deadlift}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="bigThreeSquat"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={COLORS.squat}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={COLORS.squat}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal
              vertical
              className="stroke-muted"
            />
            {refLines.map((y) => (
              <ReferenceLine
                key={y}
                yAxisId="left"
                y={y}
                stroke="var(--muted)"
                strokeDasharray="3 3"
              />
            ))}
            <XAxis
              dataKey="monthLabel"
              tick={{ fontSize: 10 }}
              className="text-muted-foreground"
            />
            <YAxis
              yAxisId="left"
              domain={domain}
              unit=" kg"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              width={36}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: 12 }}
              iconType="line"
              iconSize={10}
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
              itemSorter={(item) => SERIES_ORDER[String(item.value)] ?? 99}
            />
            <Tooltip
              itemSorter={(item) => SERIES_ORDER[String(item.name)] ?? 99}
              formatter={(value: unknown, name?: string) => {
                const label = name ?? "";
                if (value == null || typeof value !== "number") return ["-", label];
                return [`${value} kg`, label];
              }}
              labelFormatter={(label) => `${label}`}
              contentStyle={sharedTooltipStyle}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="benchPress"
              name="밴치프레스"
              stroke={COLORS.benchPress}
              strokeWidth={2}
              fill="url(#bigThreeBench)"
              connectNulls
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="deadlift"
              name="데드리프트"
              stroke={COLORS.deadlift}
              strokeWidth={2}
              fill="url(#bigThreeDeadlift)"
              connectNulls
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="squat"
              name="스쿼트"
              stroke={COLORS.squat}
              strokeWidth={2}
              fill="url(#bigThreeSquat)"
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-center text-sm text-muted-foreground">3대운동 (kg)</p>
    </>
  );
}
