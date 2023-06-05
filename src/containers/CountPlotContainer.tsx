import { useState } from "react"
import { CountPlotResult } from "../types"
import { useParams } from "react-router-dom"
import { Api } from "../api"
import { Box, Button, CircularProgress } from "@mui/material"
import CountPlotCarousel from "../components/Carousels/CountPlotCarousel"

interface Props {
  categoricalColumnsPresent: boolean
  isClassification: boolean
}

const CountPlotContainer = ({
  categoricalColumnsPresent,
  isClassification,
}: Props) => {
  const api = Api.getInstance()
  const { datasetName } = useParams()

  const [countPlotData, setCountPlotData] = useState<CountPlotResult[]>([])
  const [countPlotDataLoading, setCountPlotDataLoading] = useState(false)

  const handleShowCountPlots = async () => {
    setCountPlotDataLoading(true)
    try {
      let result: CountPlotResult[] = []
      if (isClassification) {
        result = await api.getClassificationDatasetCountPlot(datasetName ?? "")
      } else {
        result = await api.getRegressionDatasetCountPlot(datasetName ?? "")
      }
      setCountPlotData(result)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setCountPlotDataLoading(false)
    }
  }

  return (
    <>
      {!countPlotDataLoading &&
        countPlotData.length === 0 &&
        categoricalColumnsPresent && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
            <Button onClick={handleShowCountPlots} variant="outlined">
              Prikaži Count Plot dijagrame kategoričkih varijabli
            </Button>
          </Box>
        )}

      {countPlotDataLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        countPlotData.length > 0 && (
          <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
            <CountPlotCarousel countPlotData={countPlotData} />
          </Box>
        )
      )}
    </>
  )
}

export default CountPlotContainer
