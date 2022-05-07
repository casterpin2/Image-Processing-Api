import express from 'express';
import handleImg from '../../handle/handleImg';
import path from 'path';
import fs from 'fs';

const pathFolderResize = path.resolve(__dirname, `../../../assets/img-resize`);
const pathFolderImage = path.resolve(__dirname, `../../../assets/img`);
const imgController = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
imgController.get('/:name', async (req: express.Request, res: express.Response): Promise<void> => {
  const nameImg = req.params.name;
  const widthImg = req.query.width as string;
  const heightImg = req.query.height as string;
  const errorImgNotFound = handleImg.existFileOrDirectory(`${pathFolderImage}/${nameImg}.jpg`);

  // Check if the image file exists or not
  if (errorImgNotFound) {
    res.status(404).send(`Image ${errorImgNotFound}`);
    return;
  }
  // check width of image not empty and is a positive integer

  // if width and height have no value then get original image or both value will resize image
  if (nameImg && !widthImg && !heightImg) {
    res.status(200).sendFile(`${pathFolderImage}/${nameImg}.jpg`);
    return;
  } else {
    const errorCodeWith = handleImg.validatorNumberWidthOrHeight(widthImg);
    const errorCodeHeight = handleImg.validatorNumberWidthOrHeight(heightImg);
    if (errorCodeWith) {
      res.status(400).send(`Width ${errorCodeWith}`);
      return;
    }
    // check height of image not empty and is a positive integer
    if (errorCodeHeight) {
      res.status(400).send(`Height ${errorCodeHeight}`);
      return;
    }
    if (handleImg.existFileOrDirectory(pathFolderResize)) {
      fs.mkdirSync(pathFolderResize);
    }

    const pathFileResize = `${pathFolderResize}/${nameImg}-${widthImg}x${heightImg}.jpg`;
    // Check if the image file exists or not
    if (fs.existsSync(pathFileResize)) {
      res.status(200).sendFile(pathFileResize);
    } else {
      const resizeSuccess = await handleImg.resizeImg(
        `${pathFolderImage}/${nameImg}.jpg`,
        widthImg,
        heightImg,
        pathFileResize
      );
      if (resizeSuccess) {
        res.status(200).sendFile(pathFileResize);
      } else {
        res.status(500).send('Resize Failed');
      }
    }
  }
});

export default imgController;
