import { useEffect, useState } from "react"
import { Api } from "../api"
import { Box } from "@mui/material"
import SubHeader from "../components/SubHeader"
import { useNavigate } from "react-router-dom"

type Dataset = {
  label: string
  value: string
  description: string
}

const DatasetListClassification = () => {
  const api = Api.getInstance()
  const [result, setResult] = useState<Dataset[]>([])
  const navigate = useNavigate()

  async function getDatasets() {
    //   setLoading(false)
    try {
      const result = await api.getClassificationDatasets()
      setResult(result)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      //   setLoading(false)
    }
  }

  useEffect(() => {
    getDatasets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SubHeader
        showButtonClassification={true}
        showButtonRegression={false}
        text={"BINARNA KLASIFIKACIJA - Skupovi podataka"}
      />

      <Box className="datasets-container">
        {result.map((dataset) => (
          <Box
            key={dataset.value}
            className="datasets-card"
            sx={{ borderColor: "primary.dark" }}
            onClick={() => navigate(`/classification/dataset/${dataset.value}`)}
          >
            <Box className="label" sx={{ color: "primary.main" }}>
              {dataset.label}
            </Box>
            <Box className="description">{dataset.description}</Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default DatasetListClassification
