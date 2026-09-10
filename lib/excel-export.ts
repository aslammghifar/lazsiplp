// Export laporan ke .xlsx bergaya "laporan akuntansi" (kop lembaga, header tebal, border rapi,
// kolom angka diformat mata uang, baris total, freeze header, autofilter). Pakai dynamic import
// supaya library ExcelJS (lumayan besar) hanya di-load saat tombol export benar-benar diklik.
import { siteConfig } from "@/lib/site-config";

const BRAND_DARK = "FF16301F"; // primary-900
const BRAND_TINT = "FFEEF3EF"; // primary-50
const BORDER_COLOR = "FFB9CFBE"; // primary-200

type ColumnDef<T> = {
  header: string;
  width: number;
  align?: "left" | "center" | "right";
  kind?: "text" | "number" | "date";
  numFmt?: string;
  value: (row: T, index: number) => string | number | Date;
};

export async function exportSheetToExcel<T>({
  fileNamePrefix,
  reportTitle,
  subtitleLines = [],
  columns,
  rows,
  totalColumns = [],
}: {
  fileNamePrefix: string;
  reportTitle: string;
  subtitleLines?: string[];
  columns: ColumnDef<T>[];
  rows: T[];
  /** Index kolom (0-based) yang barisnya dijumlahkan di baris TOTAL paling bawah. */
  totalColumns?: number[];
}) {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "LAZSIP Admin";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Laporan", {
    pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
    views: [{ state: "frozen", ySplit: 6 + subtitleLines.length }],
  });

  const colCount = columns.length;
  const lastColLetter = sheet.getColumn(colCount).letter;

  function mergeRow(rowNum: number) {
    sheet.mergeCells(rowNum, 1, rowNum, colCount);
    return sheet.getRow(rowNum);
  }

  // --- Kop lembaga ---
  const orgRow = mergeRow(1);
  orgRow.getCell(1).value = siteConfig.name + " — " + siteConfig.fullName;
  orgRow.getCell(1).font = { bold: true, size: 13, color: { argb: BRAND_DARK } };
  orgRow.getCell(1).alignment = { horizontal: "left" };

  const addressRow = mergeRow(2);
  addressRow.getCell(1).value = siteConfig.address;
  addressRow.getCell(1).font = { size: 9, italic: true, color: { argb: "FF5A6B5E" } };

  // --- Judul laporan ---
  const titleRow = mergeRow(4);
  titleRow.getCell(1).value = reportTitle;
  titleRow.getCell(1).font = { bold: true, size: 12, color: { argb: "FF1B3A2B" } };

  let cursor = 5;
  for (const line of subtitleLines) {
    const r = mergeRow(cursor);
    r.getCell(1).value = line;
    r.getCell(1).font = { size: 9.5, color: { argb: "FF4A5A4D" } };
    cursor++;
  }

  const printedRow = mergeRow(cursor);
  printedRow.getCell(1).value = `Dicetak: ${new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short" }).format(new Date())}`;
  printedRow.getCell(1).font = { size: 9, italic: true, color: { argb: "FF8A968D" } };
  cursor += 2; // baris kosong sebelum header tabel

  // --- Header tabel ---
  const headerRowNum = cursor;
  const headerRow = sheet.getRow(headerRowNum);
  columns.forEach((col, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = col.header;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10.5 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_DARK } };
    cell.alignment = { horizontal: col.align ?? "left", vertical: "middle", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: BORDER_COLOR } },
      bottom: { style: "thin", color: { argb: BORDER_COLOR } },
      left: { style: "thin", color: { argb: BORDER_COLOR } },
      right: { style: "thin", color: { argb: BORDER_COLOR } },
    };
    sheet.getColumn(i + 1).width = col.width;
  });
  headerRow.height = 22;

  // --- Baris data ---
  rows.forEach((row, rIdx) => {
    const excelRow = sheet.getRow(headerRowNum + 1 + rIdx);
    columns.forEach((col, cIdx) => {
      const cell = excelRow.getCell(cIdx + 1);
      cell.value = col.value(row, rIdx);
      if (col.numFmt) cell.numFmt = col.numFmt;
      cell.alignment = { horizontal: col.align ?? "left", vertical: "middle" };
      cell.border = {
        top: { style: "hair", color: { argb: BORDER_COLOR } },
        bottom: { style: "hair", color: { argb: BORDER_COLOR } },
        left: { style: "hair", color: { argb: BORDER_COLOR } },
        right: { style: "hair", color: { argb: BORDER_COLOR } },
      };
      if (rIdx % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_TINT } };
      }
    });
    excelRow.height = 18;
  });

  // --- Baris total ---
  if (totalColumns.length > 0 && rows.length > 0) {
    const totalRowNum = headerRowNum + 1 + rows.length;
    const totalRow = sheet.getRow(totalRowNum);
    const labelCell = totalRow.getCell(1);
    sheet.mergeCells(totalRowNum, 1, totalRowNum, totalColumns[0]);
    labelCell.value = `TOTAL (${rows.length} baris)`;
    labelCell.font = { bold: true, size: 10.5 };
    labelCell.alignment = { horizontal: "right" };

    columns.forEach((col, cIdx) => {
      const cell = totalRow.getCell(cIdx + 1);
      cell.border = { top: { style: "double", color: { argb: BRAND_DARK } } };
      if (totalColumns.includes(cIdx)) {
        const sum = rows.reduce((s, row, rIdx) => {
          const v = col.value(row, rIdx);
          return s + (typeof v === "number" ? v : 0);
        }, 0);
        cell.value = sum;
        cell.numFmt = col.numFmt ?? "#,##0";
        cell.font = { bold: true, size: 10.5 };
        cell.alignment = { horizontal: "right" };
      }
    });
    totalRow.height = 20;
  }

  // Autofilter di baris header
  sheet.autoFilter = {
    from: { row: headerRowNum, column: 1 },
    to: { row: headerRowNum, column: colCount },
  };

  sheet.pageSetup.printArea = `A1:${lastColLetter}${headerRowNum + rows.length + (totalColumns.length ? 1 : 0)}`;

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileNamePrefix}-${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
