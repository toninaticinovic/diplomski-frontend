import { Box, Button, Stack, TextField } from "@mui/material"

type Props = {
  onChange: (e: any) => void
  handleSubmit: () => void
  disabled: boolean
}

const PredictDataForm = ({
  onChange,
  handleSubmit,
  disabled,
}: Props) => {
  return (
    <form>
      <Box component="h3" sx={{ color: "primary.dark" }}>
        Unesite podatke za predviđanje izlaza modela
      </Box>

      <Stack gap={3}>
        <TextField
          label="Prva koordinata"
          type="number"
          name="x1"
          onChange={onChange}
          required
        />
        <TextField
          label="Druga koordinata"
          type="number"
          name="x2"
          onChange={onChange}
          required
        />
      </Stack>
      <Box className="actions">
        <Button onClick={handleSubmit} disabled={disabled}>
          Predvidi
        </Button>
      </Box>
    </form>
  )
}

export default PredictDataForm
