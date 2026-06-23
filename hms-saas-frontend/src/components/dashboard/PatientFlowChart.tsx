"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", admissions: 12, discharges: 8 },
  { day: "Tue", admissions: 18, discharges: 12 },
  { day: "Wed", admissions: 15, discharges: 10 },
  { day: "Thu", admissions: 22, discharges: 15 },
  { day: "Fri", admissions: 28, discharges: 20 },
  { day: "Sat", admissions: 14, discharges: 18 },
  { day: "Sun", admissions: 10, discharges: 12 },
];

export function PatientFlowChart() {
  return (
    <div className="w-full mt-2 font-inter">
      {/* The height is fixed here, and the tags below are perfectly closed */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDischarges" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            stroke="#a1a1aa" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#a1a1aa" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: '1px solid #e4e4e7', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
          />
          <Area
            type="monotone"
            dataKey="admissions"
            name="Admissions"
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#colorAdmissions)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="discharges"
            name="Discharges"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorDischarges)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}