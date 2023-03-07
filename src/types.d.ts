export interface IPost {
  title: string;
  content: string;
  image?: { public_id: string; secure_url: string } | null;
}

export interface IFile {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}
