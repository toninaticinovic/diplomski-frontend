import { DataPoint, DatasetObject } from "../types"
import { FetchProxy } from "./FetchProxy"

export class Api {
  private fetchProxy = FetchProxy.getInstance()

  private static instance: Api

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api()
    }

    return Api.instance
  }

  async generateSeparableDataClassification(
    n_samples: number,
    train_size: number
  ) {
    const data = await this.fetchProxy.post("/classification/separable_data", {
      n_samples,
      train_size,
    })

    return data
  }

  async generateNonSeparableDataClassification(
    n_samples: number,
    train_size: number
  ) {
    const data = await this.fetchProxy.post(
      "/classification/non_separable_data",
      {
        n_samples,
        train_size,
      }
    )

    return data
  }

  async trainDataClassification(
    max_iter: number,
    learning_rate: number,
    optimizer: "" | "SGD" | "Adam",
    criterion: "" | "BSELoss" | "HingeEmbeddingLoss",
    data: DataPoint[] | DatasetObject[],
    dataset?: string
  ) {
    const result = await this.fetchProxy.post("/classification/train", {
      data,
      dataset,
      max_iter,
      learning_rate,
      optimizer,
      criterion,
    })

    return result
  }

  async testDataClassification(
    testData: DataPoint[] | DatasetObject[],
    trainData: DataPoint[] | DatasetObject[],
    dataset?: string
  ) {
    const result = await this.fetchProxy.post("/classification/test", {
      test_data: testData,
      train_data: trainData,
      dataset: dataset,
    })

    return result
  }

  async predictGeneratedDataClassification(x1: number, x2: number) {
    const result = await this.fetchProxy.post(
      "/classification/generated/predict",
      {
        x1: x1,
        x2: x2,
      }
    )

    return result
  }

  async getClassificationDatasets() {
    const result = await this.fetchProxy.get("/classification/datasets")

    return result
  }

  async getClassificationDatasetStaticAnalysis(dataset: string) {
    const result = await this.fetchProxy.post(
      "/classification/dataset/statistical-analysis",
      { dataset }
    )

    return result
  }

  async getClassificationDatasetBoxPlot(dataset: string) {
    const result = await this.fetchProxy.post(
      "/classification/dataset/box-plot",
      { dataset }
    )

    return result
  }

  async getClassificationDatasetHistogram(dataset: string) {
    const result = await this.fetchProxy.post(
      "/classification/dataset/histogram",
      { dataset }
    )

    return result
  }

  async getClassificationDatasetCountPlot(dataset: string) {
    const result = await this.fetchProxy.post(
      "/classification/dataset/count-plot",
      {
        dataset,
      }
    )

    return result
  }

  async getClassificationDatasetSets(dataset: string, train_size: string) {
    const result = await this.fetchProxy.post("/classification/dataset/sets", {
      dataset,
      train_size,
    })

    return result
  }

  async getPredictDatasetClassificationFields(dataset: string) {
    const result = await this.fetchProxy.post(
      "/classification/dataset/predict-fields",
      { dataset }
    )

    return result
  }

  async predictDatasetDataClassification(dataset: string, input: string[]) {
    const result = await this.fetchProxy.post(
      "/classification/dataset/predict",
      {
        dataset: dataset,
        input: input,
      }
    )

    return result
  }

  async getRegressionDatasets() {
    const result = await this.fetchProxy.get("/regression/datasets")

    return result
  }

  async getRegressionDatasetStaticAnalysis(dataset: string) {
    const result = await this.fetchProxy.post(
      "/regression/dataset/statistical-analysis",
      { dataset }
    )

    return result
  }

  async getRegressionDatasetBoxPlot(dataset: string) {
    const result = await this.fetchProxy.post("/regression/dataset/box-plot", {
      dataset,
    })

    return result
  }

  async getRegressionDatasetHistogram(dataset: string) {
    const result = await this.fetchProxy.post("/regression/dataset/histogram", {
      dataset,
    })

    return result
  }

  async getRegressionDatasetCountPlot(dataset: string) {
    const result = await this.fetchProxy.post(
      "/regression/dataset/count-plot",
      {
        dataset,
      }
    )

    return result
  }

  async getRegressionDatasetSets(
    dataset: string,
    train_size: string,
    checkbox: boolean
  ) {
    const result = await this.fetchProxy.post("/regression/dataset/sets", {
      dataset,
      train_size,
      checkbox,
    })

    return result
  }

  async trainDataRegression(
    max_iter: number,
    learning_rate: number,
    optimizer: "" | "SGD" | "Adam",
    criterion: "" | "MSELoss" | "L1Loss" | "SmoothL1Loss",
    data: DataPoint[] | DatasetObject[],
    dataset?: string
  ) {
    const result = await this.fetchProxy.post("/regression/train", {
      data,
      dataset,
      max_iter,
      learning_rate,
      optimizer,
      criterion,
    })

    return result
  }

  async testDataRegression(
    testData: DataPoint[] | DatasetObject[],
    trainData: DataPoint[] | DatasetObject[],
    dataset?: string
  ) {
    const result = await this.fetchProxy.post("/regression/test", {
      test_data: testData,
      train_data: trainData,
      dataset: dataset,
    })

    return result
  }

  async getPredictDatasetRegressionFields(dataset: string) {
    const result = await this.fetchProxy.post(
      "/regression/dataset/predict-fields",
      { dataset }
    )

    return result
  }

  async predictDatasetDataRegression(dataset: string, input: string[]) {
    const result = await this.fetchProxy.post("/regression/dataset/predict", {
      dataset: dataset,
      input: input,
    })

    return result
  }
}
