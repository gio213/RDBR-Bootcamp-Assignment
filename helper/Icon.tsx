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

export { CalendarIcon, StarIcon, CodeIcon };
