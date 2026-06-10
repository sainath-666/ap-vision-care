"use client"
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface PieChartProps {
  data: { name: string; value: number; color: string }[]
  height?: number
  innerRadius?: number
  outerRadius?: number
}

export function PieChartComponent({ data, height = 300, innerRadius = 60, outerRadius = 100 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}
          formatter={(value) => [typeof value === "number" ? value.toLocaleString() : value, ""]}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px" }}
          formatter={(value) => <span style={{ color: "#374151" }}>{value}</span>}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
