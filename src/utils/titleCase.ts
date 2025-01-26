/**
 * 주어진 문자열을 Title Case로 변환합니다.
 * - 각 단어의 첫 글자를 대문자로 변환합니다.
 * - 밑줄(`_`)은 공백으로 대체합니다.
 *
 * @param {string} str - 변환할 문자열.
 * @returns {string} - 변환된 Title Case 문자열.
 *  "hello_world"를 "Hello World"로 변환합니다.
 *
 */

export default function titleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, (L) => L.toUpperCase())
    .replace(/-|_/g, " ");
}
