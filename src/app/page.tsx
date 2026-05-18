"use client";

import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Layers3,
  Medal,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  educationData,
  eselonData,
  genderData,
  jobData,
  qualityData,
  qualityScore,
  rankData,
  statusData,
  totalAsn,
  type Datum,
} from "@/lib/asn-data";

const palette = {
  terracotta: "#C9683E",
  mustard: "#D9A93A",
  champagne: "#F1D999",
  teal: "#345D61",
  sage: "#8A9B67",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.68)",
  grid: "rgba(241,217,153,0.12)",
};

const warmCool = [
  palette.terracotta,
  palette.mustard,
  palette.teal,
  palette.sage,
  "#B88352",
  "#6D8B8E",
  "#E2C36B",
];

const jobColors = [
  palette.teal,
  palette.sage,
  "#6D8B8E",
  palette.terracotta,
  "#B88352",
  "#E2C36B",
  palette.mustard,
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatPercent(value: number) {
  return `${value.toLocaleString("id-ID", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}%`;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-champagne/20 bg-[#170f0b]/95 px-3 py-2 text-sm shadow-panel">
      {label ? <div className="mb-1 font-semibold text-champagne">{label}</div> : null}
      <div className="space-y-1">
        {payload.map((item) => (
          <div key={`${item.name}-${item.color}`} className="flex items-center gap-2 text-white">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: item.color ?? palette.mustard }}
            />
            <span className="text-white/70">{item.name}</span>
            <span className="font-semibold">{formatNumber(Number(item.value ?? 0))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel({
  title,
  eyebrow,
  icon,
  children,
  className = "",
}: {
  title: string;
  eyebrow?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel flex min-h-0 flex-col p-3 ${className}`}>
      <div className="mb-1.5 flex shrink-0 items-start justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-champagne/70">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-sm font-bold text-white 2xl:text-base">{title}</h2>
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-champagne/15 bg-white/5 text-champagne">
          {icon}
        </div>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-lg border border-champagne/12 bg-white/[0.045] p-2">
      <div className="mb-1 h-1 w-10 rounded-full" style={{ backgroundColor: accent }} />
      <p className="text-xs text-white/65">{label}</p>
      <p className="text-xl font-black leading-tight text-white">{value}</p>
    </div>
  );
}

function HorizontalBars({
  data,
  colors = warmCool,
  valueSuffix = "",
}: {
  data: Datum[];
  colors?: string[];
  valueSuffix?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 2, right: 32, left: 4, bottom: 2 }}>
        <CartesianGrid horizontal={false} stroke={palette.grid} />
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={116}
          interval={0}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "rgba(255,255,255,0.76)", fontSize: 11 }}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={14}>
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(value: number) => `${formatNumber(value)}${valueSuffix}`}
            fill={palette.white}
            fontSize={11}
            fontWeight={700}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function BarTopLabel({
  x,
  y,
  width,
  value,
}: {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  value?: number | string;
}) {
  const numericValue = Number(value);
  if (!numericValue) return null;

  return (
    <text
      x={Number(x) + Number(width) / 2}
      y={Number(y) - 4}
      fill={palette.white}
      fontSize={10}
      fontWeight={700}
      textAnchor="middle"
    >
      {formatNumber(numericValue)}
    </text>
  );
}

function VerticalBars({ data }: { data: Datum[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 18, right: 8, left: -24, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={palette.grid} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} tick={{ fontSize: 10 }} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={formatNumber} tick={{ fontSize: 10 }} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={16} label={<BarTopLabel />}>
          {data.map((_, index) => (
            <Cell key={index} fill={index === 7 ? palette.mustard : warmCool[index % warmCool.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function CompactLegend({ data, colors }: { data: Datum[]; colors: string[] }) {
  return (
    <div className="grid content-center gap-0.5">
      {data.map((item, index) => (
        <div key={item.name} className="flex min-w-0 items-center gap-1.5 rounded bg-white/[0.035] px-1.5 py-0.5">
          <span
            className="h-2 w-2 shrink-0 rounded-sm"
            style={{ backgroundColor: colors[index % colors.length] }}
          />
          <span className="min-w-0 flex-1 text-[9px] leading-[1.05] text-white/68" title={item.name}>
            {item.name}
          </span>
          <span className="text-[9px] font-black text-white">{formatNumber(item.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const pns = statusData.find((item) => item.name === "PNS")?.value ?? 0;
  const pppk = statusData.find((item) => item.name === "PPPK")?.value ?? 0;
  const functionalTeacher = jobData.find((item) => item.name === "Fungsional Guru")?.value ?? 0;
  const topEducation = educationData.reduce((top, item) => (item.value > top.value ? item : top), educationData[0]);
  const genderChart = genderData.map((item, index) => ({
    ...item,
    fill: index === 0 ? palette.terracotta : palette.mustard,
  }));
  const functionalTotal = jobData
    .filter((item) => item.name.startsWith("Fungsional"))
    .reduce((sum, item) => sum + item.value, 0);
  const bachelorUp = educationData
    .filter((item) => ["S1", "S2", "S3"].includes(item.name))
    .reduce((sum, item) => sum + item.value, 0);

  return (
    <main className="mx-auto flex h-screen min-h-[680px] w-full max-w-[1800px] flex-col overflow-hidden px-3 py-2.5">
      <header className="mb-2.5 flex shrink-0 items-end justify-between gap-4 border-b border-champagne/15 pb-2.5">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-champagne/75">
            Pemerintah Kabupaten Magetan
          </p>
          <h1 className="max-w-4xl text-[2rem] font-black uppercase leading-none text-champagne 2xl:text-4xl">
            Dashboard ASN Kabupaten Magetan
          </h1>
        </div>
        <div className="w-[150px] shrink-0">
          <StatCard label="Total ASN" value={formatNumber(totalAsn)} accent={palette.mustard} />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-12 grid-rows-[1fr_1fr_0.92fr] gap-2.5">
        <Panel
          className="col-span-3 row-span-1"
          title="Jenis Kelamin"
          eyebrow="Profil Pegawai"
          icon={<UsersRound size={18} />}
        >
          <div className="grid h-full min-h-0 grid-cols-[1fr_112px] gap-2">
            <div className="min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderChart}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="58%"
                    outerRadius="86%"
                    paddingAngle={3}
                    stroke="rgba(22,14,10,0.7)"
                    strokeWidth={3}
                  >
                    {genderChart.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid content-center gap-2">
              {genderChart.map((item) => (
                <div key={item.name} className="rounded-md bg-white/[0.045] p-2">
                  <p className="text-[10px] text-white/60">{item.name}</p>
                  <p className="mt-0.5 text-lg font-black text-white">{formatNumber(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="col-span-3 row-span-1" title="Status Kepegawaian" eyebrow="Komposisi ASN" icon={<ShieldCheck size={18} />}>
          <div className="h-full min-h-0">
            <HorizontalBars
              data={statusData}
              colors={[palette.terracotta, palette.terracotta, palette.teal, palette.mustard]}
            />
          </div>
        </Panel>

        <Panel className="col-span-6 row-span-1" title="Jenis Jabatan" eyebrow="Sebaran Jabatan" icon={<BriefcaseBusiness size={18} />}>
          <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_170px] gap-2">
            <div className="min-h-0">
              <HorizontalBars data={jobData} colors={jobColors} />
            </div>
            <CompactLegend data={jobData} colors={jobColors} />
          </div>
        </Panel>

        <Panel className="col-span-7 row-span-1" title="Pangkat / Golongan Ruang" eyebrow="Distribusi Golongan" icon={<Medal size={18} />}>
          <div className="h-full min-h-0">
            <VerticalBars data={rankData} />
          </div>
        </Panel>

        <Panel className="col-span-5 row-span-1" title="Pejabat Struktural Berdasar Eselon" eyebrow="Existing vs Bezzeting" icon={<Layers3 size={18} />}>
          <div className="h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={eselonData} margin={{ top: 18, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={palette.grid} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Legend iconType="square" wrapperStyle={{ color: palette.muted, fontSize: 12 }} />
                <Bar
                  name="Existing"
                  dataKey="existing"
                  fill={palette.terracotta}
                  radius={[5, 5, 0, 0]}
                  barSize={18}
                  label={<BarTopLabel />}
                />
                <Bar name="Bezzeting" dataKey="bezzeting" radius={[5, 5, 0, 0]} barSize={18} label={<BarTopLabel />}>
                  {eselonData.map((item) => (
                    <Cell
                      key={item.name}
                      fill={item.name === "IV.b" ? palette.sage : item.name === "II.a" ? palette.mustard : palette.teal}
                    />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="col-span-9 row-span-1" title="Tingkat Pendidikan" eyebrow={`Terbesar: ${topEducation.name}`} icon={<GraduationCap size={18} />}>
          <div className="h-full min-h-0">
            <VerticalBars data={educationData} />
          </div>
        </Panel>

        <Panel className="col-span-3 row-span-1" title="Kualitas Data" eyebrow="Nilai 99,17%" icon={<Award size={18} />}>
          <div className="grid h-full min-h-0 grid-cols-[120px_1fr] gap-2">
            <div className="grid place-items-center rounded-md bg-white/[0.045] p-2 text-center">
              <div>
                <p className="text-3xl font-black leading-none text-champagne">{formatPercent(qualityScore)}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/55">Indeks</p>
              </div>
            </div>
            <div className="grid min-h-0 content-between gap-1">
              {qualityData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between gap-2 rounded-md bg-white/[0.045] px-2 py-1">
                  <div
                    className="h-6 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: [palette.sage, palette.mustard, palette.terracotta, palette.teal][index] }}
                  />
                  <p className="min-w-0 flex-1 text-[10px] leading-tight text-white/65">{item.name}</p>
                  <p className="text-xs font-black text-white">{formatPercent(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </main>
  );
}
