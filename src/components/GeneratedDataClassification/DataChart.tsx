import { Box, Button } from "@mui/material"
import {
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
} from "victory"
import { DataPoint, LatestParams } from "../../types"
import { colors } from "../../constants"

type Props = {
  showTrainData?: boolean
  setShowTrainData?: (showTrainData: boolean) => void
  data: DataPoint[]
  trainData?: DataPoint[]
  point?: DataPoint
  latestParams?: LatestParams
}

const DataChart = ({
  data,
  trainData,
  showTrainData,
  setShowTrainData,
  point,
  latestParams,
}: Props) => {
  const expandedData = [...data, point]

  let lineData

  if (latestParams !== undefined) {
    const w1 = latestParams.w[0][0] as number
    const w2 = latestParams.w[0][1] as number
    const b = latestParams.b
    const xMin = Math.min(...data.map((d) => d.x1), point?.x1 || 25555)
    const xMax = Math.max(...data.map((d) => d.x1), point?.x1 || -25555)

    const y1 = (0.5 - b - w1 * xMin) / w2
    const y2 = (0.5 - b - w1 * xMax) / w2

    lineData = [
      { x: xMin, y: y1 },
      { x: xMax, y: y2 },
    ]
  }

  return (
    <Box className="chart-container" sx={{ borderColor: "primary.dark" }}>
      <Box
        className="chart-header"
        sx={{ color: "primary.dark" }}
        component="h3"
      >
        {showTrainData && trainData
          ? `PODACI ZA TRENIRANJE (${trainData.length})`
          : `SVI PODACI (${data.length})`}
      </Box>
      <Box className="chart-buttons">
        {showTrainData && setShowTrainData && (
          <Button
            onClick={() => setShowTrainData(false)}
            size="small"
            variant="outlined"
          >
            Prikaz svih podataka
          </Button>
        )}
        {!showTrainData && setShowTrainData && (
          <Button
            onClick={() => setShowTrainData(true)}
            size="small"
            variant="outlined"
          >
            Prikaz podataka za treniranje
          </Button>
        )}
      </Box>
      {point ? (
        <VictoryChart>
          <VictoryLegend
            x={350}
            y={0}
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={[
              { name: "Klasa 1", symbol: { fill: colors[0] } },
              { name: "Klasa 2", symbol: { fill: colors[1] } },
            ]}
          />
          <VictoryScatter
            data={expandedData as DataPoint[]}
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
      ) : (
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
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "12px",
          color: "primary.main",
        }}
      >
        <Box>Broj klasa: {new Set(data.map((d) => d.color)).size}</Box>
      </Box>
    </Box>
  )
}

export default DataChart
