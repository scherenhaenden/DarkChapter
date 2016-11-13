/*
ready block
*/

/*
GlobalVars
*/
var SourceOfWaterMark="./Firma.png";
var DropZoneWidth=1200;
var DropZoneHeight=200;

var MaxSizeImgBigWidthOrHeight=1200;
var MaxSizeImgSmallWidthOrHeight=300;
//id of Array Counter
var iID=0;
/**/

// @koala-append "DarkChapterWaterMarks.js"
// @koala-append "DarkChapterUi.js"

$(document).ready(function(){
  SetDropZone();
});



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
          var g=this.name;
					getCanvasImage(this,file);
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

// @koala-append "DarkChapterResizingFunctions.js"




var getCanvasImage = function(image,fileASInput)
{

    var MaxUpFileImgeSize=MaxSizeImgBigWidthOrHeight;
    var SizePreview=MaxSizeImgSmallWidthOrHeight;
    var quality=0.5;
    var MaxDownresizing=0.5;
    var reste=new ImageSizeMax(image,MaxUpFileImgeSize);
    quality=1/reste.DiffTimes;
    var BigCanvas;
    var BigCanvas = document.createElement('canvas');
    BigCanvas.width = image.width;
    BigCanvas.height = image.height;
    var ctx6 = BigCanvas.getContext("2d");
    ctx6.drawImage(image, 0, 0, image.width, image.height);

    BigCanvas=ResizePicture(MaxDownresizing,BigCanvas,reste,MaxUpFileImgeSize);

    var SmallCanvas = document.createElement('canvas');
    SmallCanvas.width = BigCanvas.width;
    SmallCanvas.height = BigCanvas.height;
    var ctx7 = SmallCanvas.getContext("2d");
    ctx7.drawImage(image, 0, 0, BigCanvas.width, BigCanvas.height);
    var reste2=new ImageSizeMax(SmallCanvas,SizePreview);

    SmallCanvas=ResizePicture(MaxDownresizing,SmallCanvas,reste,SizePreview);


    var ImageSwapEditing= new ImagesTobeEdited(image,fileASInput.name);
    ImageSwapEditing.CreateCanvasCouple(SmallCanvas,BigCanvas);
    ImageSwapEditing.CreateTempcanvas(SmallCanvas,BigCanvas);
    ImageSwapEditing.SetImageId(iID);
    $ImagesTobeEditedArray[iID]=ImageSwapEditing;

      var TestCnv=WaterMarkPicture($ImagesTobeEditedArray[iID].GetSmallCanvas(),(0.2),imgWater);
      var TestCnvBig=WaterMarkPicture($ImagesTobeEditedArray[iID].GetBigCanvas(),(0.2),imgWater);


      $ImagesTobeEditedArray[iID].CreateTempcanvas(TestCnv,TestCnvBig);
      /*var b64 = $CanvasWtSmall.toDataURL();
      var bin = atob(b64.split(',')[1]);
      var exif = EXIF.readFromBinaryFile(new BinaryFile(bin));
      alert(exif.Orientation);*/

       createPreviews(iID);
       iID=(iID+1);


		return BigCanvas.toDataURL("image/jpeg");
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

/*function app(canvas7, canvas6,image,iID)
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



}*/
/*
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

}*/



function CreateDialogs(id, htmlToAppend, imaginside2, drul)
{
  $(function() {
    $("#"+id ).click(function(){

var element=$("#"+id ).parent().attr('id');
var $Cloned = $("#"+element).clone();
var html = $("#"+element).html();
var forid="edit"+id.trim();
var $rimaginside2=imaginside2+'<br> Sharpen: <input type="range" id="mix" min="-200" max="200" value="0" oninput="update(\''+forid+'\')">';
var $valdrul=drul;
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
          buttons:
          {
            Save: function()
            {


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


          },
            Upload: function()
            {
              var $SwapId=id.replace("ImgPreview","");
              UploadPicture($SwapId);
            }
          }
        });
});
});
}
var $ans1Value;

function UploadPicture(id)
{

  var CanvasSmall=$ImagesTobeEditedArray[id].GetTempSmallCanvas();
  var CanvasBig=$ImagesTobeEditedArray[id].GetTempBigCanvas();
  var NameOfFileToBeUploaded=$ImagesTobeEditedArray[id].GetFileName();


	if(1==1){

		$.ajax({
            type: "POST",
            url: "",
            data: {
              Nameoffunction:'UploadPictures',
              SmallImage:CanvasSmall.toDataURL("image/jpeg").toString(),
              BigImage:CanvasBig.toDataURL("image/jpeg").toString(),
              NameOfPicture:NameOfFileToBeUploaded,
              NameOfGallery:'testGallery'
              /*datasend: datatosend.toString(),
              Nameoffunction: 'galleryintofolder' ,
               nameofgallery: givethisval, counter:numberofpics*/ },
            // DO NOT SET CONTENT TYPE to json
            // contentType: "application/json; charset=utf-8",
            // DataType needs to stay, otherwise the response object
            // will be treated as a single string
            dataType: "json",
            success: function (response) {
                //alert(response.d);
            }
        });
        //numberofpics++;
	}else
	{
		alert('empty');
	}
}


var ImageSizeMax = (function () {
    function ImageSizeMax(img, MaxSizeImg) {
        this.imge = img;
        this.MaxSize = MaxSizeImg;
        this.CalculateSize();
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

     $ImagesTobeEditedArray[IdOfArray].SetTempBigCanvas(canvas7);
    canvas.src=canvas7.toDataURL("image/jpeg");
}
// @koala-append "DarkChapterImageFunctions.js"

var ImagesTobeEdited = (function () {
    function ImagesTobeEdited(imge,ImageName) {
        this.ImageType = imge;
        this.FileName = ImageName;
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
