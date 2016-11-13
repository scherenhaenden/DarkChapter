function SetDropZone()
{
    var DragAndDropFilesZone=$("#DragAndDropFilesZone");
    DragAndDropFilesZone.height(DropZoneHeight);
    DragAndDropFilesZone.width(DropZoneWidth);
    DragAndDropFilesZone.css('background-color', 'white');
    DragAndDropFilesZone.css('border-style', 'dashed');
    DragAndDropFilesZone.css('border-width', '5px');
    DragAndDropFilesZone.append('<input id="DragAndDropFilesZoneClick" type="file" multiple>');
    DragAndDropFilesZoneClick = $('#DragAndDropFilesZoneClick');


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
    DragAndDropFilesZoneOnClick(DragAndDropFilesZone);
    DragAndDropFilesZoneClick.on('change', function() {
  		//retrieve selected uploaded files data
      /*var files = e.originalEvent.dataTransfer.files;
      ProcessFiles(files);*/

      var files = $(this)[0].files;
		ProcessFiles(files);

    		return false;
  	});




    //$("#DragAndDropFilesZone")=DragAndDropFilesZone;
    //$("#DragFilesZone")
}
function DragAndDropFilesZoneOnClick(DragAndDropFilesZone)
{
  DragAndDropFilesZone.on('click', function(e) {
        //add hover class when drag over
        //DragAndDropFilesZone.css('background-color', 'blue');
        //DragAndDropFilesZone.addClass( "Darkzone" );
        e.stopPropagation();
        e.preventDefault();
        DragAndDropFilesZone.unbind('click');
        //DragAndDropFilesZoneClick.click();
         DragAndDropFilesZoneClick.click();
         DragAndDropFilesZoneOnClick(DragAndDropFilesZone);
        //break;
        return false;
        });
  return DragAndDropFilesZone;

}
