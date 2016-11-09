
/*
ready block
*/
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
imgWater.src =  "./Firma.png";

$(document).ready(function(){
  SetDropZone();
});

function SetDropZone()
{
    var DragAndDropFilesZone=$("#DragAndDropFilesZone");
    DragAndDropFilesZone.height(200);
    DragAndDropFilesZone.width(1200);
    DragAndDropFilesZone.css('background-color', 'white');
    DragAndDropFilesZone.css('border-style', 'dashed');
    DragAndDropFilesZone.css('border-width', '5px');
    DragAndDropFilesZone.droppable();
    DragAndDropFilesZone.on('dragover', function() {
    		//add hover class when drag over
    		DragAndDropFilesZone.css('background-color', 'blue');
        //DragAndDropFilesZone.addClass( "Darkzone" );
    		return false;
        });

    DragAndDropFilesZone.on('dragleave', function() {
    		//remove hover class when drag out
    		DragAndDropFilesZone.css('background-color', 'red');
        DragAndDropFilesZone.css('border-style', 'dashed');
        DragAndDropFilesZone.css('border-width', '5px');
    		return false;
        });
    DragAndDropFilesZone.on('drop', function(e) {
    		//prevent browser from open the file when drop off
    		e.stopPropagation();
    		e.preventDefault();
        DragAndDropFilesZone.css('background-color', 'white');
        DragAndDropFilesZone.css('border-style', 'dashed');
        DragAndDropFilesZone.css('border-width', '5px');
    		DragAndDropFilesZone.removeClass('hover');

    		//retrieve uploaded files data
    		var files = e.originalEvent.dataTransfer.files;
    		ProcessFiles(files);
                    //test(files);

    		return false;
    	});
    //$("#DragAndDropFilesZone")=DragAndDropFilesZone;
    //$("#DragFilesZone")
}

function ProcessFiles(Files)
{
    if(Files && typeof FileReader !== "undefined")
		{
			//process each files only if browser is supported
      $ImagesTobeEditedArray = [Files.length];
			for(var i=0; i<Files.length; i++)
			{

				readFile(Files[i]);
			}
		} else {

		}
}

var readFile = function(file)
	{
		if( (/image/i).test(file.type) )
		{
			//define FileReader object
			var reader = new FileReader();

			//init reader onload event handlers
			reader.onload = function(e)
			{

				var image = $('<img/>')
				.load(function()
				{
          image.crossOrigin = "anonymous";
					getCanvasImage(this);
          //LoadPreviews();
				})
				.attr('src', e.target.result);
			};

			//begin reader read operation
			reader.readAsDataURL(file);

			$('#err').text('');
		} else {
			//some message for wrong file format
			$('#err').text('*Selected file format not supported!');
		}
	}

/*
ready block
*/


function setpixelated(context){
    context['imageSmoothingEnabled'] = false;       /* standard */
    context['mozImageSmoothingEnabled'] = false;    /* Firefox */
    context['oImageSmoothingEnabled'] = false;      /* Opera */
    context['webkitImageSmoothingEnabled'] = false; /* Safari */
    context['msImageSmoothingEnabled'] = false;     /* IE */
    return;
}

function ResizeFactory(image,quality)
{
  //variableDynamic
  var CanvasSwap = document.createElement('canvas');
  CanvasSwap.width = image.width*quality;
  CanvasSwap.height = image.height*quality;
  var ContextSwap = CanvasSwap.getContext("2d");
  ContextSwap.drawImage(image, 0, 0, image.width*quality, image.height*quality);
  return CanvasSwap;
}
var iID=0;
var $CanvasToBeUploadedSmall;
var $CanvasToBeUploadedBig;
var getCanvasImage = function(image) {
    var MaxUpFileImgeSize=1200;
    var SizePreview=300;
    var quality=0.5;
    var MaxDownresizing=0.5;
    var h = image.width;
    var t = image.height;
    var imageSwap=image;
    var reste=new ImageSizeMax(image,MaxUpFileImgeSize);
    reste.CalculateSize();

    quality=1/reste.DiffTimes;
    var canvas6;
    var canvas6 = document.createElement('canvas');
    canvas6.width = image.width;
    canvas6.height = image.height;
    var ctx6 = canvas6.getContext("2d");
    ctx6.drawImage(image, 0, 0, image.width, image.height);
    while (quality<1)
    {
      if(quality<0.5)
      {
        quality=0.5;
      }
      canvas6=ResizeFactory(canvas6,quality);
      var reste2=new ImageSizeMax(canvas6,MaxUpFileImgeSize);
      reste2.CalculateSize();
      quality=1/reste2.DiffTimes;

      if((canvas6.width>1200)||(canvas6.height>1200))
      {

        quality=1/reste2.DiffTimes;
      }
      else
      {
        break;
      }
    }

    var canvas7 = document.createElement('canvas');
    canvas7.width = canvas6.width;
    canvas7.height = canvas6.height;
    var ctx7 = canvas7.getContext("2d");
    ctx7.drawImage(image, 0, 0, canvas6.width, canvas6.height);
    reste2=new ImageSizeMax(canvas7,SizePreview);
    reste2.CalculateSize();
    quality=1/reste2.DiffTimes;
    while (quality<1)
    {
      if(quality<0.5)
      {
        quality=0.5;
      }
      canvas7=ResizeFactory(canvas7,quality);
      var reste2=new ImageSizeMax(canvas7,SizePreview);
      reste2.CalculateSize();
      quality=1/reste2.DiffTimes;

      if(quality<1)
      {
        quality=1/reste2.DiffTimes;
      }
      else
      {
        break;
      }

    }



    $CanvasToBeUploadedSmall=canvas7;
    var IdOfCurrentObjectOnarray=$ImagesTobeEditedArray.length-1;
    //var hhh=isNaN(IdOfCurrentObjectOnarray);
    if(isNaN(IdOfCurrentObjectOnarray))
    {
      iID=0;
    }
    else
    {
      if(iID<IdOfCurrentObjectOnarray)
      {
        iID=IdOfCurrentObjectOnarray;
      }

    }
    $CanvasToBeUploadedBig=canvas6;
    var ImageSwapEditing= new ImagesTobeEdited(image);
    ImageSwapEditing.CreateCanvasCouple(canvas7,canvas6);
    ImageSwapEditing.CreateTempcanvas(canvas7,canvas6);
    ImageSwapEditing.SetImageId(iID);
    $ImagesTobeEditedArray[iID]=ImageSwapEditing;



      var $CanvasWtSmall=$ImagesTobeEditedArray[iID].GetSmallCanvas();
      var ctxWtSmall = $CanvasWtSmall.getContext("2d");



      var canvasWaterS = document.createElement('canvas');
      canvasWaterS.width = imgWater.width;
      canvasWaterS.height = imgWater.height;
      var ctxWtS = canvasWaterS.getContext("2d");

      var DownSamplingSmall=(($CanvasWtSmall.width/imgWater.width)*(0.2));
    /*var toWidth=(imgWater.width*0.2);
      var toHeight=(imgWater.height*(toWidth/imgWater.width));*/

     ctxWtS.drawImage(imgWater, 0, 0,imgWater.width, imgWater.height);
     var $ScanvasWaterS=ResizeFactory(canvasWaterS,DownSamplingSmall);

     var toWidth=$ScanvasWaterS.width;
     var toHeight=$ScanvasWaterS.height;

      ctxWtSmall.drawImage($ScanvasWaterS,($CanvasWtSmall.width-toWidth), ($CanvasWtSmall.height-toHeight),toWidth, toHeight);


      var $CanvasWtBig=$ImagesTobeEditedArray[iID].GetBigCanvas();
      var ctxWtBig = $CanvasWtBig.getContext("2d");

      var canvasWaterB = document.createElement('canvas');
      canvasWaterB.width = imgWater.width;
      canvasWaterB.height = imgWater.height;
      var ctxWtB = canvasWaterB.getContext("2d");


      var DownSamplingBig=(($CanvasWtBig.width/imgWater.width)*(0.2));
      var $SCanvasWtBig=ResizeFactory(canvasWaterS,DownSamplingBig);
      var toWidth=$SCanvasWtBig.width;
      var toHeight=$SCanvasWtBig.height;
      ctxWtBig.drawImage($SCanvasWtBig, ($CanvasWtBig.width-toWidth), ($CanvasWtBig.height-toHeight),toWidth, toHeight);

      $ImagesTobeEditedArray[iID].CreateTempcanvas($CanvasWtSmall,$CanvasWtBig);



       createPreviews(iID);
       iID=(iID+1);


		return canvas6.toDataURL("image/jpeg");
	}




function LoadPreviews()
{
  for (var i = 0; i < $ImagesTobeEditedArray.lenght; i++)
  {
    createPreviews(i);
  }
}


function createPreviews(id)
{
  var SrcSmall = $ImagesTobeEditedArray[id].GetTempSmallCanvas().toDataURL("image/jpeg");
  var SrcBig = $ImagesTobeEditedArray[id].GetTempBigCanvas().toDataURL("image/jpeg");
  var head = 'data:image/jpeg;base64,';
  var imgFileSize = Math.round((SrcBig.length - head.length)*3/4) ;
  var IdForImg="ImgPreview"+id;
  var IdOfDiv="div"+id;
  var IdOfImgPreview="editImgPreview"+id;

  var ImageHTML=ImageHTMLForPreview(IdForImg,SrcSmall,imgFileSize);
  var ImageHTMLBig=ImageHTMLForPreview(IdOfImgPreview,SrcBig,imgFileSize);
  var DivHTML=DivHTMLForPreview(IdOfDiv,ImageHTML);
  $('#'+IdOfDiv).remove('');
  $("#ShowUpPics").append(DivHTML);
  CreateDialogs(IdForImg,DivHTML,ImageHTMLBig,SrcBig);

}
function REcreatePreviews(id)
{
  var SrcSmall = $ImagesTobeEditedArray[id].GetTempSmallCanvas().toDataURL("image/jpeg");
  var SrcBig = $ImagesTobeEditedArray[id].GetTempBigCanvas().toDataURL("image/jpeg");
  var head = 'data:image/jpeg;base64,';
  var imgFileSize = Math.round((SrcBig.length - head.length)*3/4) ;
  var IdForImg="ImgPreview"+id;
  var IdOfDiv="div"+id;
  var IdOfImgPreview="editImgPreview"+id;

  var ImageHTML=ImageHTMLForPreview(IdForImg,SrcSmall,imgFileSize);
  var ImageHTMLBig=ImageHTMLForPreview(IdOfImgPreview,SrcBig,imgFileSize);
  var DivHTML=DivHTMLForPreview(IdOfDiv,ImageHTML);

  $('#'+IdOfDiv).html('');
  $('#'+IdOfDiv).append(ImageHTML);
  CreateDialogs(IdForImg,DivHTML,ImageHTMLBig,SrcBig);

}



function ImageHTMLForPreview(IdForImg,src,imgFileSize)
{
    var imaginside="<img id='"+IdForImg+"' src='"+src+"'></img> <br><p>"+imgFileSize+"</p>";
    return imaginside;
}

function DivHTMLForPreview(IdOfDiv, HTMLOfImage)
{

  var htmlToAppend="<div id='div"+IdOfDiv+"' class='Previews'>"+HTMLOfImage+"</div>";
  return htmlToAppend;
}

function app(canvas7, canvas6,image,iID)
{
  var drul = $ImagesTobeEditedArray[iID].GetSmallCanvas().toDataURL("image/jpeg");
  var drul2 = $ImagesTobeEditedArray[iID].GetBigCanvas().toDataURL("image/jpeg");

  var head = 'data:image/jpeg;base64,';
  //var drul=canvas.toDataURL("image/jpeg");
  var imgFileSize = Math.round((drul.length - head.length)*3/4) ;

  var CompleteId="img"+iID;
  var imaginside="<img id='"+CompleteId+"' src='"+drul+"'></img> <br><p>"+imgFileSize+"</p>";
  var imaginside2="<img id='edit"+CompleteId+"' src='"+drul2+"'></img> <br><p>"+imgFileSize+"</p>";
  var htmlToAppend="<div id='div"+CompleteId+"' class='Previews'>"+imaginside+"</div>";

  $("#ShowUpPics").append(htmlToAppend);
  CreateDialogs(CompleteId,htmlToAppend,imaginside2,drul2);



}
function appReplace(drul, drul2, idtobereplaced)
{
  var head = 'data:image/jpeg;base64,';
  //var drul=canvas.toDataURL("image/jpeg");
  var imgFileSize = Math.round((drul.length - head.length)*3/4) ;

  var CompleteId="img"+idtobereplaced;
  var imaginside="<img id='"+CompleteId+"' src='"+drul+"'></img> <br><p>"+imgFileSize+"</p>";
  var imaginside2="<img id='edit"+CompleteId+"' src='"+drul2+"'></img> <br><p>"+imgFileSize+"</p>";
  var htmlToAppend="<div id='div"+CompleteId+"' class='Previews'>"+imaginside+"</div>";

  $('#div'+CompleteId).html('');
  $('#div'+CompleteId).append(imaginside);
//$("#ShowUpPics").replace(htmlToAppend);
  CreateDialogs(CompleteId,htmlToAppend,imaginside2,drul2);

  //iID=(iID+1);

}



function CreateDialogs(id, htmlToAppend, imaginside2, drul)
{
  $(function() {
    $("#"+id ).click(function(){

var element=$("#"+id ).parent().attr('id');
var $Cloned = $("#"+element).clone();
var html = $("#"+element).html();

        var forid="edit"+id.trim();

        var $rimaginside2=imaginside2+'<br> Sharpen: <input type="range" id="mix" min="-200" max="200" value="0" oninput="update(\''+forid+'\')">';
        //imaginside2='';
          //imaginside2=imaginside2+'<br> Sharpen: <input type="range" id="mix" min="-100" max="100" value="0" oninput="update(\''+forid+'\')">';
        /*if (imaginside2.indexOf("title") ==-1) {
var $rimaginside2=imaginside2+'<br> Sharpen: <input type="range" id="mix" min="-100" max="100" value="0" oninput="update(\''+forid+'\')">';
}*/
//canvasSharp=drul;
var $valdrul=drul;
createCanvasForDialog($valdrul);
$(".olddialog").remove();
      //var vald=  $('<div id=dialog'+forid+'></div>').dialog({
        $('<div id="Editdialog" class="olddialog"></div>').dialog({
          dialogClass: 'FotoEditingDialog',
          position: [($(window).width() / 2) - (400 / 2), 150] ,
          modal: true,
          title: "Edit Picture",
          open: function() {
          var markup = 'Hello World';
          $(this).html($rimaginside2);
            },
          buttons: {
            Save: function() {


              var $SwapId=id.replace("ImgPreview","");
              var canvas = document.createElement('canvas');
              canvas.width = $ImagesTobeEditedArray[$SwapId].GetTempSmallCanvas().width;
              canvas.height = $ImagesTobeEditedArray[$SwapId].GetTempSmallCanvas().height;
              var ctxValsmall = canvas.getContext("2d");
              var ctxTempValsmall = $ImagesTobeEditedArray[$SwapId].GetTempSmallCanvas().getContext("2d");

            ctxValsmall=sharpen(ctxTempValsmall,canvas.width,canvas.height, parseInt($ans1Value) * 0.01);
            $ans1Value=NaN;
            $ImagesTobeEditedArray[$SwapId].SetTempSmallCanvas(canvas);
            //appReplace(  $ImagesTobeEditedArray[$SwapId].GetTempSmallCanvas().toDataURL("image/jpeg"), $ImagesTobeEditedArray[$SwapId].GetTempBigCanvas,$SwapId);
            REcreatePreviews($SwapId);

            $("#Editdialog" ).dialog( "close" );
            $("#Editdialog").dialog('destroy').remove();
            $("#Editdialog").empty();
            $("#Editdialog").remove();


            }
          }
        });
});
});
}
var $ans1Value;

function createCanvasForDialog(drul)
{
  var canvas = document.createElement('canvas');

var img = new Image();
img.onload = function() {

  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  $canvasSharp=canvas;
};
img.src = drul;
}

function Resize(Res)
{
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      img = new Image();
      img.onload = function () {

      canvas.height = canvas.width * (img.height / img.width);

      /// step 1
      var oc = document.createElement('canvas'),
      octx = oc.getContext('2d');
      /// step 2
      var reste=new ImageSizeMax(img);
      reste.CalculateSize();
      oc.width = reste.width;
      oc.height = reste.height;
      octx.drawImage(img, 0, 0, oc.width, oc.height);
      var canvas2 = document.createElement('canvas');
      canvas2.width = oc.width ;
      canvas2.height = oc.height;
      var ctx2 = canvas2.getContext("2d");
      ctx2.drawImage(oc, 0, 0, oc.width, oc.height);
      //octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
      //ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,  0, 0, canvas.width, canvas.height);
      var dataUrl = canvas2.toDataURL("image/jpeg");
     $("#ShowUpPics").append("Old image: <img src='"+dataUrl+"'></img>");
   }
   img.src = Res;
   //var jpegUrl = canvas.toDataURL("image/jpeg");
}

var ImageSizeMax = (function () {
    function ImageSizeMax(img, MaxSizeImg) {
        this.imge = img;
        this.MaxSize = MaxSizeImg;
    }
    ImageSizeMax.prototype.CalculateSize = function () {
        this.imge.height;
        this.imge.width;
        if ((this.imge.height > this.MaxSize) || (this.imge.width > this.MaxSize)) {
            if ((this.imge.height > this.imge.width) || (this.imge.height == this.imge.width)) {
                this.DiffTimes = this.imge.height / this.MaxSize;
            }
            else {
                this.DiffTimes = this.imge.width / this.MaxSize;
            }
            this.height = this.imge.height / this.DiffTimes;
            this.width = this.imge.width / this.DiffTimes;
        }
        else {
            this.height = this.imge.height;
            this.width = this.imge.width;
            this.DiffTimes=1;
        }
    };
    return ImageSizeMax;
}());
var $canvasSharp;
var $canvasSharpSwap;
function update(id)
{

  var str = "editImgPreview";
  var IdOfArray = id.replace(str, "");

  var canvas = document.getElementById(id);


  var canvas7 = document.createElement('canvas');
  canvas7.width = $ImagesTobeEditedArray[IdOfArray].GetBigCanvas().width;
  canvas7.height = $ImagesTobeEditedArray[IdOfArray].GetBigCanvas().height;
  var ctx7 = canvas7.getContext("2d");

    ctx7.drawImage($ImagesTobeEditedArray[IdOfArray].GetBigCanvas(), 0, 0,$ImagesTobeEditedArray[IdOfArray].GetBigCanvas().width,$ImagesTobeEditedArray[IdOfArray].GetBigCanvas().height);
    var ans1 = document.getElementById('mix');
    var vag=mix;
    $ans1Value=ans1.value;
    ctx7= sharpen(ctx7, $ImagesTobeEditedArray[IdOfArray].GetBigCanvas().width, $ImagesTobeEditedArray[IdOfArray].GetBigCanvas().height, parseInt($ans1Value) * 0.01);
    //app(canvas7.toDataURL("image/jpeg"));
     //$canvasSharpSwap=canvas7;
     $ImagesTobeEditedArray[IdOfArray].SetTempBigCanvas(canvas7);
    canvas.src=canvas7.toDataURL("image/jpeg");
}

function sharpen(ctx, w, h, mix) {

    var weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = ctx.createImageData(w, h),
        dstBuff = dstData.data,
        srcBuff = ctx.getImageData(0, 0, w, h).data,
        y = h;

    while (y--) {

        x = w;

        while (x--) {

            var sy = y,
                sx = x,
                dstOff = (y * w + x) * 4,
                r = 0,
                g = 0,
                b = 0,
                a = 0;

            for (var cy = 0; cy < katet; cy++) {
                for (var cx = 0; cx < katet; cx++) {

                    var scy = sy + cy - half;
                    var scx = sx + cx - half;

                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {

                        var srcOff = (scy * w + scx) * 4;
                        var wt = weights[cy * katet + cx];

                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix)
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    ctx.putImageData(dstData, 0, 0);
    return ctx;

}




var ImagesTobeEdited = (function () {
    function ImagesTobeEdited(imge) {
        this.ImageType = imge;
    }
    ImagesTobeEdited.prototype.SetImageId = function (id) {
        this.imageId = id;
    };
    ImagesTobeEdited.prototype.SetFileName = function (Name) {
        this.FileName = Name;
    };
    ImagesTobeEdited.prototype.GetFileName = function () {
        return this.FileName;
    };
    ImagesTobeEdited.prototype.CreateSmallCanvas = function (canvas) {
        this.CanvasSmall = canvas;
    };
    ImagesTobeEdited.prototype.CreateBigCanvas = function (canvas) {
        this.CanvasBig = canvas;
    };
    ImagesTobeEdited.prototype.CreateCanvasCouple = function (CanvasSmall, Canvasbig) {
        this.CanvasSmall = CanvasSmall;
        this.CanvasBig = Canvasbig;
    };
    ImagesTobeEdited.prototype.CreateTempcanvas = function (CanvasSmall, Canvasbig) {
        this.TempCanvasSmall = CanvasSmall;
        this.TempCanvasBig = Canvasbig;
    };
    ImagesTobeEdited.prototype.GetBigCanvas = function () {
        return this.CanvasBig;
    };
    ImagesTobeEdited.prototype.GetSmallCanvas = function () {
        return this.CanvasSmall;
    };
    ImagesTobeEdited.prototype.GetTempBigCanvas = function () {
        return this.TempCanvasBig;
    };
    ImagesTobeEdited.prototype.GetTempSmallCanvas = function () {
        return this.TempCanvasSmall;
    };
    ImagesTobeEdited.prototype.SetTempBigCanvas = function (CanvasBig) {
        this.TempCanvasBig = CanvasBig;
    };
    ImagesTobeEdited.prototype.SetTempSmallCanvas = function (CanvasSmal) {
        this.TempCanvasSmall = CanvasSmal;
    };
    ImagesTobeEdited.prototype.GetImage = function () {
        return this.ImageType;
    };
    ImagesTobeEdited.prototype.GetId = function () {
        return this.imageId;
    };
    return ImagesTobeEdited;
}());
var $ImagesTobeEditedArray = []
