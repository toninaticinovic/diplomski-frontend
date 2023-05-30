import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import { StatisticalAnalysisResult } from "../types"

interface Props {
  dataStats: StatisticalAnalysisResult[]
}

const StatisticalAnalysisTable = ({ dataStats }: Props) => {
  return (
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
          <TableCell sx={{ color: "primary.main" }}>Max vrijednost </TableCell>
          <TableCell sx={{ color: "primary.main" }}>Min vrijednost</TableCell>
          <TableCell sx={{ color: "primary.main" }}>Mean</TableCell>
          <TableCell sx={{ color: "primary.main" }}>Median</TableCell>
          <TableCell sx={{ color: "primary.main" }}>Std</TableCell>
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
              {column.column}
            </TableCell>
            <TableCell>{column.max.toFixed(2)}</TableCell>
            <TableCell>{column.min.toFixed(2)}</TableCell>
            <TableCell>{column.mean.toFixed(2)}</TableCell>
            <TableCell>{column.median.toFixed(2)}</TableCell>
            <TableCell>{column.std.toFixed(2)}</TableCell>
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
  )
}

export default StatisticalAnalysisTable
