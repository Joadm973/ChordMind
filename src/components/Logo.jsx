export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#818cf8" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
      <rect x="7" y="8" width="4.2" height="16" rx="1.4" fill="white" opacity="0.95" />
      <rect x="14" y="8" width="4.2" height="16" rx="1.4" fill="white" opacity="0.65" />
      <rect x="21" y="8" width="4.2" height="16" rx="1.4" fill="white" opacity="0.95" />
    </svg>
  )
}
