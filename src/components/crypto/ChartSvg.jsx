import React from 'react';

const CHART_PATHS = {
  '1H':  'M 0,130 L 60,120 L 120,125 L 180,115 L 240,118 L 300,112 L 360,108 L 420,115 L 480,110 L 540,105 L 600,108 L 660,112 L 720,108 L 780,112 L 800,110',
  '1D':  'M 0,112 L 30,118 L 60,115 L 90,122 L 120,118 L 150,125 L 180,130 L 210,138 L 240,145 L 270,155 L 300,165 L 330,175 L 360,185 L 390,172 L 410,160 L 435,145 L 460,130 L 490,112 L 515,95 L 540,80 L 568,65 L 590,80 L 615,95 L 640,108 L 660,115 L 680,120 L 700,118 L 720,122 L 740,128 L 760,130 L 800,133',
  '1W':  'M 0,155 L 100,140 L 150,130 L 200,115 L 250,125 L 300,110 L 350,100 L 400,92 L 450,105 L 500,98 L 550,110 L 600,115 L 650,120 L 700,125 L 750,120 L 800,128',
  '1M':  'M 0,180 L 80,165 L 160,145 L 200,130 L 240,120 L 280,112 L 320,105 L 360,95 L 400,100 L 440,110 L 480,115 L 520,120 L 560,112 L 600,118 L 640,122 L 720,128 L 800,132',
  '1Y':  'M 0,190 L 80,180 L 160,170 L 240,155 L 320,130 L 400,100 L 480,80 L 520,60 L 560,55 L 600,65 L 640,80 L 680,90 L 720,110 L 760,120 L 800,132',
  'ALL': 'M 0,195 L 100,190 L 200,185 L 300,178 L 400,160 L 500,130 L 560,100 L 600,75 L 640,55 L 680,65 L 720,80 L 760,100 L 800,132',
};

export default function ChartSvg({ period = '1D', color = '#05b169' }) {
  const path = CHART_PATHS[period] || CHART_PATHS['1D'];
  const areaPath = path.replace(/^M (\d+),(\d+)/, 'M $1,200') + ' L 800,200 Z';

  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath.replace(/^M \d+,200/, `M 0,200`)} fill="url(#chartGrad)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
