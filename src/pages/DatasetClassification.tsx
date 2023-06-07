import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  DatasetObject,
  LossParams,
  LatestParams,
  DataSize,
  FormValuesClassification,
  DataStats,
  NumDataStats,
} from "../types"
import StatisticalAnalysisTable from "../components/StatisticalAnalysisTable"
import { Api } from "../api"
import SubHeader from "../components/SubHeader"
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Tooltip,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import TrainSetForm from "../components/DatasetClassification/TrainSetForm"
import Train from "../components/Classification/Train"
import Test from "../components/Classification/Test"
import BoxPlotContainer from "../containers/BoxPlotContainer"
import HistogramContainer from "../containers/HistogramContainer"
import CountPlotContainer from "../containers/CountPlotContainer"
import PredictData from "../components/DatasetClassification/PredictData"

const DatasetClassification = () => {
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

  const [openTrain, setOpenTrain] = useState(false)
  const [trainSize, setTrainSize] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [loadingForm, setLoadingForm] = useState(false)
  const [trainSet, setTrainSet] = useState<DatasetObject[]>([])

  const [testSet, setTestSet] = useState<DatasetObject[]>([])
  const [openTest, setOpenTest] = useState(false)

  const [lossParams, setLossParams] = useState<LossParams[]>([])
  const [latestParams, setLatestParams] = useState<LatestParams>()

  const [formValues, setFormValues] = useState<FormValuesClassification>({
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
      const result = await api.getClassificationDatasetStaticAnalysis(
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

  const handleSubmit = async () => {
    setLoadingForm(true)
    try {
      const result = await api.getClassificationDatasetSets(
        datasetName ?? "",
        trainSize
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
          showButtonClassification={true}
          showButtonRegression={false}
          text={`BINARNA KLASIFIKACIJA - ${label}`}
        />
        <Train
          trainData={trainSet}
          setOpenTrain={setOpenTrain}
          setOpenTest={setOpenTest}
          setOpenForm={setOpenForm}
          dataset={datasetName}
          setLossParams={setLossParams}
          lossParams={lossParams}
          setLatestParams={setLatestParams}
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
          showButtonClassification={true}
          showButtonRegression={false}
          text={`BINARNA KLASIFIKACIJA - ${label}`}
        />
        <Test
          data={[]}
          trainData={trainSet}
          testData={testSet}
          setOpenTrain={setOpenTrain}
          setOpenTest={setOpenTest}
          latestParams={latestParams ?? { w: [], b: 0 }}
          dataset={datasetName}
          trainSize={Number(trainSize)}
        />
      </>
    )
  }

  return (
    <>
      <SubHeader
        showButtonClassification={true}
        showButtonRegression={false}
        text={`BINARNA KLASIFIKACIJA - ${label}`}
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
            navigate("/classification/dataset")
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
        isClassification
      />
      <HistogramContainer
        numericalColumnsPresent={numericalColumnsPresent}
        isClassification
      />
      <CountPlotContainer
        categoricalColumnsPresent={categoricalColumnsPresent}
        isClassification
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogContent>
          <DialogContentText>
            {loadingForm ? (
              <CircularProgress />
            ) : (
              <TrainSetForm
                onChange={(e: any) => setTrainSize(e.target.value)}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenForm(false)
              setTrainSize("")
            }}
          >
            Odustani
          </Button>
          <Button onClick={handleSubmit} autoFocus disabled={trainSize === ""}>
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

export default DatasetClassification
