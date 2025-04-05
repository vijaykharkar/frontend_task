import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import GraphCard from "./GraphCard";

const AnimatedTogglesPanel = () => {
  const data = [
    { title: "Performance", value: "98%", color: "#4ade80" },
    { title: "Efficiency", value: "87%", color: "#60a5fa" },
    { title: "Latency", value: "12ms", color: "#facc15" },
  ];

  const initialData = [
    { x: 0.1, y: 0.419 },
    { x: 0.2, y: 0.421 },
    { x: 0.3, y: 0.423 },
    { x: 0.4, y: 0.426 },
    { x: 0.5, y: 0.422 },
    { x: 0.6, y: 0.425 },
  ];

  const [chartData, setChartData] = useState(initialData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length, isPaused]);

  return (
    <Box
      width={300}
      height={400}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      position="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 600, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GraphCard
            data={chartData}
            totalPoints={3000}
            growth={8}
            title={data[currentIndex].title}
            value={data[currentIndex].value}
            color={data[currentIndex].color}
          />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default AnimatedTogglesPanel;
