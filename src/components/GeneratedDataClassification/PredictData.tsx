import { useState } from "react"
import { DataPoint, LineParams } from "../../types"
import PredictDataForm from "./PredictDataForm"
import { Api } from "../../api"
import DataChart from "./DataChart"
import { Box, Button, CircularProgress } from "@mui/material"

interface Props {
  lineParams: LineParams[]
  data: DataPoint[]
}

const PredictData = ({ lineParams, data }: Props) => {
  const api = Api.getInstance()

  const [formValues, setFormValues] = useState({ x1: "", x2: "" })
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const onChange = (e: any) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await api.predictGeneratedDataClassification(
        lineParams,
        parseFloat(formValues.x1),
        parseFloat(formValues.x2)
      )
      setResult(String(Number(result.prediction) + 2))
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  const disabled = formValues.x1 === "" || formValues.x2 === ""

  const point = {
    x1: Number(formValues.x1),
    x2: Number(formValues.x2),
    color: Number(result),
  }

  const handleReset = () => {
    setFormValues({ x1: "", x2: "" })
    setResult("")
  }

  return (
    <>
      {result === "" && (
        <PredictDataForm
          onChange={onChange}
          handleSubmit={handleSubmit}
          disabled={disabled}
        />
      )}

      {loading && result === "" && <CircularProgress />}

      {result !== "" && (
        <>
          <DataChart data={data} point={point} lineParams={lineParams} />
          <Box sx={{ textAlign: "center" }}>
            Podatak ({formValues.x1}, {formValues.x2}) je klasificiran u klasu{" "}
            <b>{Number(result) - 1} </b>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleReset}> Ponovno</Button>
          </Box>
        </>
      )}
    </>
  )
}

export default PredictData
