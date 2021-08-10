const grid = document.getElementById("grid");
const cellSize = 20;
const width = 36, height = 16;

let mouse = {
    x: -1,
    y: -1
}

function InitializeGrid(){
    for(let a = 0; a < height*2 + 1; a++){
        for(let b = 0; b < width*2 + 1; b++){
            let y_ = a, x_ = b;
            let tile = $("<div type=tile></div>").attr('id', y_+'a'+x_);
            tile.width(cellSize); tile.height(cellSize);
            tile.on("mouseup mouseover", ()=>{ 
                if(mouse_down && current_draw_mode == "scattered") 
                    tile.attr('type','wall')
                mouse.x = x_;
                mouse.y = y_;
                }
            )
            $('#grid').append(tile);
        }
    }
    grid.style.width = width*2*cellSize + cellSize;
    grid.style.height = height*2*cellSize + cellSize;
}

function ButtonHandler(event){
    switch(event){
        default: //Default case is when we click a dropdown menu and we have to disable all the other drop downs
            $('[enabled=true]').attr('enabled','false');
            $('#'+event).attr('enabled','true');
            break;
    }
}

function main(){
    InitializeGrid();
}
main();
