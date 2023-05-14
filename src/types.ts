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
