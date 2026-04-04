function CalendarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="#525252"
        strokeWidth="1.5"
      />
      <path
        d="M3 9h18M8 2v4M16 2v4"
        stroke="#525252"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="#F4A316"
      className="shrink-0"
    >
      <path d="M12 2l2.4 5 5.6.8-4 4 .9 5.6L12 15l-5 2.4.9-5.6-4-4 5.6-.8L12 2z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"
        stroke="#525252"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="24"
      viewBox="0 0 12 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4.5 9L7.5 12L4.5 15"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoIcon() {
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="14" fill="#4F46E5" />
        <path
          d="M29.1282 34.5001L24.6667 29.8848M29.1282 34.5001C31.2056 33.6828 33.1984 32.652 35.0769 31.4232M29.1282 34.5001V42.1923C29.1282 42.1923 33.6344 41.3462 35.0769 39.1155C36.6831 36.6232 35.0769 31.4232 35.0769 31.4232M24.6667 29.8848C25.4581 27.7609 26.4546 25.725 27.641 23.808C29.3739 20.9418 31.7867 18.5819 34.6501 16.9528C37.5135 15.3237 40.7322 14.4794 44 14.5004C44 18.6849 42.84 26.0387 35.0769 31.4232M24.6667 29.8848L17.2308 29.8848C17.2308 29.8848 18.0487 25.2233 20.2051 23.731C22.6144 22.0695 27.641 23.731 27.641 23.731M17.9744 36.8078C15.7436 38.7462 15 44.5 15 44.5C15 44.5 20.5621 43.7308 22.4359 41.4231C23.4918 40.1308 23.4769 38.1462 22.3021 36.9463C21.724 36.3755 20.9625 36.0457 20.1638 36.0201C19.3651 35.9946 18.5854 36.2751 17.9744 36.8078Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M7 1l1.2 3.8L12 7l-3.8 1.2L7 12l-1.2-3.8L2 7l3.8-1.2L7 1Z"
        stroke="#4f46e5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="1.5"
        y="1.5"
        width="11"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 4.5h6M4 7h6M4 9.5h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export {
  CalendarIcon,
  StarIcon,
  CodeIcon,
  ChevronIcon,
  LogoIcon,
  SparkleIcon,
  BookIcon,
  PersonIcon,
};
