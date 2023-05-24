export type DataPoint = {
  x1: number
  x2: number
  color: number
}

export type FormValues = {
  max_iter: string
  optimizer: "" | "Adam" | "SGD"
  criterion: "" | "BSELoss" | "HingeEmbeddingLoss"
  learning_rate: string
}

export type LineParams = { w1: number; w2: number; b: number }
export type LossParams = { loss: number; epoch: number }

export type TestResult = {
  confusion_matrix_test: number[][]
  confusion_matrix_train: number[][]
  accuracy_test: number
  accuracy_train: number
  f1_score_test: number
  f1_score_train: number
}

export type StatisticalAnalysisResult = {
  column: string
  max: number
  min: number
  null: number
  std: number
  unique: number
  is_numerical: boolean
  mean: number
  median: number
}

export type BoxPlotResult = {
  x: string
  y: number[]
}

export type HistogramResult = {
  column: string
  x: number[]
  y: number[]
}

export type DatasetObject = {
  [key: string]: number | undefined
}
