const grid = document.getElementById("grid");
const cellSize = 20;
const width = 36, height = 16;
const speed = document.getElementById("speed");

let FPS = 3;
let mouse = {
    x: -1,
    y: -1
}
let startnode = {
    x: width * 2 / 3,
    y: height
}
let endnode = {
    x: width * 4 / 3,
    y: height
}

function InitializeGrid(){
    for(let a = 0; a < height*2 + 1; a++){
        for(let b = 0; b < width*2 + 1; b++){
            let y_ = a, x_ = b;
            let tile = $("<div type=tile></div>").attr('id', y_+'a'+x_);
            tile.width(cellSize); tile.height(cellSize);
            if(a == startnode.y && b == startnode.x){ tile.attr('position','start') };
            if(a == endnode.y && b == endnode.x){ tile.attr('position', 'end')};
            tile.on("mouseup mouseover", ()=>{ 
                if(current_draw_mode == 'start'){
                    $('[position=start]').removeAttr('position');
                    tile.attr('position','start');
                    startnode.x = mouse.x;
                    startnode.y = mouse.y;
                }
                if(current_draw_mode == 'end'){
                    $('[position=end]').removeAttr('position');
                    tile.attr('position','end')
                    endnode.x = mouse.x;
                    endnode.y = mouse.y;
                }
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
    //Initialize Slider inputs
    speed.addEventListener("input", function(){
        this.setAttribute('value', this.value);
        FPS = parseInt(this.value);
        console.log(FPS)
    })
}

async function ButtonHandler(event, callbackFunction, parameter = ""){
    switch(event){
        case 0:
            $('[enabled=true]').attr('enabled',false);
            ResetPath();
            $('button').attr('disabled',true);
            $('[type=tile]').addClass('animated');
            if($('[position=start]').attr('type') != 'wall' && $('[position=end]').attr('type') != 'wall') {
                if(parameter == "")
                    await callbackFunction();
                else await callbackFunction(parameter);
            }
            $('button').attr('disabled',false);
            $('.animated').removeClass('animated');
            break;
        case 1:
            current_draw_mode = parameter;
            $('[enabled=true]').attr('enabled',false);
            break;
        default: //Default case is when we click a dropdown menu and we have to disable all the other drop downs
            if(event == $('[enabled=true]').attr('id')){
                $('[enabled=true]').attr('enabled',false);
            }
            else{
                $('[enabled=true]').attr('enabled',false);
                $('#'+event).attr('enabled',true);
            }
            break;
    }
}

function main(){
    InitializeGrid();
}
main();
