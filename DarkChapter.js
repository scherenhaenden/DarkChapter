
/*
ready

*/
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
			for(var i=0; i<Files.length; i++)
			{
				readFile(Files[i]);
			}
		} else {

		}


}
function resolve() {
    var h='d';
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
					//when image fully loaded
					var newimageurl = getCanvasImage(this);

				//createPreview(file, newimageurl);
					//test(newimageurl);
					//uploadToServer(file, dataURItoBlob(newimageurl),newimageurl);
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


function rxeadFile(file) {
    var reader = new FileReader();
    var deferred = $.Deferred();

    reader.onload = function(event) {
        deferred.resolve(event.target.result);
    };

    reader.onerror = function() {
        deferred.reject(this);
    };

    if (/^image/.test(file.type)) {
        reader.readAsDataURL(file);
    } else {
        reader.readAsText(file);
    }

    return deferred.promise();
}

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
  var canvas5 = document.createElement('canvas');
  canvas5.width = image.width*quality;
  canvas5.height = image.height*quality;
  var ctx5 = canvas5.getContext("2d");
  ctx5.drawImage(image, 0, 0, image.width*quality, image.height*quality);
  return canvas5;
}



var getCanvasImage = function(image) {
    var SizeUp=1200;
    var SizePreview=300;

    var quality=0.5;
    var MaxDownresizing=0.5;
    var h = image.width;
    var t = image.height;
    var imageSwap=image;
    var reste=new ImageSizeMax(image,SizeUp);
    reste.CalculateSize();
    //$("#ShowUpPics").append(imageSwap);
    //define canvas
    quality=1/reste.DiffTimes;

    //this will be delivered
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
      var reste2=new ImageSizeMax(canvas6,SizeUp);
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

  //  canvas7





  //canvasSharp=canvas7;

       app(canvas7.toDataURL("image/jpeg"),canvas6.toDataURL("image/jpeg"));
		return canvas6.toDataURL("image/jpeg");
	}
//var canvasSharp;

  /*var canvas = document.getElementById("non");
      ctx = canvas.getContext("2d");
      offScreen = document.createElement('canvas');
      offctx = offScreen.getContext('2d');*/

var iID=0;
function app(drul, drul2)
{
  var head = 'data:image/jpeg;base64,';
  //var drul=canvas.toDataURL("image/jpeg");
  var imgFileSize = Math.round((drul.length - head.length)*3/4) ;

var CompleteId="img"+iID;
var imaginside="<img id='"+CompleteId+"' src='"+drul+"'></img> <br><p>"+imgFileSize+"</p>";
var imaginside2="<img id='edit"+CompleteId+"' src='"+drul2+"'></img> <br><p>"+imgFileSize+"</p>";
var htmlToAppend="<div id='div"+CompleteId+"' class='Previews'>"+imaginside+"</div>";


  $("#ShowUpPics").append(htmlToAppend);
  CreateDialogs(CompleteId,htmlToAppend,imaginside2,drul2);
  /*$("#img"+iID+"").click(function(){
     $("#img"+iID+"").dialog();
});*/
//var val= $("#"+CompleteId, imaginside);
  //$("#ShowUpPics").append("<p>"+imgFileSize+"</p>");

  iID=(iID+1);

}

function CreateDialogs(id, htmlToAppend, imaginside2, drul)
{
  $(function() {
    $("#"+id ).click(function(){

var element=$("#"+id ).parent().attr('id');
var $Cloned = $("#"+element).clone();
var html = $("#"+element).html();
        //$( "#"+element ).append(<dihtml );//.append($(this).html());
        //$( ".Previews").append('');//.append($(this).html());
        /*$( "#"+element).dialog({
            resizable:false,
            buttons: {
                "Enrol": function()
                {
                    $(this).dialog('close');
                    choice(true);
                },
                "Cancel Enrol": function()
                {
                    $(this).dialog('close');
                    choice(false);
                }
            }
        });*/
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
            Ok: function() {
            $( "#Editdialog" ).dialog( "close" );
            $("#Editdialog").dialog('destroy').remove();
            $("#Editdialog").empty();
            $("#Editdialog").remove();
            //imaginside2='';
            }
          }
        });
});
});
}

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

function pFileReader(file){
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = resolve;  // CHANGE to whatever function you want which would eventually call resolve
    fr.readAsDataURL(file);
  });
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
function update(id)
{
  var canvas = document.getElementById(id);


  var canvas7 = document.createElement('canvas');
  canvas7.width = $canvasSharp.width;
  canvas7.height = $canvasSharp.height;
  var ctx7 = canvas7.getContext("2d");


    ctx7.drawImage($canvasSharp, 0, 0,$canvasSharp.width,$canvasSharp.height);
    var ans1 = document.getElementById('mix');
    var vag=mix;
    ctx7= sharpen(ctx7, $canvasSharp.width, $canvasSharp.height, parseInt(ans1.value) * 0.01);
    //app(canvas7.toDataURL("image/jpeg"));
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
/*
/// naive and non-efficient implementation of update, but
/// do illustrate the impact of sharpen after a downsample
function resize() {

    /// set canvas size proportional to original image
    canvas.height = canvas.width * (img.height / img.width);

    /// set off-screen canvas/sharpening source to same size
    offScreen.width = canvas.width;
    offScreen.height = canvas.height;

    /// step 1 in down-scaling
    var oc = document.createElement('canvas'),
        octx = oc.getContext('2d');

    oc.width = img.width * 0.5;
    oc.height = img.height * 0.5;
    octx.drawImage(img, 0, 0, oc.width, oc.height);

    /// step 2
    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

    /// draw final result to screen canvas
    ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
    0, 0, canvas.width, canvas.height);

    /// copy to off-screen to use as source for shapening
    offctx.drawImage(canvas, 0, 0);

    /// apply sharpening convolution
    update();
}

/// adjustable sharpening - update cached source
function update() {
    ctx.drawImage(offScreen, 0, 0);
    sharpen(ctx, canvas.width, canvas.height, parseInt(mix.value) * 0.01);
}
*/


/*
var ImageSizeMax=function (img)
{
  var Max=1200;
  ImageSizeMax.height;
  ImageSizeMax.width;
  if((img.height>  Max)||(img.width>Max))
  {
    var DiffTimes;
    if((img.height>img.width)||(img.height==img.width))
    {
      var DiffTimes=img.height/Max;

    }
    else
    {
      var DiffTimes=img.width/Max;
    }
    this.height=img.height/DiffTimes;
    this.width=img.width/DiffTimes;
  }
  else
  {
    this.height=img.height;
    this.width=img.width;
  }
return ImageSizeMax;

}*/
