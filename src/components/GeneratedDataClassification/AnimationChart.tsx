import { Box, IconButton } from "@mui/material"
import { VictoryChart, VictoryLine, VictoryScatter } from "victory"
import { DataPoint, LineParams, FormValuesClassification } from "../../types"
import { useEffect, useState } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import FastForwardIcon from "@mui/icons-material/FastForward"
import { criterionsClassification, optimizers, colors } from "../../constants"

type Props = {
  lineParams: LineParams[]
  trainData: DataPoint[]
  formValues: FormValuesClassification
}

const AnimationChart = ({ lineParams, trainData, formValues }: Props) => {
  const [iteration, setIteration] = useState(0)
  const [fastForward, setFastForward] = useState(false)

  useEffect(() => {
    if (iteration === lineParams.length - 1 || fastForward) {
      return
    }
    const intervalId = window.setInterval(() => {
      setIteration((iteration) => iteration + 1)
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [iteration, lineParams, fastForward])

  const handleRefresh = () => {
    setFastForward(false)
    setIteration(0)
  }

  const handleFastForward = () => {
    setFastForward(true)
    setIteration(lineParams.length - 1)
  }

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
          <IconButton onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={handleFastForward} color="primary">
            <FastForwardIcon />
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          fontSize: "12px",
          color: "primary.main",
        }}
      >
        <Box>
          {" "}
          Funkcija gubitka:{" "}
          {
            criterionsClassification.find(
              (criterion) => criterion.value === formValues.criterion
            )?.label
          }
        </Box>
        <Box>
          {" "}
          Optimizator:{" "}
          {
            optimizers.find(
              (optimizer) => optimizer.value === formValues.optimizer
            )?.label
          }
        </Box>
        <Box>Stopa učenja: {formValues.learning_rate}</Box>
      </Box>
    </Box>
  )
}
export default AnimationChart
