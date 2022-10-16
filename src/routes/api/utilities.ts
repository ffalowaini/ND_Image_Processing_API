import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function handelImageProccessing(
  fileName: string,
  width: number,
  height: number
): { code: number; url: string } | undefined {
  const thumbilURL = path.join(
    __dirname,
    '../../../assets/images/thumbnail/',
    `${fileName}${height}_${width}.jpg`
  );
  const fullURL = path.join(
    __dirname,
    '../../../assets/images/full/',
    `${fileName}.jpg`
  );
  if (fs.existsSync(thumbilURL)) {
    return { code: 200, url: thumbilURL };
  } else {
    sharp(fullURL)
      .resize(Number(width), Number(height))
      .toFile(thumbilURL, () => {
        return { code: 200, url: thumbilURL };
      });
  }
}

export default handelImageProccessing;
