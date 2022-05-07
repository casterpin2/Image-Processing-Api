import fs from 'fs';
import sharp from 'sharp';

const errorMessageNotFound = 'not found';
const errorMessageNotEmpty = "can't be empty";
const errorMessageMustBeNumber = 'must be number';
const errorMessagePostitiveNumber = 'must be positive number';

/**
 * Resize image file
 *
 * @param {string} name name of image
 * @param {string} width width of image
 * @param {string} postId height of image
 * @return {boolean} successfully resize the image
 */
const resizeImg = async (
  name: string,
  width: string,
  height: string,
  nameFileResize: string
): Promise<boolean> => {
  try {
    await sharp(name).resize(Number(width), Number(height)).toFile(nameFileResize);
    return true;
  } catch (ex) {
    return false;
  }
};

/**
 * Check exist file or directory
 *
 * @param {string} path path of file or directory
 * @return {string} error code with not exists
 */
const existFileOrDirectory = (path: string): string => {
  if (!fs.existsSync(path)) {
    return errorMessageNotFound;
  }
  return '';
};
/**
 * validator value of height or width
 *
 * @param {string} value value of width or height of image
 * @return {string} error code with not exists
 */
const validatorNumberWidthOrHeight = (value: string): string => {
  if (!value || !value.trim()) {
    return errorMessageNotEmpty;
  }

  if (Number.isNaN(Number(value.trim()))) {
    return errorMessageMustBeNumber;
  }
  if (Number(value.trim()) < 0) {
    return errorMessagePostitiveNumber;
  }
  return '';
};
export default {
  resizeImg,
  existFileOrDirectory,
  validatorNumberWidthOrHeight
};
