import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function  handelImageProccessing(
  fileName: string,
  width: number,
  height: number
): Promise<{code: number, url: string}> {
  return new Promise((resolve, reject) => {
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
      resolve({ code: 200, url: thumbilURL });
    } else {
      sharp(fullURL)
        .resize(Number(width), Number(height))
        .toFile(thumbilURL, () => {
          resolve({ code: 200, url: thumbilURL });
        });
    }
  });
  
}

export default handelImageProccessing;
