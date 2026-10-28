export type UploadKind = "tour" | "destination" | "blog" | "gallery" | "admin" | "layover";

export interface SaveResult {
  storedPath: string;
  url: string;
}

export interface StorageProvider {
  save(
    file: { buffer: Buffer; originalname: string; mimetype?: string },
    kind: UploadKind,
  ): Promise<SaveResult>;
  delete(storedPath: string): Promise<void>;
  getUrl(storedPath: string): string;
}
