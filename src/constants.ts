export const optimizers = [
  { value: "SGD", label: "SGD Optimizator" },
  { value: "Adam", label: "Adam Optimizator" },
]

export const criterionsClassification = [
  { value: "BCELoss", label: "Binarna unakrsna entropija" },
  { value: "HingeEmbeddingLoss", label: "Gubitak zglobnice" },
]

export const criterionsRegression = [
  { value: "MSELoss", label: "Korijen srednje kvadratne pogreške" },
  { value: "L1Loss", label: "Srednja apsolutna pogreška (L1 pogreška)" },
  { value: "SmoothL1Loss", label: "Huberova pogreška (Glatka L1 pogreška)" },
]

export const colors = ["red", "blue", "green", "yellow"]
