import { Box, IconButton } from "@mui/material"
import { VictoryChart, VictoryLine, VictoryScatter } from "victory"
import { LineParams } from "./Train"
import { DataPoint } from "../../types"
import { useEffect, useState } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"

type Props = {
  lineParams: LineParams[]
  trainData: DataPoint[]
}

const colors = ["red", "blue", "green", "yellow"]

const AnimationChart = ({ lineParams, trainData }: Props) => {
  const [iteration, setIteration] = useState(0)

  useEffect(() => {
    if (iteration === lineParams.length - 1) {
      return
    }
    const intervalId = window.setInterval(() => {
      setIteration((iteration) => iteration + 1)
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [iteration, lineParams])

  const w1 = lineParams[iteration].w1
  const w2 = lineParams[iteration].w2
  const b = lineParams[iteration].b
  const xMin = Math.min(...trainData.map((d) => d.x1))
  const xMax = Math.max(...trainData.map((d) => d.x1))

  const y1 = (0.5 - b - w1 * xMin) / w2
  const y2 = (0.5 - b - w1 * xMax) / w2

  const lineData = [
    { x: xMin, y: y1 },
    { x: xMax, y: y2 },
  ]

  return (
    <Box className="chart-container" sx={{ borderColor: "primary.dark" }}>
      <Box
        className="chart-header"
        sx={{ color: "primary.dark" }}
        component="h3"
      >
        TRENIRANJE PODATAKA
      </Box>
      <Box className="chart-buttons">
        <Box
          className="chart-iteration"
          sx={{
            color: "primary.dark",
          }}
        >
          Iteracija: {iteration + 1} / {lineParams.length}
          <IconButton onClick={() => setIteration(0)} color="primary">
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
      <VictoryChart domain={{ y: [-10, 10] }}>
        <VictoryScatter
          data={trainData}
          x={(d) => d.x1}
          y={(d) => d.x2}
          style={{
            data: {
              fill: ({ datum }) => {
                return colors[datum.color]
              },
            },
          }}
        />
        <VictoryLine data={lineData} style={{ data: { stroke: "black" } }} />
      </VictoryChart>
    </Box>
  )
}
export default AnimationChart
