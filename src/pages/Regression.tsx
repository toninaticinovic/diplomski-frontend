import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  DataSize,
  DataStats,
  DatasetObject,
  FormValuesRegression,
  LossParams,
  NumDataStats,
} from "../types"
import { Api } from "../api"
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip,
} from "@mui/material"
import StatisticalAnalysisTable from "../components/StatisticalAnalysisTable"
import SubHeader from "../components/SubHeader"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import BoxPlotContainer from "../containers/BoxPlotContainer"
import HistogramContainer from "../containers/HistogramContainer"
import CountPlotContainer from "../containers/CountPlotContainer"
import TrainSetForm from "../components/DatasetRegression/TrainSetForm"
import Train from "../components/DatasetRegression/Train"
import Test from "../components/DatasetRegression/Test"
import PredictData from "../components/DatasetRegression/PredictData"

const Regression = () => {
  const api = Api.getInstance()
  const { datasetName } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState("")
  const [dataStats, setDataStats] = useState<DataStats[]>([])
  const [numDataStats, setNumDataStats] = useState<NumDataStats[]>([])

  const [dataSize, setDataSize] = useState<DataSize | undefined>(undefined)

  const [modelExists, setModelExists] = useState(false)
  const [openPredict, setOpenPredict] = useState(false)

  const [loadingForm, setLoadingForm] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [formValuesTrainSize, setFormValuesTrainSize] = useState({
    train_size: "",
    checkbox: false,
  })

  const [trainSet, setTrainSet] = useState<DatasetObject[]>([])
  const [openTrain, setOpenTrain] = useState(false)
  const [testSet, setTestSet] = useState<DatasetObject[]>([])
  const [openTest, setOpenTest] = useState(false)

  const [lossParams, setLossParams] = useState<LossParams[]>([])

  const [formValues, setFormValues] = useState<FormValuesRegression>({
    max_iter: "",
    optimizer: "",
    criterion: "",
    learning_rate: "",
  })

  const categoricalColumnsPresent = dataStats.length !== numDataStats.length
  const numericalColumnsPresent = numDataStats.length > 0

  async function staticAnalysis() {
    setLoading(true)
    try {
      const result = await api.getRegressionDatasetStaticAnalysis(
        datasetName ?? ""
      )
      setLabel(result.label)
      setDataSize(result.data_size)
      setDataStats(result.data_stats)
      setNumDataStats(result.num_data_stats)
      setModelExists(result.model_exists)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    staticAnalysis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeTrainSize = (e: any) => {
    const { name, value, type, checked } = e.target

    setFormValuesTrainSize((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async () => {
    setLoadingForm(true)
    try {
      const result = await api.getRegressionDatasetSets(
        datasetName ?? "",
        formValuesTrainSize.train_size,
        formValuesTrainSize.checkbox
      )
      setTrainSet(result.train_data)
      setTestSet(result.test_data)
      setOpenTrain(true)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoadingForm(false)
    }
  }

  const onChangeTrain = (e: any) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (openTrain) {
    return (
      <>
        <SubHeader
          showButtonClassification={false}
          showButtonRegression={true}
          text={`LINEARNA REGRESIJA - ${label}`}
        />
        <Train
          trainData={trainSet}
          setOpenTrain={setOpenTrain}
          setOpenTest={setOpenTest}
          setOpenForm={setOpenForm}
          dataset={datasetName}
          setLossParams={setLossParams}
          lossParams={lossParams}
          formValues={formValues}
          setFormValues={setFormValues}
          onChange={onChangeTrain}
        />
      </>
    )
  }

  if (openTest) {
    return (
      <>
        <SubHeader
          showButtonClassification={false}
          showButtonRegression={true}
          text={`LINEARNA REGRESIJA - ${label}`}
        />
        <Test
          trainData={trainSet}
          testData={testSet}
          setOpenTrain={setOpenTrain}
          setOpenTest={setOpenTest}
          dataset={datasetName ?? ""}
          trainSize={Number(formValuesTrainSize.train_size)}
        />
      </>
    )
  }

  return (
    <>
      <SubHeader
        showButtonClassification={false}
        showButtonRegression={true}
        text={`LINEARNA REGRESIJA - ${label}`}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            navigate("/regression/dataset")
          }}
          variant="contained"
          color="error"
          sx={{ ml: 2 }}
        >
          <ArrowBackIcon />
          Vrati se na odabir
        </Button>
        <Button
          onClick={() => {
            setOpenForm(true)
          }}
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
        >
          Treniraj podatke
          <ArrowForwardIcon />
        </Button>
      </Box>
      {modelExists && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip
            title={
              "Omogućeno predviđanje podataka na temelju prethodnog treniranja modela."
            }
            arrow
          >
            <Button
              color="warning"
              variant="outlined"
              onClick={() => setOpenPredict(true)}
            >
              Predvidi podatke
            </Button>
          </Tooltip>
        </Box>
      )}
      <Box sx={{ mt: 1, textAlign: "center" }}>
        {`Broj podataka: ${dataSize?.count}, dimezija ulaznih podataka: ${dataSize?.dimension}`}
      </Box>
      <StatisticalAnalysisTable
        dataStats={dataStats}
        numDataStats={numDataStats}
      />

      <BoxPlotContainer
        numericalColumnsPresent={numericalColumnsPresent}
        isClassification={false}
      />
      <HistogramContainer
        numericalColumnsPresent={numericalColumnsPresent}
        isClassification={false}
      />
      <CountPlotContainer
        categoricalColumnsPresent={categoricalColumnsPresent}
        isClassification={false}
      />

      <Dialog open={openForm} onClose={() => {}}>
        <DialogContent>
          <DialogContentText>
            {loadingForm ? (
              <CircularProgress />
            ) : (
              <TrainSetForm onChange={onChangeTrainSize} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenForm(false)
              setFormValuesTrainSize({ train_size: "", checkbox: false })
            }}
          >
            Odustani
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            disabled={formValuesTrainSize.train_size === ""}
          >
            Nastavi na treniranje
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPredict} onClose={() => setOpenPredict(false)}>
        <DialogContent sx={{ pb: 0 }}>
          <PredictData dataset={datasetName ?? ""} />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button onClick={() => setOpenPredict(false)}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Regression
