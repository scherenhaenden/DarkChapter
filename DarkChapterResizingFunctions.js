
function ResizeFactory(_Image,DownSampling)
{
  //variableDynamic
  var CanvasSwap = document.createElement('canvas');
  CanvasSwap.width = _Image.width*DownSampling;
  CanvasSwap.height = _Image.height*DownSampling;
  var ContextSwap = CanvasSwap.getContext("2d");
  ContextSwap.drawImage(_Image, 0, 0, _Image.width*DownSampling, _Image.height*DownSampling);
  return CanvasSwap;
}

function GetDownSampling(ImageSizeMaxVariable)
{
  return 1/ImageSizeMaxVariable.DiffTimes;
}

function ResizePicture(MinDownSamplingOnOneStep,Canvas,ImageSizeMaxVariable,MaxUpFileImgeSize)
{
  var _ImgSizeMax=new ImageSizeMax(Canvas,MaxUpFileImgeSize);
  var quality=GetDownSampling(_ImgSizeMax);
  while (quality<1)
  {
    if(quality<0.5)
    {
      quality=0.5;
    }
    Canvas=ResizeFactory(Canvas,quality);
    _ImgSizeMax=new ImageSizeMax(Canvas,MaxUpFileImgeSize);
    quality=GetDownSampling(_ImgSizeMax);

    if(quality>=1)
    {
      break;
    }
  }
  return Canvas;
}
