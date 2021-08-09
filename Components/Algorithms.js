/**
 * This file will contain all the graph traversal and pathfinding
 * algorithms used for visualization
 */


/**
 * Solves maze using DFS
 */
async function SolveMaze_DFS(xi=1,yi=1,xf=2*width-1,yf=2*height-1){
    let stack = [[yi,xi,"start"]];
    let cx, cy;
    //First modify css of the cells
    $('[type=tile]').addClass('animated');
    while(stack.length > 0){
        let curr = stack[stack.length-1];
        let curr_div = $('#'+curr[0]+'a'+curr[1]);
        cx = curr[1]; cy = curr[0];
        curr_div.attr('type','passed');
        curr_div.attr('prev',curr[2]);
        stack.pop();
        if(curr[0] == yf && curr[1] == xf) break;
        for(let i = 0; i < 4; i++){
            if(validDivIndx(curr[0]+dy[i]/2,curr[1]+dx[i]/2) && CanPass(curr[1],curr[0],curr[1]+dx[i]/2,curr[0]+dy[i]/2)){
                stack.push([curr[0]+dy[i]/2,curr[1]+dx[i]/2,curr_div.attr('id')]);
            }
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    //Back track;
    if(cx == xf && cy == yf){
        let curr_node = $('#'+cy+'a'+cx)
        while(curr_node.attr('prev') != 'start'){
            curr_node.attr('type','solved');
            curr_node = $('#'+curr_node.attr('prev'));
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        curr_node.attr('type','solved');
    }
    //Then demodify the cells;
    $('.animated').removeClass('animated');
}