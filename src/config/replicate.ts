import Replicate from "replicate";

export const createReplicateClient = (apiToken: string) => {
  return new Replicate({
    auth: apiToken,
  })
}
