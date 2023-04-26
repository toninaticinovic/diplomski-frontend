export class FetchProxy {
  private readonly SERVER_BASE_URL = "http://127.0.0.1:5000"

  private static instance: FetchProxy

  private constructor() {}

  public static getInstance(): FetchProxy {
    if (!FetchProxy.instance) {
      FetchProxy.instance = new FetchProxy()
    }

    return FetchProxy.instance
  }

  private async fetch(pathname: string, options?: RequestInit) {
    const response = await fetch(`${this.SERVER_BASE_URL}${pathname}`, {
      ...options,
    })

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    return await response.json()
  }

  async get(pathname: string) {
    return await this.fetch(pathname)
  }

  async post(pathname: string, dto: any) {
    return await this.fetch(pathname, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    })
  }
}
