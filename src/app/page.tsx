"use client";

import {
  Award,
  BarChart3,
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
  RadialBar,
  RadialBarChart,
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
    <section className={`panel min-h-[320px] p-4 sm:p-5 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-champagne/70">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-champagne/15 bg-white/5 text-champagne">
          {icon}
        </div>
      </div>
      {children}
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
    <div className="rounded-lg border border-champagne/12 bg-white/[0.045] p-4">
      <div className="mb-2 h-1 w-12 rounded-full" style={{ backgroundColor: accent }} />
      <p className="text-sm text-white/65">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
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
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 34, left: 8, bottom: 4 }}>
        <CartesianGrid horizontal={false} stroke={palette.grid} />
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={122}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "rgba(255,255,255,0.76)", fontSize: 12 }}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            formatter={(value: number) => `${formatNumber(value)}${valueSuffix}`}
            fill={palette.white}
            fontSize={12}
            fontWeight={700}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function VerticalBars({ data }: { data: Datum[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 18, right: 12, left: -16, bottom: 4 }}>
        <CartesianGrid vertical={false} stroke={palette.grid} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={formatNumber} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={24}>
          {data.map((_, index) => (
            <Cell key={index} fill={index === 7 ? palette.mustard : warmCool[index % warmCool.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
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
  const qualityGauge = [{ name: "Nilai", value: qualityScore, fill: palette.mustard }];

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
      <header className="mb-5 flex flex-col gap-4 border-b border-champagne/15 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-champagne/75">
            Pemerintah Kabupaten Magetan
          </p>
          <h1 className="max-w-4xl text-3xl font-black uppercase leading-tight text-champagne sm:text-5xl">
            Dashboard ASN Kabupaten Magetan
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[620px]">
          <StatCard label="Total ASN" value={formatNumber(totalAsn)} accent={palette.mustard} />
          <StatCard label="PNS" value={formatNumber(pns)} accent={palette.terracotta} />
          <StatCard label="PPPK" value={formatNumber(pppk)} accent={palette.teal} />
          <StatCard label="Guru" value={formatNumber(functionalTeacher)} accent={palette.sage} />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <Panel
          className="xl:col-span-3"
          title="Jenis Kelamin"
          eyebrow="Profil Pegawai"
          icon={<UsersRound size={21} />}
        >
          <div className="h-[250px]">
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
          <div className="grid grid-cols-2 gap-3">
            {genderChart.map((item) => (
              <div key={item.name} className="rounded-md bg-white/[0.045] p-3">
                <p className="text-xs text-white/60">{item.name}</p>
                <p className="mt-1 text-xl font-black text-white">{formatNumber(item.value)}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="xl:col-span-4" title="Status Kepegawaian" eyebrow="Komposisi ASN" icon={<ShieldCheck size={21} />}>
          <div className="h-[320px]">
            <HorizontalBars
              data={statusData}
              colors={[palette.terracotta, palette.terracotta, palette.teal, palette.mustard]}
            />
          </div>
        </Panel>

        <Panel className="xl:col-span-5" title="Jenis Jabatan" eyebrow="Sebaran Jabatan" icon={<BriefcaseBusiness size={21} />}>
          <div className="h-[320px]">
            <HorizontalBars
              data={jobData}
              colors={[
                palette.teal,
                palette.sage,
                "#6D8B8E",
                palette.terracotta,
                "#B88352",
                "#E2C36B",
                palette.mustard,
              ]}
            />
          </div>
        </Panel>

        <Panel className="xl:col-span-4" title="Indeks Kualitas Data" eyebrow="Nilai 99,17%" icon={<Award size={21} />}>
          <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[180px_minmax(0,1fr)]">
            <div className="relative h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={16}
                  data={qualityGauge}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background={{ fill: "rgba(255,255,255,0.08)" }} dataKey="value" cornerRadius={8} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-4xl font-black text-champagne">{formatPercent(qualityScore)}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">Indeks</p>
                </div>
              </div>
            </div>
            <div className="h-[210px]">
              <HorizontalBars data={qualityData} colors={[palette.sage, palette.mustard, palette.terracotta, palette.teal]} valueSuffix="%" />
            </div>
          </div>
        </Panel>

        <Panel className="xl:col-span-8" title="Pangkat / Golongan Ruang" eyebrow="Distribusi Golongan" icon={<Medal size={21} />}>
          <div className="h-[320px]">
            <VerticalBars data={rankData} />
          </div>
        </Panel>

        <Panel className="xl:col-span-7" title="Pejabat Struktural Berdasar Eselon" eyebrow="Existing vs Bezzeting" icon={<Layers3 size={21} />}>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={eselonData} margin={{ top: 18, right: 12, left: -16, bottom: 4 }}>
                <CartesianGrid vertical={false} stroke={palette.grid} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Legend iconType="square" wrapperStyle={{ color: palette.muted, fontSize: 12 }} />
                <Bar name="Existing" dataKey="existing" fill={palette.terracotta} radius={[6, 6, 0, 0]} barSize={24} />
                <Bar name="Bezzeting" dataKey="bezzeting" radius={[6, 6, 0, 0]} barSize={24}>
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

        <Panel className="xl:col-span-5" title="Tingkat Pendidikan" eyebrow={`Terbesar: ${topEducation.name}`} icon={<GraduationCap size={21} />}>
          <div className="h-[340px]">
            <HorizontalBars
              data={educationData}
              colors={[
                palette.sage,
                "#6D8B8E",
                palette.terracotta,
                "#B88352",
                "#8E6E4A",
                palette.teal,
                "#A3A86F",
                palette.mustard,
                "#E2C36B",
                palette.champagne,
              ]}
            />
          </div>
        </Panel>

        <section className="panel xl:col-span-12">
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-terracotta" size={24} />
              <div>
                <p className="text-sm text-white/60">Rasio Perempuan</p>
                <p className="text-xl font-black text-white">
                  {formatPercent((genderData[0].value / totalAsn) * 100)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-mustard" size={24} />
              <div>
                <p className="text-sm text-white/60">PNS + PPPK</p>
                <p className="text-xl font-black text-white">{formatNumber(pns + pppk)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="text-sage" size={24} />
              <div>
                <p className="text-sm text-white/60">Jabatan Fungsional</p>
                <p className="text-xl font-black text-white">
                  {formatNumber(
                    jobData
                      .filter((item) => item.name.startsWith("Fungsional"))
                      .reduce((sum, item) => sum + item.value, 0),
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="text-teal" size={24} />
              <div>
                <p className="text-sm text-white/60">Pendidikan S1-S3</p>
                <p className="text-xl font-black text-white">
                  {formatNumber(
                    educationData
                      .filter((item) => ["S1", "S2", "S3"].includes(item.name))
                      .reduce((sum, item) => sum + item.value, 0),
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
