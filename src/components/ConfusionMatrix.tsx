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
          sx={{ display: "flex", justifyContent: "space-around" }}
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
