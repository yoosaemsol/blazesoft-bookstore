export const extractTitleAndFormat = (str: string) => {
  if (str && typeof str === 'string' && str.length >= 2) {
    const firstChar = str.charAt(0).toUpperCase();
    const secondChar = str.charAt(1).toLowerCase();
    return `${firstChar}${secondChar}`;
  } else {
    return ''; // 빈 문자열 또는 에러 처리를 원하는 방식으로 수정하세요.
  }
};
