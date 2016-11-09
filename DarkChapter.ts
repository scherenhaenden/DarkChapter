class images
{
    imageId: string;
    Image: any;
    public CanvasBig: any;
    public CanvasSmall: any;
    constructor(imge: any)
    {
        this.Image = imge;

    }
    SetImageId(id)
    {
        this.imageId = id;
     }
    CreateSmallCanvas(canvas)
    {
        this.CanvasSmall = canvas;
     }
    CreateBigCanvas(canvas)
    {
        this.CanvasBig = canvas;
    }
    CreateCanvasCouple(CanvasSmall, Canvasbig)
    {
        this.CanvasSmall = CanvasSmall;
        this.CanvasBig = Canvasbig;
    }
    GetBigCanvas()
    {
        return this.CanvasBig;
    }
    GetSmallCanvas()
    {
        return this.CanvasSmall;
    }
    GetImage()
    {
        return this.Image;
    }
    GetId()
    {
        return this.imageId;
    }
}

let object;
let object2;
var image: images[] = [];
image.push(new images(object));
image[0].imageId = "vamsee";
image[0].CanvasSmall = object2;
