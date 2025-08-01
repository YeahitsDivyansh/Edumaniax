// components/icon/AlertIcon.jsx
import React from 'react';

const AlertIcon = ({
  width = '21',
  height = '21',
  fill = '#90A1B9',
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 90 90"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M45 9C25.119 9 9 25.119 9 45C9 64.881 25.119 81 45 81C64.881 81 81 64.881 81 45C81 25.119 64.881 9 45 9ZM48 63H42V42H48V63ZM45 34.5C42.516 34.5 40.5 32.484 40.5 30C40.5 27.516 42.516 25.5 45 25.5C47.484 25.5 49.5 27.516 49.5 30C49.5 32.484 47.484 34.5 45 34.5Z"
      fill={fill}
    />
  </svg>
);

export default AlertIcon;