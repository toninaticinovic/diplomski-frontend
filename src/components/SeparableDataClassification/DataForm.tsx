import { Box, Button, Stack, TextField } from "@mui/material"

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
  onCancel: () => void
  disabled: boolean
}

const DataForm = ({ onChange, handleSubmit, onCancel, disabled }: Props) => {
  return (
    <form className="form">
      <h3>Unesite broj klasa i broj podataka za klasifikaciju</h3>
      <Stack gap={3}>
        <TextField
          label="Broj podataka"
          type="number"
          name="n_samples"
          onChange={onChange}
          InputProps={{ inputProps: { min: 0 } }}
          required
        />
        <TextField
          label="Broj klasa"
          type="number"
          name="classes"
          onChange={onChange}
          InputProps={{ inputProps: { min: 0, max: 4 } }}
          required
        />
        <TextField
          label="Veličina skupa za treniranje"
          type="number"
          name="train_size"
          onChange={onChange}
          InputProps={{ inputProps: { min: 0, max: 1 } }}
          required
        />
      </Stack>
      <Box className="actions">
        <Button onClick={handleSubmit} disabled={disabled}>
          Generiraj linerano separabilne podatke
        </Button>
        <Button onClick={onCancel} color="error">
          Odustani
        </Button>
      </Box>
    </form>
  )
}

export default DataForm
