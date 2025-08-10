import React from 'react';

const Checknow = ({
  width = '7vw',
  height = '7vh',
  mainColor = '#068F36',
  topGradientColor = '#459B03',
  bottomGradientColor = '#007328',
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 202 85"
    fill="none"
    className={className}
    {...props}
  >
    <g filter="url(#filter0_dd_177_8862)">
      <path
        d="M6.56994 4.7092C6.72258 2.61863 8.46319 1.00047 10.5593 1.00047H196.697C199.021 1.00047 200.856 2.97404 200.686 5.29174L195.43 77.2911C195.277 79.3817 193.537 80.9999 191.44 80.9999H5.30269C2.97883 80.9999 1.14409 79.0263 1.3133 76.7086L6.56994 4.7092Z"
        fill={mainColor}
      />
      <path
        d="M196.697 0.5C199.311 0.500104 201.376 2.7208 201.186 5.32812L195.929 77.3271C195.757 79.679 193.799 81.5 191.44 81.5H5.30273C2.68839 81.5 0.624088 79.2793 0.814453 76.6719L6.07129 4.67285C6.243 2.32096 8.20142 0.5 10.5596 0.5H196.697Z"
        stroke="black"
      />
    </g>
    <mask id="mask0_177_8862" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="1" y="1" width="200" height="80">
      <path
        d="M6.56995 4.70922C6.72258 2.61865 8.46319 1.00049 10.5593 1.00049H196.697C199.021 1.00049 200.856 2.97406 200.686 5.29175L195.43 77.2911C195.277 79.3817 193.537 80.9999 191.44 80.9999H5.30269C2.97883 80.9999 1.14409 79.0263 1.3133 76.7086L6.56995 4.70922Z"
        fill="#E6311F"
      />
    </mask>
    <g mask="url(#mask0_177_8862)">
      <rect x="-5.68164" y="-14.9929" width="225.403" height="23.4222" fill={topGradientColor} />
      <rect x="-5.55078" y="72.2297" width="225.403" height="23.9316" fill={bottomGradientColor} />
    </g>
    <defs>
      <filter id="filter0_dd_177_8862" x="0.302734" y="0.000488281" width="201.595" height="84.4993" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="0.2" dy="2.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_177_8862" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="0.6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_177_8862" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default Checknow;