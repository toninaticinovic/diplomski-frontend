import { useEffect, useState } from "react"
import { Box, Button, CircularProgress } from "@mui/material"
import { Api } from "../../api"
import { Field, LatestParams } from "../../types"
import PredictDataForm from "../PredictDataForm"

interface Props {
  dataset: string
  latestParams: LatestParams
}

const PredictData = ({ dataset, latestParams }: Props) => {
  const api = Api.getInstance()

  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({})
  const [fields, setFields] = useState<Field[]>([])
  const [result, setResult] = useState({ prediction: "", outcome: "" })

  async function getFields() {
    setLoading(true)
    try {
      const result = await api.getPredictDatasetRegressionFields(dataset)
      setFields(result.fields)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (e: any, name: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const formValuesArray: string[] = Object.values(formValues)
    setLoading(true)
    try {
      const result = await api.predictDatasetDataRegression(
        latestParams,
        dataset,
        formValuesArray
      )
      setResult(result)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormValues({})
    setResult({ prediction: "", outcome: "" })
  }

  const disabled = fields.some((field) => {
    return formValues[field.name] === undefined || formValues[field.name] === ""
  })

  return (
    <>
      {fields.length > 0 && result.prediction === "" && (
        <PredictDataForm
          fields={fields}
          onChange={onChange}
          handleSubmit={handleSubmit}
          disabled={disabled}
        />
      )}

      {loading && result.prediction === "" && <CircularProgress />}

      {result.prediction !== "" && (
        <>
          <Box sx={{ textAlign: "center", color: "warning.main", mb: 2 }}>
            Podatak (
            {Object.entries(formValues)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
            )
          </Box>

          <Box sx={{ textAlign: "center" }}>
            Predviđena vrijednost izlazne varijable <b>{result.outcome}</b> iznosi:{" "}
            <b>{result.prediction} </b>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleReset}>Ponovno</Button>
          </Box>
        </>
      )}
    </>
  )
}

export default PredictData
