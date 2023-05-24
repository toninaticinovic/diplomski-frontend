import { DataPoint, DatasetObject, LineParams } from "../types"
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

  async testGeneratedDataClassification(
    testData: DataPoint[],
    trainData: DataPoint[],
    lineParams: LineParams[]
  ) {
    const result = await this.fetchProxy.post(
      "/classification/generated/test",
      {
        test_data: testData,
        train_data: trainData,
        line_params: lineParams,
      }
    )

    return result
  }

  async predictGeneratedDataClassification(
    lineParams: LineParams[],
    x1: number,
    x2: number
  ) {
    const result = await this.fetchProxy.post(
      "/classification/generated/predict",
      {
        line_params: lineParams,
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

  async getClassificationDatasetSets(dataset: string, trainSize: string) {
    const result = await this.fetchProxy.post("/classification/dataset/sets", {
      dataset,
      train_size: trainSize,
    })

    return result
  }
}
