// components/buttons/HeartButton.jsx
import React from 'react';

const Heart = ({
  width = '7vw',
  height = '7vh',
  backgroundColor = '#232E34',
  heartColor = '#FF4B4B',
  highlightColor = 'white',
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 202 86"
    fill="none"
    className={className}
    {...props}
  >
    <g filter="url(#filter0_dd_177_8828)">
      <path
        d="M6.39639 3.79083C6.50625 2.21899 7.81341 1 9.38909 1H197.783C199.522 1 200.897 2.47419 200.776 4.20917L195.604 78.2092C195.494 79.781 194.187 81 192.611 81H4.21699C2.47778 81 1.10304 79.5258 1.2243 77.7908L6.39639 3.79083Z"
        fill={backgroundColor}
      />
      <path
        d="M197.783 0.5C199.812 0.500107 201.416 2.22007 201.274 4.24414L196.103 78.2441C195.974 80.0778 194.449 81.4998 192.611 81.5H4.2168C2.18781 81.4999 0.584117 79.7799 0.725586 77.7559L5.89746 3.75586C6.02567 1.92223 7.5506 0.500214 9.38867 0.5H197.783Z"
        stroke="black"
      />
    </g>
    <mask id="mask0_177_8828" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="1" y="1" width="200" height="80">
      <path
        d="M6.39639 3.79083C6.50625 2.21899 7.81341 1 9.38909 1H197.783C199.522 1 200.897 2.47419 200.776 4.20917L195.604 78.2092C195.494 79.781 194.187 81 192.611 81H4.21699C2.47778 81 1.10304 79.5258 1.2243 77.7908L6.39639 3.79083Z"
        fill="#353C52"
      />
    </mask>
    <g mask="url(#mask0_177_8828)">
      <rect x="-4.375" y="73.5186" width="207.494" height="7.4817" fill="#283238" />
    </g>
    <path
      d="M58.4082 37.7842C58.4082 41.0253 60.1207 43.8912 62.7432 45.6293L73.9279 54.9907C75.2566 56.1028 77.2418 56.0879 78.5524 54.9562L89.8008 45.2414C92.1126 43.4814 93.5902 40.7947 93.5902 37.7842C93.5902 32.4827 89.0084 28.1851 83.3565 28.1851C80.4685 28.1851 77.8598 29.3072 75.9991 31.1121C74.1385 29.3072 71.5298 28.1851 68.6418 28.1851C62.9899 28.1851 58.4082 32.4827 58.4082 37.7842Z"
      fill={heartColor}
    />
    <path
      opacity="0.3"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M67.0909 40.0805C69.3502 40.0805 71.1818 38.2716 71.1818 36.0403C71.1818 33.8089 69.3502 32 67.0909 32C64.8316 32 63 33.8089 63 36.0403C63 38.2716 64.8316 40.0805 67.0909 40.0805Z"
      fill={highlightColor}
    />
    <defs>
      <filter id="filter0_dd_177_8828" x="0.216797" y="0" width="201.566" height="85.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="3.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_177_8828" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_177_8828" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default Heart;