import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material"
import { Field } from "../types"
import convertToNormalCase from "../utils/convert-to-normal-word"

interface Props {
  fields: Field[]
  onChange: (e: any, name: string) => void
  handleSubmit: () => void
  disabled: boolean
}

const PredictDataForm = ({
  fields,
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
        {fields.map((field) =>
          field.type === "numerical" ? (
            <TextField
              key={field.name}
              label={convertToNormalCase(field.name)}
              type="number"
              fullWidth
              onChange={(e) => onChange(e, field.name)}
              required
            />
          ) : (
            <FormControl key={field.name} fullWidth variant="standard" required>
              <InputLabel>{convertToNormalCase(field.name)}</InputLabel>
              <Select onChange={(e) => onChange(e, field.name)}>
                {field.options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        )}
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
