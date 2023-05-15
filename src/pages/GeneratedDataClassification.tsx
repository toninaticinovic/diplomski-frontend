import { Box, Button } from "@mui/material"
import { useState } from "react"
import { Api } from "../api"
import { DataPoint, LineParams } from "../types"
import DataChart from "../components/GeneratedDataClassification/DataChart"
import DataForm from "../components/GeneratedDataClassification/DataForm"
import Train from "../components/GeneratedDataClassification/Train"
import SubHeader from "../components/GeneratedDataClassification/SubHeader"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Test from "../components/GeneratedDataClassification/Test"

const GeneratedDataClassification = () => {
  const api = Api.getInstance()

  const [data, setData] = useState<DataPoint[]>([])
  const [trainData, setTrainData] = useState<DataPoint[]>([])
  const [testData, setTestData] = useState<DataPoint[]>([])
  const [lineParams, setLineParams] = useState<LineParams[]>([])

  const [openTrain, setOpenTrain] = useState(false)
  const [openTest, setOpenTest] = useState(false)

  const [showTrainData, setShowTrainData] = useState(false)

  const [loadingTrainData, setLoadingTrainData] = useState(false)

  const [formValues, setFormValues] = useState({
    n_samples: "",
    classes: "",
    train_size: "",
  })

  const [separable, setSeparable] = useState<undefined | boolean>(undefined)

  const handleSubmit = async () => {
    try {
      setLoadingTrainData(true)
      let result
      if (separable) {
        result = await api.generateSeparableDataClassification(
          parseInt(formValues.n_samples),
          parseInt(formValues.classes),
          parseFloat(formValues.train_size)
        )
      } else {
        result = await api.generateNonSeparableDataClassification(
          parseInt(formValues.n_samples),
          parseInt(formValues.classes),
          parseFloat(formValues.train_size)
        )
      }
      setData(result.data)
      setTrainData(result.train_data)
      setTestData(result.test_data)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoadingTrainData(false)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onCancel = () => {
    setSeparable(undefined)
  }

  const disabled =
    formValues.n_samples === "" ||
    formValues.classes === "" ||
    formValues.train_size === ""

  return (
    <>
      {separable === undefined && (
        <>
          <SubHeader />
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 5, gap: 3 }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => setSeparable(true)}
            >
              Generiraj linearno odvojive podatke
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setSeparable(false)}
            >
              Generiraj linearno neodvojive podatke
            </Button>
          </Box>
        </>
      )}

      {separable !== undefined && (
        <>
          <SubHeader
            text={`- Linearno ${separable ? "odvojivi" : "neodvojivi"} podaci`}
          />
          {data.length === 0 && (
            <>
              <DataForm
                onChange={onChange}
                handleSubmit={handleSubmit}
                onCancel={onCancel}
                disabled={disabled}
                loading={loadingTrainData}
              />
            </>
          )}

          {data.length > 0 && !openTrain && !openTest && (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={() => {
                    setData([])
                    setShowTrainData(false)
                  }}
                  variant="contained"
                  color="error"
                  sx={{ height: "10%", ml: 2 }}
                >
                  <ArrowBackIcon />
                  Vrati se na formu
                </Button>
                <DataChart
                  data={data}
                  trainData={trainData}
                  showTrainData={showTrainData}
                  setShowTrainData={setShowTrainData}
                />
                <Button
                  onClick={() => {
                    setOpenTrain(true)
                  }}
                  variant="contained"
                  color="success"
                  sx={{ height: "10%", mr: 2 }}
                >
                  Treniraj podatke
                  <ArrowForwardIcon />
                </Button>
              </Box>
            </>
          )}

          {openTrain && (
            <Train
              trainData={trainData}
              setOpenTrain={setOpenTrain}
              setOpenTest={setOpenTest}
              lineParams={lineParams}
              setLineParams={setLineParams}
            />
          )}

          {openTest && (
            <Test
              data={data}
              testData={testData}
              trainData={trainData}
              lineParams={lineParams}
              setOpenTrain={setOpenTrain}
              setOpenTest={setOpenTest}
            />
          )}
        </>
      )}
    </>
  )
}

export default GeneratedDataClassification
