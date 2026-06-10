"use client"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BarChartProps {
  data: any[]
  xKey: string
  bars: { key: string; color: string; name: string }[]
  height?: number
  layout?: "horizontal" | "vertical"
}

export function BarChartComponent({ data, xKey, bars, height = 300, layout = "horizontal" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} layout={layout} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        {layout === "horizontal" ? (
          <>
            <XAxis dataKey={xKey} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          </>
        ) : (
          <>
            <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey={xKey} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={100} />
          </>
        )}
        <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        {bars.map(bar => (
          <Bar key={bar.key} dataKey={bar.key} name={bar.name} fill={bar.color} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
