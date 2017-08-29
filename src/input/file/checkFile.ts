const fileTypeExts = {
  pdf: ['pdf'],
  image: ['jpg', 'jpeg', 'png'],
  pdfImage: ['pdf', 'jpg', 'jpeg', 'png'],
};

const fileTypeAlerts = {
  pdf: 'Please choose a pdf document',
  image: 'Please choose an image file',
  pdfImage: 'Please choose a pdf document or image file',
};

export default function checkFile(inputFiles, value, maxKb, fileType) {
  if (
    (window as any).FileReader &&
    inputFiles &&
    inputFiles[0] &&
    inputFiles[0].size > (maxKb || 500) * 1000
  ) {
    alert(`The max file size is ${(maxKb || 500) / 1000}MB, please try again.`);
    return false;
  }

  const ext = value
    .split('.')
    .pop()
    .toLowerCase();
  if (fileTypeExts[fileType] && !fileTypeExts[fileType].includes(ext)) {
    alert(fileTypeAlerts[fileType]);
    return false;
  }

  return true;
}
