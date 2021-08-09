/**
 * This file will contain all the graph traversal and pathfinding
 * algorithms used for visualization
 */

/**Solves Maze or any graph traversal using Depth First Search or Breadth First Search */
async function SolveMaze_Traversal(traversal, xi=1,yi=1,xf=2*width-1,yf=2*height-1){

    let stack = [[yi,xi,"start"]];
    
    let cx, cy;

    let dfs = traversal == 'DFS';
    //First modify css of the cells
    $('[type=tile]').addClass('animated');

    $('#'+yi+'a'+xi).attr('type','passed');
    
    while(stack.length > 0){

        let curr = stack.splice(dfs ? stack.length - 1 : 0,1)[0];

        let curr_div = $('#'+curr[0]+'a'+curr[1]);

        cx = curr[1]; cy = curr[0];

        curr_div.attr('prev',curr[2]);

        if(dfs) $('#'+(curr[0])+'a'+(curr[1])).attr('type','passed');

        if(curr[0] == yf && curr[1] == xf) break;

        for(let i = 0; i < 4; i++){

            if(validDivIndx(curr[0]+dy[i]/2,curr[1]+dx[i]/2) && CanPass(curr[1],curr[0],curr[1]+dx[i]/2,curr[0]+dy[i]/2)){

                if($('#'+(curr[0]+dy[i]/2)+'a'+(curr[1]+dx[i]/2)).attr('type') != 'passed'){

                    stack.push([curr[0]+dy[i]/2,curr[1]+dx[i]/2,curr_div.attr('id')]);

                    if(!dfs) $('#'+(curr[0]+dy[i]/2)+'a'+(curr[1]+dx[i]/2)).attr('type','passed');

                }

            }
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    //Back track;
    if(cx == xf && cy == yf){
        await Backtrack(cx,cy);
    }
    //Then demodify the cells;
    $('.animated').removeClass('animated');
}

/**Solves Maze or any graph structure using Dijkstra's pathfinding algorithm with a min heap */
async function SolveMaze_Dijkstra(xi=1,yi=1,xf=2*width-1,yf=2*height-1){
    let pq = new PriorityQueue();
    let cx, cy;
    pq.push({x:xi,y:yi,val:0,prev:"start"});
    $('#'+yi+'a'+xi)
    while(!pq.empty()){
        let curr = pq.pop();
        let curr_div = $('#'+curr.y+'a'+curr.x);
        let curr_weight = curr.prev != "start" ? curr.val + parseInt($('#' + curr.prev).attr('weight')) : 0;
        curr_div.attr('prev',curr.prev);
        curr_div.attr('weight', curr_weight);
        cx = curr.x, cy = curr.y;
        if(cx == xf && cy == yf) break;
        for(let i = 0; i < 4; i++){
            let next_tile = $('#'+(curr.y+dy[i]/2) + 'a' + (curr.x+dx[i]/2));
            if(validDivIndx(curr.y+dy[i]/2, curr.x+dx[i]/2) && CanPass(curr.x,curr.y,curr.x+dx[i]/2,curr.y+dy[i]/2)){
                if(next_tile.attr('type') != 'passed' || parseInt(next_tile.attr('weight') > curr_weight + 1)){
                    pq.push(
                    {   
                        x:curr.x+dx[i]/2, 
                        y:curr.y+dy[i]/2, 
                        val:curr_weight+1,
                        prev:curr_div.attr('id')
                    })
                    next_tile.attr('type','passed');
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    if(cx == xf && cy == yf){
        await Backtrack(cx,cy);
    }
}