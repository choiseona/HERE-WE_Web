import { privateClient } from '@/shared/api/config';
import { formatImageSource } from '@/shared/helper/formatImageSource';
import { FileType } from '@/shared/types/api';

export interface PostCrewFileRequest {
  crewId: number;
  files: File[];
}

export const postCrewFile = async ({ crewId, files }: PostCrewFileRequest): Promise<FileType> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const { data: response } = await privateClient.post(`/file/${crewId}`, formData, {
    params: { type: 'crew' },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { fileId, source, fileEnv } = response.data;

  return {
    fileId: fileId,
    source: formatImageSource(fileEnv, source),
    fileEnv: fileEnv,
  };
};
