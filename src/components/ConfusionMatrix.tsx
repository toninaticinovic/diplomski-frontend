import { Box } from "@mui/material"

interface Props {
  matrix: number[][]
}

const ConfusionMatrix = ({ matrix }: Props) => {
  return (
    <Box>
      {matrix.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{ display: "flex", justifyContent: "center", gap: 5 }}
        >
          {row.map((cell, cellIndex) => (
            <Box key={cellIndex}>{cell}</Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default ConfusionMatrix
