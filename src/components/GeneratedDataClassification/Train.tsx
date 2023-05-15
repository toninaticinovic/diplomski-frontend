import { useState } from "react"
import { Api } from "../../api"
import { DataPoint, FormValues, LineParams } from "../../types"
import TrainFrom from "./TrainFrom"
import AnimationChart from "./AnimationChart"
import { Box, Button } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

type Props = {
  trainData: DataPoint[]
  setOpenTrain: (open: boolean) => void
  setOpenTest: (open: boolean) => void
  lineParams: LineParams[]
  setLineParams: (lineParams: LineParams[]) => void
}

const Train = ({
  trainData,
  setOpenTrain,
  setOpenTest,
  lineParams,
  setLineParams,
}: Props) => {
  const api = Api.getInstance()
  const [formValues, setFormValues] = useState<FormValues>({
    max_iter: "",
    optimizer: "",
    criterion: "",
    learning_rate: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await api.trainGeneratedDataClassification(
        trainData,
        parseInt(formValues.max_iter),
        parseFloat(formValues.learning_rate),
        formValues.optimizer,
        formValues.criterion
      )
      setLineParams(result.line_params)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e: any) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleReturnToForm = () => {
    setFormValues({
      max_iter: "",
      optimizer: "",
      criterion: "",
      learning_rate: "",
    })
    setLineParams([])
  }

  const onCancel = () => {
    setOpenTrain(false)
  }

  const handleOpenTest = () => {
    setOpenTrain(false)
    setOpenTest(true)
  }

  const disabled =
    formValues.max_iter === "" ||
    formValues.optimizer === "" ||
    formValues.criterion === "" ||
    formValues.learning_rate === ""

  return (
    <>
      {lineParams.length === 0 && (
        <TrainFrom
          onChange={onChange}
          handleSubmit={handleSubmit}
          onCancel={onCancel}
          disabled={disabled}
          loading={loading}
        />
      )}

      {lineParams.length > 0 && (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleReturnToForm}
              variant="contained"
              color="error"
              sx={{ height: "10%", ml: 2 }}
            >
              <ArrowBackIcon />
              Vrati se na formu
            </Button>
            <AnimationChart
              lineParams={lineParams}
              trainData={trainData}
              formValues={formValues}
            />
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
