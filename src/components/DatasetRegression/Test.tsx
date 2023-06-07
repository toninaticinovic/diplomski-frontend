import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Api } from "../../api"
import { DataPoint, DatasetObject, TestResultRegression } from "../../types"
import PredictData from "./PredictData"

interface Props {
  testData: DataPoint[] | DatasetObject[]
  trainData: DataPoint[] | DatasetObject[]
  setOpenTrain: (open: boolean) => void
  setOpenTest: (open: boolean) => void
  dataset: string
  trainSize: number
}

const Test = ({
  testData,
  trainData,
  setOpenTest,
  setOpenTrain,
  dataset,
  trainSize,
}: Props) => {
  const api = Api.getInstance()

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TestResultRegression>()
  const [openDialog, setOpenDialog] = useState(false)

  async function modelTest() {
    setLoading(true)
    try {
      const result = await api.testDataRegression(testData, trainData, dataset)
      setResult(result)
    } catch (e: any) {
      console.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    modelTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReturn = () => {
    setOpenTest(false)
    setOpenTrain(true)
  }

  const trainSizeFormatted = trainSize.toFixed(2)
  const testSize = (1 - trainSize).toFixed(2)

  return (
    <Box>
      <Box component="h3" sx={{ color: "primary.dark", textAlign: "center" }}>
        Rezultati i testiranje
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Table
            className="results-table"
            sx={{
              borderColor: "primary.dark",
              width: "50%",
              borderCollapse: "separate",
            }}
            component="div"
          >
            <TableHead>
              <TableRow className="results-table-labels">
                <TableCell>
                  <Box sx={{ color: "primary.main" }}>Skup podataka</Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ color: "primary.main" }}>R2 mjera</Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ color: "primary.main" }}>
                    Srednja kvadratna pogreška (MSE)
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box>Skup podataka za treniranje</Box>
                  <Box
                    sx={{ fontSize: "12px" }}
                  >{`Veličina: ${trainSizeFormatted}`}</Box>
                </TableCell>
                <TableCell>{result?.r2_score_train?.toFixed(2)}</TableCell>
                <TableCell>{result?.mse_train?.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box>Skup podataka za testiranje</Box>
                  <Box sx={{ fontSize: "12px" }}>{`Veličina: ${testSize}`}</Box>
                </TableCell>
                <TableCell>{result?.r2_score_test?.toFixed(2)}</TableCell>
                <TableCell>{result?.mse_test?.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{
                display: "flex",
                width: "50%",
                margin: "auto",
                justifyContent: "space-between ",
              }}
            >
              <Button onClick={handleReturn}> Vrati se na treniranje </Button>
              <Button onClick={() => setOpenDialog(true)} variant="outlined">
                Unesi podatak za predikciju izlaza
              </Button>
            </Box>
          </Box>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogContent sx={{ pb: 0 }}>
              <PredictData dataset={dataset} />
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Button onClick={() => setOpenDialog(false)}>Zatvori</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  )
}

export default Test
