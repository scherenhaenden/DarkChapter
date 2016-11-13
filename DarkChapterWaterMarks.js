var imgWater = new Image();
var CanimgWater;
  imgWater.crossOrigin = "anonymous";
imgWater.onload = function ()
{
  CanimgWater = document.createElement('canvas');
  CanimgWater.width = imgWater.width;
  CanimgWater.height = imgWater.height;
  var ContextSwap = CanimgWater.getContext("2d");
  ContextSwap.drawImage(imgWater, 0, 0, imgWater.width, image.height);
}
imgWater.src =  SourceOfWaterMark;


function WaterMarkPicture(CanvasToBeWaterMarked, PercentSizeOfWaterMark, ImageWaterMark)
{
  var $CanvasWtSmall=CanvasToBeWaterMarked;
  var ctxWtSmall = $CanvasWtSmall.getContext("2d");
  var canvasWaterS = document.createElement('canvas');
  canvasWaterS.width = ImageWaterMark.width;
  canvasWaterS.height = ImageWaterMark.height;
  var ctxWtS = canvasWaterS.getContext("2d");
  var DownSamplingSmall=(($CanvasWtSmall.width/ImageWaterMark.width)*(0.2));
/*var toWidth=(ImageWaterMark.width*0.2);
  var toHeight=(ImageWaterMark.height*(toWidth/ImageWaterMark.width));*/

 ctxWtS.drawImage(ImageWaterMark, 0, 0,ImageWaterMark.width, ImageWaterMark.height);
 var $ScanvasWaterS=ResizeFactory(canvasWaterS,DownSamplingSmall);

 var toWidth=$ScanvasWaterS.width;
 var toHeight=$ScanvasWaterS.height;
  ctxWtSmall.drawImage($ScanvasWaterS,($CanvasWtSmall.width-toWidth), ($CanvasWtSmall.height-toHeight),toWidth, toHeight);

  return $CanvasWtSmall;



}
