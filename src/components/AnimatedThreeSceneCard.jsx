import React, { useState, useEffect } from "react";
import { Card, Typography, MenuItem, FormControl, Select } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/scene1.jpg";
import img2 from "../assets/scene2.jpg";
import img3 from "../assets/scene3.jpg";
import AnimatedSlidersPanel from "./AnimatedSlidersPanel";
import AnimatedTogglesPanel from "./AnimatedTogglesPanel";

const AnimatedThreeSceneCard = () => {
  const [scene, setScene] = useState(1);

  const [customOption, setCustomOption] = useState("");
  const [advancedOption1, setAdvancedOption1] = useState("");
  const [advancedOption2, setAdvancedOption2] = useState("");

  useEffect(() => {
    if (scene === 2) {
      const timer = setTimeout(() => setScene(3), 5000);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  useEffect(() => {
    if (customOption) {
      setScene(2);
    }
  }, [customOption, advancedOption1, advancedOption2]);

  const getBackground = () => {
    if (scene === 1) return img1;
    if (scene === 2) return img2;
    return img3;
  };

  const renderDropdowns = () => (
    <Card
      style={{
        padding: 15,
        borderRadius: 20,
        width: "85%",
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Customization options:
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          value={customOption}
          onChange={(e) => setCustomOption(e.target.value)}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "16px",
                boxShadow: 3,
              },
            },
          }}
          sx={{
            borderRadius: "12px",
            backgroundColor: "white",
          }}
        >
          <MenuItem value="" disabled>
            energy-fficiency mode
          </MenuItem>
          <MenuItem value="balanced">balance performance</MenuItem>
          <MenuItem value="balanced">low Latency mode</MenuItem>
          <MenuItem value="high">High Latency mode</MenuItem>
          <MenuItem value="high">optimization of speed</MenuItem>
          <MenuItem value="high">custom parameters</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Advanced customization:
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          value={advancedOption1}
          onChange={(e) => setAdvancedOption1(e.target.value)}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "16px",
                boxShadow: 3,
              },
            },
          }}
          sx={{
            borderRadius: "12px",
            backgroundColor: "white",
          }}
        >
          <MenuItem value="" disabled>
            Neural network
          </MenuItem>
          <MenuItem value="cnn">CNN</MenuItem>
          <MenuItem value="rnn">RNN</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Select
          value={advancedOption2}
          onChange={(e) => setAdvancedOption2(e.target.value)}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "16px",
                boxShadow: 3,
              },
            },
          }}
          sx={{
            borderRadius: "12px",
            backgroundColor: "white",
          }}
        >
          <MenuItem value="" disabled>
            GPU Option
          </MenuItem>
          <MenuItem value="single">Single GPU</MenuItem>
          <MenuItem value="multi">Multi GPU</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "65vh",
          backgroundImage: `url(${getBackground()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "15px",
          padding: "15px",
        }}
      >
        {scene === 1 && renderDropdowns()}
        {scene === 2 && <AnimatedSlidersPanel />}
        {scene === 3 && <AnimatedTogglesPanel />}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedThreeSceneCard;
