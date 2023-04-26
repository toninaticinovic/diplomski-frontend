import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material"

type Props = {
  onChange: (e: any) => void
  handleSubmit: () => void
  onCancel: () => void
  disabled: boolean
}

const optimizers = [
  { value: "SGD", label: "SGD Optimizator" },
  { value: "Adam", label: "Adam Optimizator" },
]
const criterions = [
  { value: "BCELoss", label: "Binarna unakrsna entropija" },
  { value: "HingeEmbeddingLoss", label: "Gubitak zglobnice" },
]

const TrainFrom = ({ onChange, handleSubmit, onCancel, disabled }: Props) => {
  return (
    <form className="form">
      <h3>Unesite podatke za treniranje modela</h3>
      <Stack gap={3}>
        <TextField
          label="Broj iteracija"
          type="number"
          name="max_iter"
          onChange={onChange}
          InputProps={{ inputProps: { min: 0 } }}
          required
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Funkcija gubitka</InputLabel>
          <Select
            label="Criterion"
            name="criterion"
            onChange={onChange}
            required
          >
            {criterions.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Optimizator</InputLabel>
          <Select
            label="Optimizator"
            name="optimizer"
            onChange={onChange}
            required
          >
            {optimizers.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Stopa učenja"
          type="number"
          name="learning_rate"
          onChange={onChange}
          InputProps={{ inputProps: { min: 0 } }}
          required
        />
      </Stack>
      <Box className="actions">
        <Button onClick={handleSubmit} disabled={disabled}>
          Treniraj
        </Button>
        <Button onClick={onCancel} color="error">
          Odustani
        </Button>
      </Box>
    </form>
  )
}

export default TrainFrom
