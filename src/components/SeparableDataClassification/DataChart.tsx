import { Box, Button } from "@mui/material"
import { VictoryChart, VictoryScatter } from "victory"
import { DataPoint } from "../../types"
import { colors } from "../../constants"

type Props = {
  showTrainData: boolean
  setShowTrainData: (showTrainData: boolean) => void
  data: DataPoint[]
  trainData: DataPoint[]
}

const DataChart = ({
  data,
  trainData,
  showTrainData,
  setShowTrainData,
}: Props) => {
  return (
    <Box className="chart-container" sx={{ borderColor: "primary.dark" }}>
      <Box
        className="chart-header"
        sx={{ color: "primary.dark" }}
        component="h3"
      >
        {showTrainData
          ? `PODACI ZA TRENIRANJE (${trainData.length})`
          : `SVI PODACI (${data.length})`}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "12px",
          color:'primary.main'
        }}
      >
        <Box>Broj klasa: {new Set(data.map((d) => d.color)).size}</Box>
      </Box>
    </Box>
  )
}

export default DataChart
