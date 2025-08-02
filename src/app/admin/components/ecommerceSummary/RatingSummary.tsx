'use client';
import { useDashboardSummary } from '@/app/hooks/queryHooks/useDashboardSummary';
import dynamic from 'next/dynamic';
import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
const DisplaySingleProductRating = dynamic(() => import('@/app/_components/singleProductReviews/DisplaySingleProductRating'), { ssr: false })
const RADIAN = Math.PI / 180;
interface PieDataItem {
  name: string;
  value: number;
  color: string;
}
const RatingSummary = () => {
  const { data: productsSummary, isPending } = useDashboardSummary('products');
  const ratingValue = productsSummary?.productsSummaryData?.overallRating ?? 1
  const data: PieDataItem[] = [
    { name: 'Poor', value: 10, color: '#b7e4c7' },
    { name: 'Fair', value: 20, color: '#74c69d' },
    { name: 'Good', value: 30, color: '#40916c' },
    { name: 'Great', value: 40, color: '#1b4332' },
  ];
  const cx = 150;
  const cy = 200;
  const iR = 60;
  const oR = 120;
  const value = ratingValue;
  const getRatingText = (value: number) => {
    if (value <= 1.5) return { label: 'Poor rating. Needs major improvement.', color: '#531c1d' };
    if (value <= 2.5) return { label: 'Fair. Could be better.', color: '#74c69d' };
    if (value <= 4) return { label: 'Good. Most customers are satisfied.', color: '#40916c' };
    return { label: 'Great! Excellent feedback from users.', color: '#1b4332' };
  };
  const renderNeedle = (
    value: number,
    data: PieDataItem[],
    cx: number,
    cy: number,
    iR: number,
    oR: number,
    color: string
  ) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const angle = 180 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * angle);
    const cos = Math.cos(-RADIAN * angle);
    const r = 5;
    const x0 = cx;
    const y0 = cy;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;
    return (
      <>
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />
        <path d={`M${xba},${yba} L${xbb},${ybb} L${xp},${yp} Z`} fill={color} stroke="none" />
      </>
    );
  };
  const { label, color } = getRatingText(value);
  return (
    <div className="shadow-primaryLight p-4 rounded-md flex items-center justify-center flex-col">
      <h2 className="text-lg font-semibold mb-4 text-primaryDark">Rating Summary</h2>
      <div className="flex flex-col gap-4">
        <PieChart height={200} width={300}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {renderNeedle(value, data, cx, cy, iR, oR, '#fcae04')}
        </PieChart>
        {/* Custom legend */}
        <div className="w-full lg:w-64 text-sm flex flex-col gap-2">
          <div className="flex flex-col">
            <DisplaySingleProductRating rating={value} />
          </div>
          <p className="text-sm rounded-md p-2" style={{ backgroundColor: color, color: '#fff' }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};
export default RatingSummary;
