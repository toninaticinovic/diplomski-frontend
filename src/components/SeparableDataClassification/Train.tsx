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
  setOpenTrain: (showTrainData: boolean) => void
}

const Train = ({ trainData, setOpenTrain }: Props) => {
  const api = Api.getInstance()

  //   const navigate = useNavigate()
  //   const [data, setData] = useState<DataPoint[]>([])
  const [formValues, setFormValues] = useState<FormValues>({
    max_iter: "",
    optimizer: "",
    criterion: "",
    learning_rate: "",
  })
  const [lineParams, setLineParams] = useState<LineParams[]>([])

  const handleSubmit = async () => {
    try {
      const result = await api.trainSeparableDataClassification(
        trainData,
        parseInt(formValues.max_iter),
        parseFloat(formValues.learning_rate),
        formValues.optimizer,
        formValues.criterion
      )
      console.log("result", result)
      setLineParams(result.line_params)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      //   setLoadingGameDetails(false)
    }
  }

  const onChange = (e: any) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onCancel = () => {
    setOpenTrain(false)
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
        />
      )}

      {/* add reset and back button */}
      {lineParams.length > 0 && (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => {
                setLineParams([])
              }}
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
              onClick={() => {
                setOpenTrain(true)
              }}
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
