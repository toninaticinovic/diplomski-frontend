import { Box, Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Api } from "../api"
import { DataPoint } from "../types"
import DataChart from "../components/SeparableDataClassification/DataChart"
import DataForm from "../components/SeparableDataClassification/DataForm"
import Train from "../components/SeparableDataClassification/Train"

const SeparableDataClassification = () => {
  const api = Api.getInstance()

  const navigate = useNavigate()
  const [data, setData] = useState<DataPoint[]>([])
  const [trainData, setTrainData] = useState<DataPoint[]>([])
  const [testData, setTestData] = useState<DataPoint[]>([])

  const [openTrain, setOpenTrain] = useState(false)
  const [openTest, setOpenTest] = useState(false)

  const [showTrainData, setShowTrainData] = useState(false)

  const [formValues, setFormValues] = useState({
    n_samples: "",
    classes: "",
    train_size: "",
  })

  const handleSubmit = async () => {
    try {
      const result = await api.generateSeparableDataClassification(
        parseInt(formValues.n_samples),
        parseInt(formValues.classes),
        parseFloat(formValues.train_size)
      )
      setData(result.data)
      setTrainData(result.train_data)
      setTestData(result.test_data)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      //   setLoadingGameDetails(false)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onCancel = () => {
    navigate("/classification")
  }

  const disabled =
    formValues.n_samples === "" ||
    formValues.classes === "" ||
    formValues.train_size === ""

  return (
    <>
      <Box>
        <h1>Klasifikacija linearno separabilnih podataka</h1>
      </Box>

      {data.length === 0 && (
        <DataForm
          onChange={onChange}
          handleSubmit={handleSubmit}
          onCancel={onCancel}
          disabled={disabled}
        />
      )}

      {data.length > 0 && !openTrain && !openTest && (
        <>
          <Box>
            <Button
              onClick={() => {
                setData([])
                setShowTrainData(false)
              }}
            >
              Ponovno
            </Button>
            <Button
              onClick={() => {
                setOpenTrain(true)
              }}
            >
              {" "}
              Train
            </Button>
          </Box>
          <DataChart
            data={data}
            trainData={trainData}
            showTrainData={showTrainData}
            setShowTrainData={setShowTrainData}
            setData={setData}
          />
        </>
      )}

      {openTrain && <Train trainData={trainData} setOpenTrain={setOpenTrain} />}
    </>
  )
}

export default SeparableDataClassification