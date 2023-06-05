import { useState } from "react"
import { BoxPlotResult } from "../types"
import { useParams } from "react-router-dom"
import { Api } from "../api"
import { Box, Button, CircularProgress } from "@mui/material"
import BoxPlotCarousel from "../components/Carousels/BoxPlotCarousel"

interface Props {
  numericalColumnsPresent: boolean
  isClassification: boolean
}

const BoxPlotContainer = ({
  numericalColumnsPresent,
  isClassification,
}: Props) => {
  const api = Api.getInstance()
  const { datasetName } = useParams()

  const [boxPlotData, setBoxPlotData] = useState<BoxPlotResult[]>([])
  const [boxPlotDataLoading, setBoxPlotDataLoading] = useState(false)

  const handleShowBoxPlots = async () => {
    setBoxPlotDataLoading(true)
    try {
      let result: BoxPlotResult[] = []
      if (isClassification) {
        result = await api.getClassificationDatasetBoxPlot(datasetName ?? "")
      } else {
        result = await api.getRegressionDatasetBoxPlot(datasetName ?? "")
      }
      setBoxPlotData(result)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setBoxPlotDataLoading(false)
    }
  }

  return (
    <>
      {!boxPlotDataLoading &&
        boxPlotData.length === 0 &&
        numericalColumnsPresent && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button onClick={handleShowBoxPlots} variant="outlined">
              Prikaži Box Plot dijagrame numeričkih varijabli
            </Button>
          </Box>
        )}

      {boxPlotDataLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        boxPlotData.length > 0 && (
          <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
            <BoxPlotCarousel boxPlotData={boxPlotData} />
          </Box>
        )
      )}
    </>
  )
}

export default BoxPlotContainer
