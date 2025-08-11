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
    <g filter="url(#filter0_dd_299_14334)">
      <path
        d="M6.39639 3.79083C6.50625 2.21899 7.81341 1 9.38909 1H197.783C199.522 1 200.897 2.47419 200.776 4.20917L195.604 78.2092C195.494 79.781 194.187 81 192.611 81H4.21699C2.47778 81 1.10304 79.5258 1.2243 77.7908L6.39639 3.79083Z"
        fill={backgroundColor}
      />
      <path
        d="M197.783 0.5C199.812 0.500107 201.416 2.22007 201.274 4.24414L196.103 78.2441C195.974 80.0778 194.449 81.4998 192.611 81.5H4.2168C2.18781 81.4999 0.584117 79.7799 0.725586 77.7559L5.89746 3.75586C6.02567 1.92223 7.5506 0.500214 9.38867 0.5H197.783Z"
        stroke="black"
      />
    </g>
    <mask id="mask0_299_14334" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="1" y="1" width="200" height="80">
      <path
        d="M6.39639 3.79083C6.50625 2.21899 7.81341 1 9.38909 1H197.783C199.522 1 200.897 2.47419 200.776 4.20917L195.604 78.2092C195.494 79.781 194.187 81 192.611 81H4.21699C2.47778 81 1.10304 79.5258 1.2243 77.7908L6.39639 3.79083Z"
        fill="#353C52"
      />
    </mask>
    <g mask="url(#mask0_299_14334)">
      <rect x="-4.37451" y="73.5187" width="207.494" height="7.4817" fill="#283238" />
    </g>
    <path
      d="M34 36.5991C34 39.8403 35.7125 42.7061 38.335 44.4443L49.5197 53.8056C50.8484 54.9178 52.8336 54.9029 54.1442 53.7711L65.3926 44.0564C67.7044 42.2964 69.1819 39.6096 69.1819 36.5991C69.1819 31.2977 64.6002 27 58.9483 27C56.0603 27 53.4516 28.1222 51.5909 29.927C49.7303 28.1222 47.1216 27 44.2336 27C38.5817 27 34 31.2977 34 36.5991Z"
      fill={heartColor}
    />
    <path
      opacity="0.3"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43.6827 38.8955C45.942 38.8955 47.7736 37.0866 47.7736 34.8552C47.7736 32.6238 45.942 30.8149 43.6827 30.8149C41.4234 30.8149 39.5918 32.6238 39.5918 34.8552C39.5918 37.0866 41.4234 38.8955 43.6827 38.8955Z"
      fill={highlightColor}
    />
    <defs>
      <filter id="filter0_dd_299_14334" x="0.216797" y="0" width="201.566" height="85.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="3.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_299_14334" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_299_14334" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default Heart;