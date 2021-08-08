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
        p.attr('type','tile');
    }
    prev_pixels = [];
}
/**
 * Draws Dynamically Sizeable rectangle
 */
function DrawRectangle(){
    /**Render All Four Quadrants*/
    /**Initialize entry points */
    let i_o = start.y < mouse.y ? start.y : mouse.y; 
    let j_o = start.x < mouse.x ? start.x : mouse.x;
    let i_f = i_o == start.y ? mouse.y : start.y;
    let j_f = j_o == start.x ? mouse.x : start.x;

    for(let i = i_o; i <= i_f; i++){
        for(let j = j_o; j <= j_f; j++){
            if(i==i_o || j==j_o || i ==i_f || j == j_f){
                if($('#'+i+'a'+j).attr('type') == 'tile'){
                    prev_pixels.push($('#'+i+'a'+j));
                }
            }
        }
    }
}

function DrawLine(){

    /**Initialize entry points */

    let i_o = start.y < mouse.y ? start.y : mouse.y; 
    let j_o = start.x < mouse.x ? start.x : mouse.x;
    let i_f = i_o == start.y ? mouse.y : start.y;
    let j_f = j_o == start.x ? mouse.x : start.x;

    for(let i = i_o; i <= i_f; i++){
        for(let j = j_o; j<= j_f; j++){
            //y = m*x + b: 
            let bound = (i_o - i_f) < (j_o - j_f) ? (j_f - j_o) / (i_f - i_o) * i + j_o : (i_f - i_o) / (j_f - j_o) * j + i_o;
            let curr = (i_o - i_f) < (j_o - j_f) ? j : i;
            if((bound >= curr && bound < curr + 1)){
                if($('#'+i+'a'+j).attr('type') == 'tile'){
                    prev_pixels.push($('#'+i+'a'+j));
                }
            }
        }
    }
}

/**
 * Renders pixels specified by the shape methods
 */

function RenderPixels(){
    for(const p of prev_pixels){
        p.attr('type','wall');
    }
}

/**
 * Clears all the walls in the grid
 */

function ClearBoard(){
    /**Simple JQuery Call */
    $('[type=wall]').attr('type','tile');

}

window.addEventListener("mousedown", ()=>{
    mouse_down = true;
})

window.addEventListener("mousemove", ()=> {
    if(mouse_down){
        if(current_draw_mode != 'scattered' && start.x < 0){
            start.x = mouse.x,
            start.y = mouse.y
            console.log(start.y,start.x);
        }
        switch(current_draw_mode){
            case "square":
                ClearPixels();
                DrawRectangle();
                RenderPixels();
                break;
            case "line":
                ClearPixels();
                DrawLine();
                RenderPixels();
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