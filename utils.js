export function loadImage(src) {
  return new Promise((resovle, reject) => {
    const img = new Image();
    img.onload = () => resovle(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function extToMimeType(ext) {
  switch (ext) {
    case 'webp':
    case 'tiff':
    case 'jpeg':
    case 'png':
    case 'bmp':
    case 'gif':
      return `image/${ext}`;
    case 'jpg':
      return 'image/jpeg';
    case 'svg':
      return 'image/svg+xml';
    case 'tif':
      return 'image/tiff';
    default:
      return null;
  }
}

export function getAuthorTwitterHandle(author) {
  return author.socialLinks
    ?.find(s => s.type === 'Twitter')
    ?.url?.replace('https://twitter.com/', '');
}
