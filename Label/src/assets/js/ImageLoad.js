/*
 * @Author: fengyang 
 * @Date: 2018-10-24 11:04:30 
 * @Last Modified by: fengyang
 * @Last Modified time: 2018-10-26 10:25:27
 */

//加载图像 自适应
export function imageLoad(cv, img, files, scale, paddingTop, paddingLeft, index) {
  const CTX = cv.getContext("2d");
  img.src = files[index];
  console.log(img.width)
  img.onLoad = function () {
    let wScale = cv.width / img.width;
    let hScale = cv.height / img.height;
    scale = getImgScale(img, cv, wScale, hScale);
    paddingTop = (cv.height - img.height * scale) / 2;
    paddingLeft = (cv.width - img.width * scale) / 2;
    CTX.clearRect(0, 0, cv.width, cv.height);
    CTX.drawImage(img, paddingLeft, paddingTop, img_width * scale, img_height * scale);
  }
}
//自适应比例获取
export function getImgScale(img, cv, wScale, hScale) {
  let scale = 1;
  if ((img.width > cv.width) && (img.height > cv.height)) {
    //取比例较小
    scale = wScale <= hScale ? wScale : hScale;
  }
  else if ((img.width >= cv.width) && (img.height <= cv.height)) {
    scale = wScale;
  }
  else if ((img.width <= cv.width) && (img.height >= cv.height)) {
    scale = hScale;
  }
  else if ((img.width < cv.width) && (img.height < cv.height)){
    scale = 1;
  }
  return scale;
}
