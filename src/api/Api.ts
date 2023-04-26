import { DataPoint } from "../types"
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

  async trainSeparableDataClassification(
    data: DataPoint[],
    max_iter: number,
    learning_rate: number,
    optimizer: "" | "SGD" | "Adam",
    criterion: "" | "BSELoss" | "HingeEmbeddingLoss"
  ) {
    console.log(optimizer, criterion)
    const result = await this.fetchProxy.post(
      "/classification/separable_data/train",
      {
        data,
        max_iter,
        learning_rate,
        optimizer,
        criterion,
      }
    )

    console.log(result)
    return result
  }
}
