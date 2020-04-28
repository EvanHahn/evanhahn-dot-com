import * as path from "path";

export function getDateFromPath(fileAbsolutePath) {
  const basename = path.basename(fileAbsolutePath);

  if (!/^2[0-9]{3}-[01][0-9]-[0-3][0-9]-/.test(basename)) {
    return null;
  }

  const date = new Date(basename.substr(0, 10));
  if (Number.isNaN(date.valueOf())) {
    return null;
  }

  return date;
}
