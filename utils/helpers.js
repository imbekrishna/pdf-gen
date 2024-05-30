import { fileURLToPath } from "url";
import path from "path";

function getBasepathTo(directory) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const basePath = path.resolve(__dirname, "..", directory);

  return basePath;
}

export { getBasepathTo };
