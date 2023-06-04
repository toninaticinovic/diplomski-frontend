import { VictoryChart, VictoryLine, VictoryAxis } from "victory"
import {
  FormValuesClassification,
  FormValuesRegression,
  LossParams,
} from "../types"
import { Box } from "@mui/material"
import {
  criterionsClassification,
  criterionsRegression,
  optimizers,
} from "../constants"

interface Props {
  lossParams: LossParams[]
  formValues: FormValuesClassification | FormValuesRegression
}

const LossChart = ({ lossParams, formValues }: Props) => {
  const criterions = [...criterionsClassification, ...criterionsRegression]

  return (
    <Box className="loss-chart-container" sx={{ borderColor: "primary.dark" }}>
      <Box
        className="chart-header"
        sx={{ color: "primary.dark" }}
        component="h3"
      >
        GRAF FUNKCIJE GUBITKA NA SKUPU ZA TRENIRANJE
      </Box>
      <VictoryChart width={600} height={400}>
        <VictoryAxis
          label="Epoha"
          style={{
            axisLabel: { padding: 30 },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axisLabel: { padding: 40 },
            tickLabels: { angle: -70, padding: 5 },
          }}
        />

        <VictoryLine
          data={lossParams}
          x="epoch"
          y="loss"
          style={{
            data: { stroke: "blue" },
          }}
        />
      </VictoryChart>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          fontSize: "12px",
          color: "primary.main",
        }}
      >
        <Box>
          {" "}
          Funkcija gubitka:{" "}
          {
            criterions.find(
              (criterion) => criterion.value === formValues.criterion
            )?.label
          }
        </Box>
        <Box>
          {" "}
          Optimizator:{" "}
          {
            optimizers.find(
              (optimizer) => optimizer.value === formValues.optimizer
            )?.label
          }
        </Box>
        <Box>Stopa učenja: {formValues.learning_rate}</Box>
      </Box>
    </Box>
  )
}

export default LossChart
