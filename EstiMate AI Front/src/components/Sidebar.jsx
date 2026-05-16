import React from "react";
import { useSelector } from "react-redux";
import { DarkMode, FileDownload, LightMode } from "@mui/icons-material";

const metricFormatter = new Intl.NumberFormat("ar-EG", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatMetric = (value) => {
  const numericValue = Number(value);

  if (Number.isFinite(numericValue)) {
    return metricFormatter.format(numericValue);
  }

  return metricFormatter.format(0);
};

const MetricCard = ({ label, value, helper }) => (
  <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm">
    <p className="text-xs font-semibold text-slate-500">{label}</p>
    <div className="mt-2 flex items-end justify-between">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      <span className="text-xs text-slate-400">{helper}</span>
    </div>
  </div>
);

const Sidebar = ({ onDownload, onToggleTheme }) => {
  const estimation = useSelector((s) => s.chat.estimation);
  const reportUrl = useSelector((s) => s.chat.reportUrl);
  const theme = useSelector((s) => s.ui.theme);

  return (
    <aside className="w-full rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur md:sticky md:top-6 md:w-80 md:h-[calc(100vh-48px)] md:overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] text-emerald-600">
            تقدير مباشر
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">
            لوحة التقدير
          </h2>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow transition hover:-translate-y-px"
          aria-label="تبديل الثيم"
        >
          {theme === "dark" ? (
            <LightMode fontSize="small" />
          ) : (
            <DarkMode fontSize="small" />
          )}
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        <MetricCard
          label="Function Points (FP)"
          value={formatMetric(estimation.fp_count)}
          helper="قياس حجم الوظائف"
        />
        <MetricCard
          label="Use Case Points (UCP)"
          value={formatMetric(estimation.ucp_count)}
          helper="تعقيد حالات الاستخدام"
        />
        <MetricCard
          label="Estimated Effort"
          value={formatMetric(estimation.effort)}
          helper="شهر-فرد"
        />
        <MetricCard
          label="Estimated Cost"
          value={formatMetric(estimation.cost)}
          helper="دولار أمريكي"
        />
      </div>

      <button
        type="button"
        onClick={() => onDownload && onDownload(reportUrl)}
        disabled={!reportUrl}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-px hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <FileDownload fontSize="small" />
        {reportUrl ? "Download PDF Report" : "Report not ready"}
      </button>
    </aside>
  );
};

export default Sidebar;
