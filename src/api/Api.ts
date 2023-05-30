import { DataPoint, DatasetObject, LatestParams } from "../types"
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
    testData: DataPoint[] | DatasetObject[],
    trainData: DataPoint[] | DatasetObject[],
    latestParams: LatestParams,
    dataset?: string
  ) {
    const result = await this.fetchProxy.post(
      "/classification/generated/test",
      {
        test_data: testData,
        train_data: trainData,
        latest_params: latestParams,
        dataset: dataset,
      }
    )

    return result
  }

  async predictGeneratedDataClassification(
    latestParams: LatestParams,
    x1: number,
    x2: number
  ) {
    const result = await this.fetchProxy.post(
      "/classification/generated/predict",
      {
        latest_params: latestParams,
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

  async getClassificationDatasetSets(dataset: string, train_size: string) {
    console.log("here")
    const result = await this.fetchProxy.post("/classification/dataset/sets", {
      dataset,
      train_size,
    })

    return result
  }
}
