import { useState } from "react"
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { DataStats, NumDataStats } from "../types"
import convertToNormalCase from "../utils/convert-to-normal-word"

interface Props {
  dataStats: DataStats[]
  numDataStats: NumDataStats[]
}

const StatisticalAnalysisTable = ({ dataStats, numDataStats }: Props) => {
  const [showNumericalDataStats, setShowNumericalDataStats] = useState(false)

  return (
    <>
      <Typography
        variant="h5"
        sx={{ color: "primary.dark", textAlign: "center", mt: 3 }}
      >
        Statistički pregled podataka
      </Typography>
      <Table
        className="statistical-table"
        sx={{
          width: "80%",
          borderColor: "primary.dark",
          borderCollapse: "separate",
        }}
      >
        <TableHead>
          <TableRow className="statistical-table-labels">
            <TableCell sx={{ color: "primary.main" }}>Column</TableCell>
            <TableCell sx={{ color: "primary.main" }}>
              Broj null vrijednosti
            </TableCell>
            <TableCell sx={{ color: "primary.main" }}>
              Broj jedinstvenih vrijednosti
            </TableCell>
            <TableCell sx={{ color: "primary.main" }}>
              Kategorička/Numerička varijabla
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataStats.map((column) => (
            <TableRow key={column.column} className="statistical-table-values">
              <TableCell sx={{ color: "primary.light" }}>
                {convertToNormalCase(column.column)}
              </TableCell>
              <TableCell>{column.null}</TableCell>
              <TableCell>{column.unique}</TableCell>
              <TableCell>
                {column.is_numerical
                  ? "Numerička varijabla"
                  : "Kategorička varijabla"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {numDataStats.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={() => setShowNumericalDataStats((prev) => !prev)}
            variant="outlined"
          >
            {showNumericalDataStats ? "Sakrij" : "Prikaži"} statistiku
            numeričkih podataka
          </Button>
        </Box>
      )}

      {showNumericalDataStats && (
        <Table
          className="statistical-table"
          sx={{
            width: "80%",
            borderColor: "primary.dark",
            borderCollapse: "separate",
          }}
        >
          <TableHead>
            <TableRow className="statistical-table-labels">
              <TableCell sx={{ color: "primary.main" }}>Column</TableCell>
              <TableCell sx={{ color: "primary.main" }}>
                Max vrijednost{" "}
              </TableCell>
              <TableCell sx={{ color: "primary.main" }}>
                Min vrijednost
              </TableCell>
              <TableCell sx={{ color: "primary.main" }}>Mean</TableCell>
              <TableCell sx={{ color: "primary.main" }}>Median</TableCell>
              <TableCell sx={{ color: "primary.main" }}>Std</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numDataStats.map((column) => (
              <TableRow
                key={column.column}
                className="statistical-table-values"
              >
                <TableCell sx={{ color: "primary.light" }}>
                  {convertToNormalCase(column.column)}
                </TableCell>
                <TableCell>{column.max.toFixed(2)}</TableCell>
                <TableCell>{column.min.toFixed(2)}</TableCell>
                <TableCell>{column.mean.toFixed(2)}</TableCell>
                <TableCell>{column.median.toFixed(2)}</TableCell>
                <TableCell>{column.std.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default StatisticalAnalysisTable
