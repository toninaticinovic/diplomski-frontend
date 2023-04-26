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
    <>
      <Box>{showTrainData ? "Podaci za trenirajne" : "Svi podaci"}</Box>
      <Box>
        <Button onClick={() => setShowTrainData(false)}>
          Prikaz svih podataka
        </Button>
        <Button onClick={() => setShowTrainData(true)}>
          Prikaz podataka za treniranje
        </Button>
      </Box>
      <Box className="chart-container">
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
    </>
  )
}

export default DataChart
