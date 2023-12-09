export const stringToColor = function (str: string): string {
  let hash = 0;
  for (var j = 0; j < str.length; j++) {
    hash = str.charCodeAt(j) + ((hash << 5) - hash);
  }
  let color = '#';
  for (var i = 0; i < 3; i++) {
    const value = (hash >> (i * 2.5)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};
