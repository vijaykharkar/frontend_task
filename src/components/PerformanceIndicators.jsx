import React, { useState, useEffect, useMemo } from "react";
import { Grid, Card, Typography, Collapse, Button } from "@mui/material";
import { motion } from "framer-motion";

const indicators = [
  {
    title: "Customizable product",
    details:
      "Neoleaf provides advance customization tools that deliver top modal performance at a compititive inference cost.",
    color: "#292929",
    shortName: "Custom",
  },
  {
    title: "Flexibility and Diversity",
    details:
      "Neoleaf delivers the greatest variety and diversity of datato help deliver the greatest value to your product performance.",
    color: "#292929",
    shortName: "Flex",
  },
  {
    title: "Scalability",
    details:
      "Neoleaf is packaged with inference engines that deliver better runtime performance at a lower cost. Scale up, pr down , as needed.",
    color: "#292929",
    shortName: "Performance",
  },
];

const generateDotColors = () => {
  const colors = ["#464045", "#ADFF2F"];
  return Array.from(
    { length: 9 },
    () => colors[Math.floor(Math.random() * colors.length)]
  );
};

const PerformanceIndicators = () => {
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [collapseValue, setCollapseValue] = useState({ 0: false });

  const dotColorsMap = useMemo(() => {
    return indicators.map(() => generateDotColors());
  }, []);

  useEffect(() => {
    if (visibleCardIndex < indicators.length) {
      const collapseTimer = setTimeout(() => {
        setCollapseValue((prev) => ({ ...prev, [visibleCardIndex]: true }));

        const showNextCardTimer = setTimeout(() => {
          setVisibleCardIndex((prev) => prev + 1);
          setCollapseValue((prev) => ({
            ...prev,
            [visibleCardIndex + 1]: false,
          }));
        }, 1000);

        return () => clearTimeout(showNextCardTimer);
      }, 3000);

      return () => clearTimeout(collapseTimer);
    }
  }, [visibleCardIndex]);

  const handleHover = (index, show) => {
    setCollapseValue((prev) => ({ ...prev, [index]: !show }));
  };

  return (
    <Grid container spacing={3} direction="column">
      {indicators.map((item, index) =>
        index <= visibleCardIndex ? (
          <Grid item key={index}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
            >
              <Card
                sx={{
                  backgroundColor: item.color,
                  color: "#fff",
                  borderRadius: "15px",
                  padding: "0px",
                  width: "100%",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    padding: "10px",
                  }}
                >
                  <Collapse in={!collapseValue[index]} timeout={500}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body1"
                      sx={{ fontSize: "12px" }}
                    >
                      {item.details}
                    </Typography>
                  </Collapse>

                  {collapseValue[index] && (
                    <Button
                      sx={{
                        background: "#404040",
                        color: "#fff",
                        fontSize: "14px",
                        textTransform: "none",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      {item.shortName}
                    </Button>
                  )}

                  <div
                    style={{
                      display: "grid",
                      justifyContent: "end",
                      flexDirection: "row",
                      gridTemplateColumns: "repeat(3, 8px)",
                      gap: "4px",
                    }}
                  >
                    {dotColorsMap[index].map((color, i) => (
                      <div
                        key={i}
                        style={{
                          width: "8px",
                          height: "8px",
                          background: color,
                          borderRadius: "50%",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {!collapseValue[index] && (
                  <Button
                    sx={{
                      background: "#404040",
                      color: "#fff",
                      fontSize: "14px",
                      textTransform: "none",
                      borderRadius: "10px",
                      padding: "10px",
                      margin: "8px 0px 8px 8px",
                      minWidth: "120px",
                      alignSelf: "flex-start",
                    }}
                  >
                    {item.shortName}
                  </Button>
                )}
              </Card>
            </motion.div>
          </Grid>
        ) : null
      )}
    </Grid>
  );
};

export default PerformanceIndicators;
