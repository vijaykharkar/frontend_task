import React from "react";
import { Container, Grid } from "@mui/material";
import AnimatedThreeSceneCard from "./components/AnimatedThreeSceneCard";
import PerformanceIndicators from "./components/PerformanceIndicators";
import PageTransitionWrapper from "./components/PageTransitionWrapper";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  return (
    <PageTransitionWrapper>
      <Container maxWidth="lg">
        <p>Key Feature</p>
        <h2>The Best in the Business</h2>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <AnimatedThreeSceneCard />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 3 }}
              >
                <PerformanceIndicators />
              </motion.div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </Container>
    </PageTransitionWrapper>
  );
};

export default App;
