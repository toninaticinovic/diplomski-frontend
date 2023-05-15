import { DataPoint, LineParams } from "../types"
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
    classes: number,
    train_size: number
  ) {
    const data = await this.fetchProxy.post("/classification/separable_data", {
      n_samples,
      classes,
      train_size,
    })

    return data
  }

  async generateNonSeparableDataClassification(
    n_samples: number,
    classes: number,
    train_size: number
  ) {
    const data = await this.fetchProxy.post("/classification/non_separable_data", {
      n_samples,
      classes,
      train_size,
    })

    console.log(data)

    return data
  }

  async trainGeneratedDataClassification(
    data: DataPoint[],
    max_iter: number,
    learning_rate: number,
    optimizer: "" | "SGD" | "Adam",
    criterion: "" | "BSELoss" | "HingeEmbeddingLoss"
  ) {
    const result = await this.fetchProxy.post(
      "/classification/generated/train",
      {
        data,
        max_iter,
        learning_rate,
        optimizer,
        criterion,
      }
    )

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
}
