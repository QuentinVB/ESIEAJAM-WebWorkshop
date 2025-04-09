"use strict";

const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
  });

export default class tileset
{
    /**
     * 
     * @param {Image} imageElement 
     * @param {Number} uCount 
     * @param {Number} vCount 
     */
    constructor(url,uCount,vCount)
    {
        this.isLoaded = false;
        this.uCount=uCount;
        this.vCount=vCount;
        loadImage(url)
        .then(img => {
            //console.log(`w: ${img.width} | h: ${img.height}`);
            this.imageElement=img;

            this.width=img.width;
            this.height=img.height;

            this.cellWidth=Math.round(this.width/this.uCount);
            this.cellHeight=Math.round(this.height/this.vCount);
            const splittedfileName = this.imageElement.src.split("/").pop().split(".");
            this.filename = splittedfileName[splittedfileName.length-2];
            this.LoadCollisionMap(this.filename);
           
        })
        .catch(err => {
            console.error(err)
        });  
    }
    LoadCollisionMap(filename)
    {
        this.collision=[];
        fetch('/data/'+filename+'_collide.txt')
        .then(response => {
            if(response.ok)
            {
                return response.text()
            }
            return Promise.reject("cant load "+filename);
        })
        .then((data) => {
            this.collision = this.ParseData(data);
            //console.log(this.collision);  
            this.isLoaded = true;
        })
        .catch(error=>{console.error(error);this.isLoaded = true;});
    }
    //https://softwareengineering.stackexchange.com/questions/212808/treating-a-1d-data-structure-as-2d-grid/212813
    uFromIdx(idx) {
        return idx%this.uCount;
    }
    vFromIdx(idx) {
        return Math.floor(idx/this.uCount);
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} idx 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} zoom 
     */
    drawAt(ctx,idx,x,y,zoom=1)
    {
        let u= this.uFromIdx(idx);
        let v= this.vFromIdx(idx);

        ctx.drawImage(
            this.imageElement,
            u*this.cellWidth,
            v*this.cellHeight,
            this.cellWidth,
            this.cellHeight,
            x*zoom,
            y*zoom,
            this.cellWidth*zoom,
            this.cellHeight*zoom
        );
    }
    ParseData(data)
    {
        const array=[];
        const lines= data.split("\n");
        for (let i = 0; i < lines.length; i++) {
            array.push(parseInt(lines[i]));
        }
        return array;
    }
}