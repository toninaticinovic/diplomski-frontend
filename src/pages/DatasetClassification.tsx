import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  BoxPlotResult,
  DatasetObject,
  HistogramResult,
  LossParams,
  StatisticalAnalysisResult,
  LatestParams,
  DataSize,
  FormValues,
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
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import BoxPlotCarousel from "../components/BoxPlotCarousel"
import HistogramCarousel from "../components/HistogramCarousel"
import TrainSetForm from "../components/DatasetClassification/TrainSetForm"
import Train from "../components/Train"
import Test from "../components/Test"

const DatasetClassification = () => {
  const api = Api.getInstance()
  const { datasetName } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState("")
  const [statisticalAnalysisResult, setStatisticalAnalysisResult] = useState<
    StatisticalAnalysisResult[]
  >([])
  const [dataSize, setDataSize] = useState<DataSize | undefined>(undefined)

  const [boxPlotData, setBoxPlotData] = useState<BoxPlotResult[]>([])
  const [histogramData, setHistogramData] = useState<HistogramResult[]>([])

  const [openTrain, setOpenTrain] = useState(false)
  const [trainSize, setTrainSize] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [loadingForm, setLoadingForm] = useState(false)
  const [trainSet, setTrainSet] = useState<DatasetObject[]>([])

  const [testSet, setTestSet] = useState<DatasetObject[]>([])
  const [openTest, setOpenTest] = useState(false)

  const [lossParams, setLossParams] = useState<LossParams[]>([])
  const [latestParams, setLatestParams] = useState<LatestParams>()

  const [formValues, setFormValues] = useState<FormValues>({
    max_iter: "",
    optimizer: "",
    criterion: "",
    learning_rate: "",
  })

  async function staticAnalysis() {
    setLoading(true)
    try {
      const result = await api.getClassificationDatasetStaticAnalysis(
        datasetName ?? ""
      )
      setLabel(result.label)
      setDataSize(result.data_size)
      setStatisticalAnalysisResult(result.data_stats)
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

  const handleShowBoxPlots = async () => {
    try {
      const result = await api.getClassificationDatasetBoxPlot(
        datasetName ?? ""
      )
      setBoxPlotData(result)
    } catch (e: any) {
      console.error(String(e))
    }
  }

  const handleShowHistograms = async () => {
    try {
      const result = await api.getClassificationDatasetHistogram(
        datasetName ?? ""
      )
      setHistogramData(result)
    } catch (e: any) {
      console.error(String(e))
    }
  }

  const handleSubmit = async () => {
    setLoadingForm(true)
    try {
      const result = await api.getClassificationDatasetSets(
        datasetName ?? "",
        trainSize
      )
      setTrainSet(result.train_data)
      setTestSet(result.test_data)
      setTrainSize("")
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
          showButton={true}
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
          showButton={true}
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
        />
      </>
    )
  }

  return (
    <>
      <SubHeader showButton={true} text={`BINARNA KLASIFIKACIJA - ${label}`} />
      <SubHeader showButton={false} text={"STATISTIČKA ANALIZA"} />
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
      <Box sx={{ mt: 1, textAlign: "center" }}>
        {`Broj podataka: ${dataSize?.count}, dimezija ulaznih podataka: ${dataSize?.dimension}`}
      </Box>
      <StatisticalAnalysisTable dataStats={statisticalAnalysisResult} />

      {boxPlotData.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button onClick={handleShowBoxPlots} variant="outlined">
            Prikaži Box Plot dijagrame numeričkih varijabli
          </Button>
        </Box>
      ) : (
        <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
          <BoxPlotCarousel boxPlotData={boxPlotData} />
        </Box>
      )}

      {histogramData.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
          <Button onClick={handleShowHistograms} variant="outlined">
            Prikaži histograme numeričkih varijabli
          </Button>
        </Box>
      ) : (
        <Box sx={{ width: "80%", margin: "auto", mt: 3, mb: 3 }}>
          <HistogramCarousel histogramData={histogramData} />
        </Box>
      )}

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
    </>
  )
}

export default DatasetClassification
