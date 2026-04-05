"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Figma: Pagination component + Pagination_Buttons component set
// States: Default / Hover / Active / Disabled
export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      {/* Prev */}
      <PageArrow
        direction="left"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      />

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="flex size-10 items-center justify-center text-[14px] text-grey-400 select-none">
            …
          </span>
        ) : (
          <PageButton
            key={page}
            page={page as number}
            isActive={page === currentPage}
            onClick={() => onPageChange(page as number)}
          />
        ),
      )}

      {/* Next */}
      <PageArrow
        direction="right"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      />
    </nav>
  );
}

function PageButton({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Page ${page}`}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex size-10 items-center justify-center rounded-lg text-[14px] font-medium transition-colors duration-150",
        isActive
          ? "bg-purple-500 text-white"
          : "bg-transparent text-grey-700 hover:bg-purple-50 hover:text-purple-500",
      )}
    >
      {page}
    </button>
  );
}

function PageArrow({
  direction,
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
  "aria-label": string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "flex size-10 items-center justify-center rounded-lg border transition-colors duration-150",
        disabled
          ? "border-grey-200 text-grey-300 cursor-not-allowed"
          : "border-grey-200 text-grey-700 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-500",
      )}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {direction === "left" ? (
          <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

// Builds page list with ellipsis: [1, 2, 3, …, 10] or [1, …, 4, 5, 6, …, 10]
function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [];
  const addPage = (p: number) => { if (!pages.includes(p)) pages.push(p); };
  const addEllipsis = () => { if (pages[pages.length - 1] !== "…") pages.push("…"); };

  addPage(1);
  if (current > 3) addEllipsis();
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) addPage(p);
  if (current < total - 2) addEllipsis();
  addPage(total);

  return pages;
}
