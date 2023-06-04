import { Box, Button } from "@mui/material"
import { useState } from "react"
import { Api } from "../api"
import { DataPoint, LineParams, LatestParams, FormValuesClassification } from "../types"
import DataChart from "../components/GeneratedDataClassification/DataChart"
import DataForm from "../components/GeneratedDataClassification/DataForm"
import Train from "../components/Classification/Train"
import SubHeader from "../components/SubHeader"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Test from "../components/Classification/Test"

const GeneratedDataClassification = () => {
  const api = Api.getInstance()

  const [data, setData] = useState<DataPoint[]>([])
  const [trainData, setTrainData] = useState<DataPoint[]>([])
  const [testData, setTestData] = useState<DataPoint[]>([])
  const [lineParams, setLineParams] = useState<LineParams[]>([])
  const [latestParams, setLatestParams] = useState<LatestParams>()

  const [openTrain, setOpenTrain] = useState(false)
  const [openTest, setOpenTest] = useState(false)

  const [showTrainData, setShowTrainData] = useState(false)

  const [loadingTrainData, setLoadingTrainData] = useState(false)

  const [formValues, setFormValues] = useState({
    n_samples: "",
    train_size: "",
  })

  const [formValuesTrain, setFormValuesTrain] = useState<FormValuesClassification>({
    max_iter: "",
    optimizer: "",
    criterion: "",
    learning_rate: "",
  })

  const [separable, setSeparable] = useState<undefined | boolean>(undefined)

  const handleSubmit = async () => {
    try {
      setLoadingTrainData(true)
      let result
      if (separable) {
        result = await api.generateSeparableDataClassification(
          parseInt(formValues.n_samples),
          parseFloat(formValues.train_size)
        )
      } else {
        result = await api.generateNonSeparableDataClassification(
          parseInt(formValues.n_samples),
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

  const onChangeTrain = (e: any) => {
    setFormValuesTrain((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onCancel = () => {
    setSeparable(undefined)
  }

  const disabled = formValues.n_samples === "" || formValues.train_size === ""

  return (
    <>
      {separable === undefined && (
        <>
          <SubHeader
            showButtonClassification={true}
            showButtonRegression={false}
            text={"BINARNA KLASIFIKACIJA"}
          />
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
            text={`BINARNA KLASIFIKACIJA - Linearno ${
              separable ? "odvojivi" : "neodvojivi"
            } podaci`}
            showButtonClassification={true}
            showButtonRegression={false}
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
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
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
              setLatestParams={setLatestParams}
              onChange={onChangeTrain}
              formValues={formValuesTrain}
              setFormValues={setFormValuesTrain}
            />
          )}

          {openTest && (
            <Test
              data={data}
              testData={testData}
              trainData={trainData}
              setOpenTrain={setOpenTrain}
              setOpenTest={setOpenTest}
              latestParams={latestParams ?? { w: [], b: 0 }}
            />
          )}
        </>
      )}
    </>
  )
}

export default GeneratedDataClassification
