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
import { DataPoint, LineParams, TestResult } from "../../types"
import ConfusionMatrix from "../ConfusionMatrix"
import PredictData from "./PredictData"

interface Props {
  data: DataPoint[]
  testData: DataPoint[]
  trainData: DataPoint[]
  lineParams: LineParams[]
  setOpenTrain: (open: boolean) => void
  setOpenTest: (open: boolean) => void
}

const Test = ({
  testData,
  trainData,
  lineParams,
  data,
  setOpenTest,
  setOpenTrain,
}: Props) => {
  const api = Api.getInstance()

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TestResult>()
  const [openDialog, setOpenDialog] = useState(false)

  async function modelTest() {
    setLoading(true)
    try {
      const result = await api.testGeneratedDataClassification(
        testData,
        trainData,
        lineParams
      )
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
                  <Box sx={{ color: "primary.main" }}>Mjera točnosti</Box>
                  <Box sx={{ color: "primary.main" }}>
                    (eng. accuracy score)
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ color: "primary.main" }}>F1 mjera</Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ color: "primary.main" }}>Matrica zabune</Box>
                  <Box sx={{ color: "primary.main" }}>
                    (eng. confusion matrix)
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Skup podataka za treniranje</TableCell>
                <TableCell>{result?.accuracy_train}%</TableCell>
                <TableCell>{result?.f1_score_train}%</TableCell>
                <TableCell>
                  <ConfusionMatrix
                    matrix={result?.confusion_matrix_train ?? []}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Skup podataka za testiranje</TableCell>
                <TableCell>{result?.accuracy_test}%</TableCell>
                <TableCell>{result?.f1_score_test}%</TableCell>
                <TableCell>
                  <ConfusionMatrix
                    matrix={result?.confusion_matrix_test ?? []}
                  />
                </TableCell>
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
            <DialogContent>
              <PredictData data={data} lineParams={lineParams} />
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
