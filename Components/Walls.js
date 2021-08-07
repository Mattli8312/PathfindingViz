/**T
 * UI Feature: Rendering walls and shapes
 * Contains methods that enables the user to render certain shapes with walls 
 * such as rectangles, circles, and lines.
 */
let current_draw_mode = "scattered";
let mouse_down = false;

window.addEventListener("mousedown", ()=>{
    if(current_draw_mode){
        switch(current_draw_mode){
            case "square":
                console.log($("#grid"));
                break;
        }
    }
    mouse_down = true;
})

window.addEventListener("mouseup", ()=>{mouse_down = false});