import axios from "axios";

const extractPdfLink = (htmlText) => {
  const pdfRegex = /href=["']([^"']+\.pdf)["']|src=["']([^"']+\.pdf)["']/i;
  const match = htmlText.match(pdfRegex);

  return match?.[1] || match?.[2] || "";
};

const triggerBrowserDownload = (arrayBuffer, filename) => {
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

export const downloadPdfFromReportUrl = async (
  reportUrl,
  filename = "Project_Estimation_Report.pdf",
) => {
  if (!reportUrl) {
    return false;
  }

  const response = await axios.get(reportUrl, {
    responseType: "arraybuffer",
  });

  const contentType = response.headers?.["content-type"] || "";

  if (contentType.includes("pdf") || contentType === "application/octet-stream") {
    triggerBrowserDownload(response.data, filename);
    return true;
  }

  const htmlText = new TextDecoder("utf-8").decode(response.data);
  const pdfLink = extractPdfLink(htmlText);

  if (!pdfLink) {
    window.open(reportUrl, "_blank", "noopener,noreferrer");
    return false;
  }

  const pdfUrl = new URL(pdfLink, reportUrl).toString();
  const pdfResponse = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });

  triggerBrowserDownload(pdfResponse.data, filename);
  return true;
};

export default downloadPdfFromReportUrl;
