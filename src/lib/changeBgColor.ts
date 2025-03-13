export const changeBgColor = (year: string) => {
  const yearColorMap: Record<string, string> = {
    "2022": "#bef264",
    "2023": "#fde047",
    "2024": "#fdba74",
    "2025": "#fca5a5",
    "2026": "#6ee7b7",
    "2027": "#7dd3fc",
    "2028": "#a5b4fc",
    "2029": "#c4b5fd",
  };
  return yearColorMap[year] || "#fda4af";
};
