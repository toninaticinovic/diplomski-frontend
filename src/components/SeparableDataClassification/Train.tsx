import { useState } from "react"
import { Api } from "../../api"
import { DataPoint } from "../../types"
import TrainFrom from "./TrainFrom"

type Props = {
  trainData: DataPoint[]
  setOpenTrain: (showTrainData: boolean) => void
}

type FormValues = {
  max_iter: string
  optimizer: "" | "Adam" | "SGD"
  criterion: "" | "BSELoss" | "HingeEmbeddingLoss"
  learning_rate: string
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
  const [lineParams, setLineParams] = useState([])

  const handleSubmit = async () => {
    try {
      const result = await api.trainSeparableDataClassification(
        trainData,
        parseInt(formValues.max_iter),
        parseInt(formValues.learning_rate),
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
      {lineParams.length > 0 && <div>Tonina zavrsi ovo </div>}
    </>
  )
}

export default Train
