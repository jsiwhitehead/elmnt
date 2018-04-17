export default async function googleUploader(
  { bucket, accessId, serverUrl },
  { maxKb, uploadIndex },
  fileName,
) {
  const { uploadId, policy, signature } = await (await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uploadIndex,
      bucketId: bucket,
      maxSize: (maxKb || 500) * 1000,
    }),
  })).json();
  return {
    url: `https://storage.googleapis.com/${bucket}`,
    data: {
      key: uploadId,
      'Content-Disposition': fileName
        ? `inline; filename=${fileName}`
        : 'inline',
      GoogleAccessId: accessId,
      success_action_redirect: `${serverUrl}/${uploadIndex}`,
      policy,
      signature,
    },
    fileId: uploadId ? `${bucket}/${uploadId}` : null,
  };
}
