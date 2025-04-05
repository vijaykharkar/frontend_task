import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const GraphCard = ({ data, totalPoints, growth, title, value, color }) => {
  const lastPoint = data[data.length - 1];

  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2,
        width: "90%",
        maxWidth: 800,
        background: "#f7f7fb",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
      }}
      elevation={6}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="caption" sx={{ color: "#7d7d8f" }}>
              LEARNING RATE VS. ERROR REDUCTION
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {totalPoints.toLocaleString()} Data Points Analyzed
            </Typography>
          </Box>

          <Chip
            icon={<ArrowUpwardIcon sx={{ color: "#4caf50" }} />}
            label={`↑ ${growth}%`}
            variant="outlined"
            sx={{
              backgroundColor: "#ecf8ec",
              color: "#4caf50",
              fontWeight: 600,
            }}
          />
        </Box>

        <Box mt={3} height={150}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="x"
                tick={{ fontSize: 12 }}
                stroke="#c5c5d2"
                domain={[0, 1]}
                type="number"
                tickFormatter={(tick) => tick.toFixed(1)}
                label={{
                  value: "Learning Rate",
                  position: "insideBottom",
                  offset: -5,
                  style: { fill: "#7d7d8f", fontSize: 12 },
                }}
              />
              <YAxis
                domain={["dataMin - 0.005", "dataMax + 0.005"]}
                tick={{ fontSize: 12 }}
                stroke="#c5c5d2"
                tickFormatter={(tick) => tick.toFixed(3)}
                label={{
                  value: "Error Reduction",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { fill: "#7d7d8f", fontSize: 12 },
                }}
              />
              <Tooltip
                formatter={(value, name) => [value.toFixed(4), "Error"]}
                labelFormatter={(label) => `Learning Rate: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#000"
                strokeWidth={2}
                dot={{ r: 4, stroke: "#000", fill: "#000" }}
              />
              <ReferenceLine
                x={lastPoint.x}
                stroke="#000"
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraphCard;
