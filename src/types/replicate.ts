export interface ReplicateInput {
  text: string;
  embedding_scale: number;
}

export interface TTSResponse {
  audioUrl?: string;
  error?: string;
}
