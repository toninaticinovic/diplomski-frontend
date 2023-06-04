import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import { criterionsRegression, optimizers } from "../../constants"

type Props = {
  onChange: (e: any) => void
  handleSubmit: () => void
  onCancel: () => void
  disabled: boolean
  loading: boolean
  dimension: number
}

const TrainFrom = ({
  onChange,
  handleSubmit,
  onCancel,
  disabled,
  loading,
  dimension,
}: Props) => {
  return (
    <form className="form">
      <Box component="h3" sx={{ color: "primary.dark" }}>
        Unesite podatke za treniranje modela
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {dimension > 2 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {`Ulazni podaci su ${dimension}-d dimenzije, stoga će umjesto animacije treniranja
                biti prikazan graf funkcije gubitka kroz iteracije na skupu za treniranje!`}
            </Alert>
          )}
          <Alert severity="info" sx={{ mb: 2 }}>
            Pri svakom pokretanju treniranja modela, stvara se nova instanca
            modela, s nasumično dodijeljenim težinama.
          </Alert>
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
                {criterionsRegression.map((option) => (
                  <MenuItem value={option.value} key={option.value}>
                    {option.label}
                  </MenuItem>
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
                  <MenuItem value={option.value} key={option.value}>
                    {option.label}
                  </MenuItem>
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
        </>
      )}
    </form>
  )
}

export default TrainFrom
