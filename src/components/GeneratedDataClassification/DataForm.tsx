import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material"

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
  onCancel: () => void
  disabled: boolean
  loading: boolean
}

const DataForm = ({
  onChange,
  handleSubmit,
  onCancel,
  disabled,
  loading,
}: Props) => {
  return (
    <form className="form">
      <Box component="h3" sx={{ color: "primary.dark" }}>
        Unesite broj podataka za klasifikaciju i odaberite veličinu skupa za
        treniranje
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            Ulazni podaci su 2-dimenzionalni.
          </Alert>
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
              label="Veličina skupa za treniranje (između 0.1 i 1.0)"
              type="number"
              name="train_size"
              onChange={onChange}
              InputProps={{ inputProps: { min: 0.1, max: 1 } }}
              required
            />
          </Stack>
          <Box className="actions">
            <Button onClick={onCancel} color="error">
              Odustani
            </Button>
            <Button onClick={handleSubmit} disabled={disabled}>
              Generiraj podatke
            </Button>
          </Box>
        </>
      )}
    </form>
  )
}

export default DataForm
