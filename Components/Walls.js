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

/**
 * Function used to draw dynamically resizable line
 * This code was made possible thanks to https://jstutorial.medium.com/how-to-code-your-first-algorithm-draw-a-line-ca121f9a1395
 */
 let draw_line = (x1, y1, x2, y2) => {
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
    dx = x2 - x1;
    dy = y2 - y1;
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;
    if (dy1 <= dx1) {
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else {
            x = x2; y = y2; xe = x1;
        }
        prev_pixels.push($('#'+y+'a'+x));
        for (i = 0; x < xe; i++) {
            x = x + 1;
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }
            prev_pixels.push($('#'+y+'a'+x));
        }
    } else {
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { 
            x = x2; y = y2; ye = y1;
        }
        prev_pixels.push($('#'+y+'a'+x));
        for (i = 0; y < ye; i++) {
            y = y + 1;
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }
            prev_pixels.push($('#'+y+'a'+x));
        }
    }
 }

/**Function that renders a circle using Bresenham's approach */

/**
 * Function that renders randomized walls dependent on the input density
 */

function RandomWalls(density = 0.3){
    ClearBoard();
    for(let i = 0; i < height*2+1; i++){
        for(let j = 0; j < width*2+1; j++){
            if(Math.round(Math.random()*10)/10 <= density){
                $('#'+i+'a'+j).attr('type','wall');
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
                draw_line(mouse.x,mouse.y,start.x,start.y);
                RenderPixels();
                break;
            case "erase":
                $('#'+mouse.y+'a'+mouse.x).attr('type','tile');
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