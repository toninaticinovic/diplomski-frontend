import { Box, Stack, TextField } from "@mui/material"

type Props = {
  onChange: (e: any) => void
}

const TrainSetForm = ({ onChange }: Props) => {
  return (
    <form>
      <Box component="h4" sx={{ color: "primary.dark" }}>
        Prije treniranja podataka odaberite veličinu skupa za treniranje
      </Box>

      <Stack gap={3}>
        <TextField
          label="Veličina skupa za treniranje (između 0.1 i 1.0)"
          type="number"
          name="train_size"
          onChange={onChange}
          InputProps={{ inputProps: { min: 0.1, max: 1 } }}
          required
        />
      </Stack>
    </form>
  )
}

export default TrainSetForm
