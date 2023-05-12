import { Box, Button } from "@mui/material"
import { VictoryChart, VictoryScatter } from "victory"
import { DataPoint } from "../../types"

type Props = {
  showTrainData: boolean
  setShowTrainData: (showTrainData: boolean) => void
  setData: (data: DataPoint[]) => void
  data: DataPoint[]
  trainData: DataPoint[]
}

const colors = ["red", "blue", "green", "yellow"]

const DataChart = ({
  data,
  trainData,
  showTrainData,
  setShowTrainData,
  setData,
}: Props) => {
  return (
    <Box className="chart-container" sx={{ borderColor: "primary.dark" }}>
      <Box
        className="chart-header"
        sx={{ color: "primary.dark" }}
        component="h3"
      >
        {showTrainData ? "PODACI ZA TRENIRANJE" : "SVI PODACI"}
      </Box>
      <Box className="chart-buttons">
        {showTrainData && (
          <Button
            onClick={() => setShowTrainData(false)}
            size="small"
            variant="outlined"
          >
            Prikaz svih podataka
          </Button>
        )}
        {!showTrainData && (
          <Button
            onClick={() => setShowTrainData(true)}
            size="small"
            variant="outlined"
          >
            Prikaz podataka za treniranje
          </Button>
        )}
      </Box>
      <VictoryChart>
        <VictoryScatter
          data={showTrainData ? trainData : data}
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
      </VictoryChart>
    </Box>
  )
}

export default DataChart
