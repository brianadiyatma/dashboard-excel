export type Datum = {
  name: string;
  value: number;
};

export type EselonDatum = {
  name: string;
  existing: number;
  bezzeting: number;
};

export const genderData: Datum[] = [
  { name: "Perempuan", value: 5778 },
  { name: "Laki Laki", value: 4131 },
];

export const statusData: Datum[] = [
  { name: "CPNS", value: 232 },
  { name: "PNS", value: 4896 },
  { name: "PPPK", value: 3664 },
  { name: "PPPK Paruh Waktu", value: 1117 },
];

export const jobData: Datum[] = [
  // { name: "JPT Pratama", value: 26 },
  // { name: "Administrator", value: 164 },
  // { name: "Pengawas", value: 333 },
  { name: "Pelaksana", value: 2627 },
  { name: "Fungsional Teknis Lainnya", value: 438 },
  { name: "Fungsional Kesehatan", value: 1852 },
  { name: "Fungsional Guru", value: 4469 },
];

export const qualityData: Datum[] = [
  { name: "Kelengkapan", value: 98.98 },
  { name: "Akurasi", value: 99.75 },
  { name: "Ketepatan Waktu", value: 98.96 },
  { name: "Konsistensi", value: 100 },
];

export const qualityScore = 99.17;

export const rankData: Datum[] = [
  { name: "I/a", value: 4 },
  { name: "I/b", value: 0 },
  { name: "I/c", value: 38 },
  { name: "I/d", value: 4 },
  { name: "II/a", value: 600 },
  { name: "II/b", value: 10 },
  { name: "II/c", value: 721 },
  { name: "II/d", value: 392 },
  { name: "III/a", value: 2986 },
  { name: "III/b", value: 1156 },
  { name: "III/c", value: 710 },
  { name: "III/d", value: 1220 },
  { name: "IV/a", value: 268 },
  { name: "IV/b", value: 351 },
  { name: "IV/c", value: 326 },
  { name: "IV/d", value: 4 },
  { name: "IV/e", value: 2 },
];

export const eselonData: EselonDatum[] = [
  { name: "II.a", existing: 1, bezzeting: 1 },
  { name: "II.b", existing: 25, bezzeting: 32 },
  { name: "III.a", existing: 59, bezzeting: 63 },
  { name: "III.b", existing: 105, bezzeting: 106 },
  { name: "IV.a", existing: 191, bezzeting: 198 },
  { name: "IV.b", existing: 142, bezzeting: 160 },
];

export const educationData: Datum[] = [
  { name: "SD", value: 32 },
  { name: "SLTP", value: 115 },
  { name: "SLTA", value: 2009 },
  { name: "DI", value: 2 },
  { name: "DII", value: 8 },
  { name: "DIII", value: 1416 },
  { name: "D.IV", value: 170 },
  { name: "S1", value: 5859 },
  { name: "S2", value: 297 },
  { name: "S3", value: 1 },
];



export const totalAsn = statusData.reduce((sum, item) => sum + item.value, 0);
