import clsx from "clsx";

type Props = {
  textColor?: string;
  backgroundColor?: string;
  topColor?: string;
  className?: string;
};

export default function CircleText({
  textColor = "#000000",
  backgroundColor = "#FFFCFA",
  topColor = "#EE2C2C",
  className,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={clsx("circle-text", className)}
      role="img"
      aria-labelledby="pokeball-title"
    >
      <title id="pokeball-title">Poké Ball</title>

      <circle
        cx="60"
        cy="60"
        r="58"
        fill="none"
        stroke={textColor}
        strokeWidth="2"
      />

      <path
        className="origin-center animate-spin-slow"
        d="M2 60a58 58 0 01116 0H2z"
        fill={topColor}
      />

      <path
        d="M2 60a58 58 0 00116 0H2z"
        fill={backgroundColor}
        transform="translate(0,0)"
      />

      <rect
        x="0"
        y="52"
        width="120"
        height="16"
        fill={textColor}
        className="origin-center animate-spin-slow"
      />

      <circle
        cx="60"
        cy="60"
        r="13"
        fill={textColor}
        className="origin-center animate-spin-slow"
      />

      <circle
        cx="60"
        cy="60"
        r="8.5"
        fill={backgroundColor}
        className="origin-center animate-spin-slow"
      />

      <circle
        cx="60"
        cy="60"
        r="3.2"
        fill={textColor}
        opacity="0.9"
        className="origin-center animate-spin-slow"
      />
    </svg>
  );
}
