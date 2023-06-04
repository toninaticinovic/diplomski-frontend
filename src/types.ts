export type DataPoint = {
  x1: number
  x2: number
  color: number
}

export type FormValuesClassification = {
  max_iter: string
  optimizer: "" | "Adam" | "SGD"
  criterion: "" | "BSELoss" | "HingeEmbeddingLoss"
  learning_rate: string
}

export type FormValuesRegression = {
  max_iter: string
  optimizer: "" | "Adam" | "SGD"
  criterion: "" | "MSELoss" | "L1Loss" | "SmoothL1Loss"
  learning_rate: string
}

export type LineParams = { w1: number; w2: number; b: number }
export type LossParams = { loss: number; epoch: number }
export type LatestParams = { w: number[][]; b: number }

export type TestResultClassification = {
  confusion_matrix_test: number[][]
  confusion_matrix_train: number[][]
  accuracy_test: number
  accuracy_train: number
  f1_score_test: number
  f1_score_train: number
}

export type TestResultRegression = {
  accuracy_test: number
  accuracy_train: number
  r2_score_test: number
  r2_score_train: number
  mse_test: number
  mse_train: number
}

export type DataStats = {
  column: string
  null: number
  unique: number
  is_numerical: boolean
}

export type NumDataStats = {
  column: string
  max: number
  min: number
  mean: number
  median: number
  std: number
}

export type DataSize = {
  count: number
  dimension: number
}

export type HistogramResult = {
  column: string
  x: number[]
  y: number[]
}

export type BoxPlotResult = {
  x: string
  y: number[]
  outliers: number[]
}

export type CountPlotResult = {
  column: string
  x: string[]
  y: number[]
}

export type DatasetObject = {
  [key: string]: number | undefined
}

export type Field = {
  name: string
  type: string
  options?: string[]
}
