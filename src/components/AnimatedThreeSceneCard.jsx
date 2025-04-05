import React, { useState, useCallback, useEffect } from "react";
import { Card, Typography, MenuItem, FormControl, Select } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSlidersPanel from "./AnimatedSlidersPanel";
import AnimatedTogglesPanel from "./AnimatedTogglesPanel";

import img1 from "../assets/scene1.jpg";
import img2 from "../assets/scene2.jpg";
import img3 from "../assets/scene3.jpg";

const fadeVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const AnimatedThreeSceneCard = () => {
  const [scene, setScene] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const [customOption, setCustomOption] = useState("");
  const [advancedOption1, setAdvancedOption1] = useState("");
  const [advancedOption2, setAdvancedOption2] = useState("");

  const handleScroll = useCallback(
    (e) => {
      if (isScrolling) return;
      setIsScrolling(true);

      if (e.deltaY > 0 && scene < 3) {
        setScene((prev) => prev + 1);
      } else if (e.deltaY < 0 && scene > 1) {
        setScene((prev) => prev - 1);
      }

      setTimeout(() => setIsScrolling(false), 800);
    },
    [scene, isScrolling]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

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
          sx={{ borderRadius: "12px", backgroundColor: "white" }}
        >
          <MenuItem value="" disabled>
            energy-efficiency mode
          </MenuItem>
          <MenuItem value="balanced">Balance performance</MenuItem>
          <MenuItem value="low-latency">Low Latency mode</MenuItem>
          <MenuItem value="high-latency">High Latency mode</MenuItem>
          <MenuItem value="speed-opt">Optimization of speed</MenuItem>
          <MenuItem value="custom">Custom parameters</MenuItem>
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
          sx={{ borderRadius: "12px", backgroundColor: "white" }}
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
          sx={{ borderRadius: "12px", backgroundColor: "white" }}
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

  const getBackground = () => {
    if (scene === 1) return img1;
    if (scene === 2) return img2;
    return img3;
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeVariants}
          transition={{ duration: 0.8 }}
          whileInView={{ opacity: 1 }}
          onViewportEnter={() => setScene(scene)}
          style={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${getBackground()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          {scene === 1 && renderDropdowns()}
          {scene === 2 && <AnimatedSlidersPanel />}
          {scene === 3 && <AnimatedTogglesPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedThreeSceneCard;
