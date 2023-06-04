import { useState } from "react"
import { HistogramResult } from "../types"
import { useParams } from "react-router-dom"
import { Api } from "../api"
import { Box, Button, CircularProgress } from "@mui/material"
import HistogramCarousel from "../components/Carousels/HistogramCarousel"

interface Props {
  numericalColumnsPresent: boolean
}

const HistogramContainer = ({ numericalColumnsPresent }: Props) => {
  const api = Api.getInstance()
  const { datasetName } = useParams()

  const [histogramData, setHistogramData] = useState<HistogramResult[]>([])

  const [histogramDataLoading, setHistogramDataLoading] = useState(false)

  const handleShowHistograms = async () => {
    setHistogramDataLoading(true)
    try {
      const result = await api.getRegressionDatasetHistogram(datasetName ?? "")
      setHistogramData(result)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setHistogramDataLoading(false)
    }
  }

  return (
    <>
      {!histogramDataLoading &&
        histogramData.length === 0 &&
        numericalColumnsPresent && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
            <Button onClick={handleShowHistograms} variant="outlined">
              Prikaži histograme numeričkih varijabli
            </Button>
          </Box>
        )}

      {histogramDataLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        histogramData.length > 0 && (
          <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
            <HistogramCarousel histogramData={histogramData} />
          </Box>
        )
      )}
    </>
  )
}

export default HistogramContainer
