export default function titleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, (L) => L.toUpperCase())
    .replace(/_/g, " ");
}
