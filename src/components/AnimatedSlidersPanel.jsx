import React, { useState } from "react";
import {
  Card,
  Typography,
  Slider,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

const CustomSliderCard = ({
  label,
  value,
  setValue,
  min,
  max,
  unit,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card
        sx={{
          padding: 3,
          borderRadius: 4,
          width: { xs: 250, sm: 300 },
          backgroundColor: "#f7f7fb",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
          {label}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Slider
            value={value}
            onChange={(e, val) => setValue(val)}
            step={1}
            min={min}
            max={max}
            sx={{
              color: "#a855f7",
              height: 4,
              flex: 1,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
              },
            }}
          />
          <Typography
            variant="body2"
            fontWeight="500"
            ml={2}
            whiteSpace="nowrap"
          >
            {value} {unit}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
};

const AnimatedSlidersPanel = () => {
  const [sources, setSources] = useState(9);
  const [volume, setVolume] = useState(65);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      alignItems="center"
      justifyContent="center"
      width={240}
      height={160}
      padding={2}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <CustomSliderCard
            label="Source variety"
            value={sources}
            setValue={setSources}
            min={1}
            max={20}
            unit="sources"
            delay={0}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <CustomSliderCard
            label="Data volume"
            value={volume}
            setValue={setVolume}
            min={1}
            max={100}
            unit="GB"
            delay={0.2}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimatedSlidersPanel;
