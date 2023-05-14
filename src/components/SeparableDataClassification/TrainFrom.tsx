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
import { criterions, optimizers } from "../../constants"

type Props = {
  onChange: (e: any) => void
  handleSubmit: () => void
  onCancel: () => void
  disabled: boolean
}

const TrainFrom = ({ onChange, handleSubmit, onCancel, disabled }: Props) => {
  return (
    <form className="form">
      <Box component="h3" sx={{ color: "primary.dark" }}>
        Unesite podatke za treniranje modela
      </Box>
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
          label="Stopa učenja (između 0.1 i 1.0)"
          type="number"
          name="learning_rate"
          onChange={onChange}
          InputProps={{ inputProps: { min: 0.1, max: 1.0 } }}
          required
        />
      </Stack>
      <Box className="actions">
        <Button onClick={onCancel} color="error">
          Odustani
        </Button>
        <Button onClick={handleSubmit} disabled={disabled}>
          Treniraj
        </Button>
      </Box>
    </form>
  )
}

export default TrainFrom
