import { useState } from "react"
import { Api } from "../api"
import {
  DataPoint,
  DatasetObject,
  FormValues,
  LineParams,
  LossParams,
  LatestParams,
} from "../types"
import TrainFrom from "./TrainFrom"
import AnimationChart from "./GeneratedDataClassification/AnimationChart"
import { Box, Button } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import LossChart from "./DatasetClassification/LossChart"

type Props = {
  trainData: DataPoint[] | DatasetObject[]
  dataset?: string
  setOpenForm?: (open: boolean) => void
  setOpenTrain: (open: boolean) => void
  setOpenTest: (open: boolean) => void
  lineParams?: LineParams[]
  setLineParams?: (lineParams: LineParams[]) => void
  lossParams?: LossParams[]
  setLossParams?: (lossParams: LossParams[]) => void
  setLatestParams: (params: LatestParams) => void
  formValues: FormValues
  setFormValues: (formValues: FormValues) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Train = ({
  trainData,
  dataset,
  setOpenForm,
  setOpenTrain,
  setOpenTest,
  lineParams,
  setLineParams,
  lossParams,
  setLossParams,
  setLatestParams,
  formValues,
  setFormValues,
  onChange,
}: Props) => {
  const api = Api.getInstance()
  const [loading, setLoading] = useState(false)

  const dimension = Object.keys(trainData[0]).length - 1

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await api.trainDataClassification(
        parseInt(formValues.max_iter),
        parseFloat(formValues.learning_rate),
        formValues.optimizer,
        formValues.criterion,
        trainData,
        dataset
      )

      setLineParams && setLineParams(result.result.line_params)
      setLossParams && setLossParams(result.result.loss_params)
      setLatestParams(result.latest_params)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleReturnToForm = () => {
    setFormValues({
      max_iter: "",
      optimizer: "",
      criterion: "",
      learning_rate: "",
    })
    setLineParams && setLineParams([])
    setLossParams && setLossParams([])
    setLatestParams({ w: [], b: 0 })
  }

  const onCancel = () => {
    setOpenForm && setOpenForm(false)
    setOpenTrain(false)
  }

  const handleOpenTest = () => {
    setOpenTrain(false)
    setOpenForm && setOpenForm(false)
    setOpenTest(true)
  }

  const disabled =
    formValues.max_iter === "" ||
    formValues.optimizer === "" ||
    formValues.criterion === "" ||
    formValues.learning_rate === ""

  const showTrainForm =
    (lineParams && lineParams.length === 0) ||
    (lossParams && lossParams.length === 0)

  const showLossChart = lossParams && lossParams.length > 0
  const showAnimationChart = lineParams && lineParams.length > 0

  return (
    <>
      {showTrainForm && (
        <TrainFrom
          onChange={onChange}
          handleSubmit={handleSubmit}
          onCancel={onCancel}
          disabled={disabled}
          loading={loading}
          dimension={dimension}
        />
      )}

      {(showLossChart || showAnimationChart) && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Button
              onClick={handleReturnToForm}
              variant="contained"
              color="error"
              sx={{ height: "10%", ml: 2 }}
            >
              <ArrowBackIcon />
              Vrati se na formu
            </Button>
            {showAnimationChart && (
              <AnimationChart
                lineParams={lineParams}
                trainData={trainData as DataPoint[]}
                formValues={formValues}
              />
            )}
            {showLossChart && (
              <LossChart lossParams={lossParams} formValues={formValues} />
            )}
            <Button
              onClick={handleOpenTest}
              variant="contained"
              color="success"
              sx={{ height: "10%", mr: 2 }}
            >
              {/* //TODO: smisli bolji naziv  */}
              idi na testiranje
              <ArrowForwardIcon />
            </Button>
          </Box>
        </>
      )}
    </>
  )
}

export default Train
