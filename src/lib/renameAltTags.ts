export default function renameAltTags(src: string) {
  if (src) {
    return src.replace(/^.*\/([^/]+)\.[^/.]+$/, "$1");
  }
  return src;
}
