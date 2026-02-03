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

export interface WeeklyDataPoint {
  weekLabel: string;
  weight: number | null;
  muscleMass: number | null;
  bodyFat: number | null;
}

/** 월별 주차. [월인덱스][1~4주] */
export type MonthlyByWeek = (number | null)[][];

interface WeightChartProps {
  /** 1~12월, 각 월당 4개(1~4주) 몸무게(kg). 없는 주는 null */
  monthlyWeights: MonthlyByWeek;
  /** 1~12월, 각 월당 4개(1~4주) 근육량(kg). 없는 주는 null */
  monthlyMuscleMass?: MonthlyByWeek;
  /** 1~12월, 각 월당 4개(1~4주) 체지방(%). 없는 주는 null */
  monthlyBodyFat?: MonthlyByWeek;
}

function buildData(
  monthlyWeights: MonthlyByWeek,
  monthlyMuscleMass?: MonthlyByWeek,
  monthlyBodyFat?: MonthlyByWeek
): WeeklyDataPoint[] {
  const data: WeeklyDataPoint[] = [];
  for (let m = 0; m < 12; m++) {
    const wW = monthlyWeights[m] ?? [null, null, null, null];
    const wM = monthlyMuscleMass?.[m] ?? [null, null, null, null];
    const wF = monthlyBodyFat?.[m] ?? [null, null, null, null];
    for (let w = 0; w < 4; w++) {
      const weight = wW[w];
      const muscle = wM[w];
      const fat = wF[w];
      data.push({
        weekLabel: `${MONTH_LABELS[m]} ${w + 1}주`,
        weight: weight != null ? Number(weight) : null,
        muscleMass: muscle != null ? Number(muscle) : null,
        bodyFat: fat != null ? Number(fat) : null,
      });
    }
  }
  return data;
}

function makeRefLines(domain: [number, number], stepSize: number): number[] {
  const step = domain[1] - domain[0] > 20 ? stepSize * 2.5 : stepSize;
  const lines: number[] = [];
  for (let y = domain[0]; y <= domain[1]; y += step) {
    lines.push(y);
  }
  return lines;
}

export function WeightChart({ monthlyWeights, monthlyMuscleMass, monthlyBodyFat }: WeightChartProps) {
  const data = buildData(monthlyWeights, monthlyMuscleMass, monthlyBodyFat);

  const weights = data.map((d) => d.weight).filter((w): w is number => w != null);
  const muscles = data.map((d) => d.muscleMass).filter((w): w is number => w != null);
  const bodyFats = data.map((d) => d.bodyFat).filter((w): w is number => w != null);
  const padding = 2;
  const domainWeight: [number, number] =
    weights.length > 0
      ? [Math.floor(Math.min(...weights) - padding), Math.ceil(Math.max(...weights) + padding)]
      : [0, 100];
  const domainMuscle: [number, number] =
    muscles.length > 0
      ? [Math.floor(Math.min(...muscles) - padding), Math.ceil(Math.max(...muscles) + padding)]
      : [0, 100];
  const domainFat: [number, number] =
    bodyFats.length > 0
      ? [Math.max(0, Math.floor(Math.min(...bodyFats) - 2)), Math.ceil(Math.max(...bodyFats) + 2)]
      : [0, 50];

  const weightRefLines = makeRefLines(domainWeight, 2);
  const muscleRefLines = makeRefLines(domainMuscle, 2);
  const fatRefLines = makeRefLines(domainFat, 2);

  const chartMargin = { top: 10, right: 10, left: 0, bottom: 24 };
  const chartHeight = 280;

  const sharedAxisProps = {
    dataKey: "weekLabel" as const,
    tick: { fontSize: 10 },
    interval: 3,
    tickFormatter: (value: string) => String(value).split(" ")[0] ?? value,
    className: "text-muted-foreground",
  };

  const sharedTooltipStyle = {
    backgroundColor: "var(--background)",
    border: "1px solid var(--muted)",
    borderRadius: "6px",
  };

  return (
    <>
      {/* 몸무게 (kg) 전용 차트 */}
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
                id="weightGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="#22c55e"
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
            {weightRefLines.map((y) => (
              <ReferenceLine
                key={y}
                yAxisId="left"
                y={y}
                stroke="var(--muted)"
                strokeDasharray="3 3"
              />
            ))}
            <XAxis {...sharedAxisProps} />
            <YAxis
              yAxisId="left"
              domain={domainWeight}
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
            />
            <Tooltip
              formatter={(value: unknown) =>
                value != null && typeof value === "number" ? [`${value} kg`, "몸무게"] : ["-", "몸무게"]
              }
              labelFormatter={(label) => `${label}`}
              contentStyle={sharedTooltipStyle}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="weight"
              name="몸무게"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#weightGradient)"
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 근육량 (kg) 전용 차트 */}
      {monthlyMuscleMass && (
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
                    id="muscleGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ef4444"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="#ef4444"
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
                {muscleRefLines.map((y) => (
                  <ReferenceLine
                    key={y}
                    yAxisId="left"
                    y={y}
                    stroke="var(--muted)"
                    strokeDasharray="3 3"
                  />
                ))}
                <XAxis {...sharedAxisProps} />
                <YAxis
                  yAxisId="left"
                  domain={domainMuscle}
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
                />
                <Tooltip
                  formatter={(value: unknown) =>
                    value != null && typeof value === "number" ? [`${value} kg`, "근육량"] : ["-", "근육량"]
                  }
                  labelFormatter={(label) => `${label}`}
                  contentStyle={sharedTooltipStyle}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="muscleMass"
                  name="근육량"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#muscleGradient)"
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* 체지방 (%) 전용 차트 */}
      {monthlyBodyFat && (
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
                    id="bodyFatGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#f59e0b"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="#f59e0b"
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
                {fatRefLines.map((y) => (
                  <ReferenceLine
                    key={y}
                    yAxisId="left"
                    y={y}
                    stroke="var(--muted)"
                    strokeDasharray="3 3"
                  />
                ))}
                <XAxis {...sharedAxisProps} />
                <YAxis
                  yAxisId="left"
                  domain={domainFat}
                  unit="%"
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
                />
                <Tooltip
                  formatter={(value: unknown) =>
                    value != null && typeof value === "number" ? [`${value}%`, "체지방"] : ["-", "체지방"]
                  }
                  labelFormatter={(label) => `${label}`}
                  contentStyle={sharedTooltipStyle}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bodyFat"
                  name="체지방"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#bodyFatGradient)"
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </>
  );
}
