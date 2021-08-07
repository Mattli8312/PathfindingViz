/**T
 * UI Feature: Rendering walls and shapes
 * Contains methods that enables the user to render certain shapes with walls 
 * such as rectangles, circles, and lines.
 */
let current_draw_mode = "scattered";
let mouse_down = false;
let prev_pixels = []; //This will be used to store the previous pixels which will be deleted if needed

let start = {
    x: -1,
    y: -1
}

/**Used to clear
 * the previous frame of pixels
 */
function ClearPixels(){
    for(const p of prev_pixels){
        p.attr('type', 'tile');
    }
    prev_pixels = [];
}

function DrawRectangle(){
    for(let i = start.y; i <= mouse.y; i++){
        for(let j = start.x; j <= mouse.x; j++){
            if(!i || !j || i == mouse.y || j == mouse.x){
                prev_pixels.push($('#'+i+'a'+j));
            }
        }
    }
}

function RenderPixels(){
    for(const p of prev_pixels){
        p.attr('type','wall');
    }
}

window.addEventListener("mousedown", ()=>{
    mouse_down = true;
})

window.addEventListener("mousemove", ()=> {
    if(mouse_down){
        switch(current_draw_mode){
            case "square":
                if(start.x < 0){
                    start.x = mouse.x,
                    start.y = mouse.y
                    console.log(start.y,start.x);
                }
                else{
                    ClearPixels();
                    DrawRectangle();
                    RenderPixels();
                }
                break;
            default:
                start.x = start.y = -1;
                break;
        }
    }
})

window.addEventListener("mouseup", ()=>{
    console.log("released");
    current_draw_mode = "scattered";
    prev_pixels = [];
    mouse_down = false;
    start.x = -1;
    start.y = -1;
});