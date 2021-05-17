/**
 * Basic Priority Queue which sorts objects
 * i.e. nodes based on their cost. This class 
 * will be used in the inmplementation of the greedy Dijkstra 
 * and A* pathfinding algorithms to improve overall efficiency of the program
 * This will be a min-heap priority queue
 */


class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    Push(Node){
        this.queue.push(Node);
        this.queue.sort((a,b) => {
            return a.cost - b.cost //Sort in ascending order (i.e. min heap)
        })
    }
    Pop(){ //Helper function which pops the top of the priority queue, i.e. min heap
        if(this.queue.length > 0){
            let top_node = this.queue.splice(0,1);
            this.queue.sort((a,b) => {
                return a.cost - b.cost
            })
            return top_node[0];
        }
        return new Node(-1,-1,-1);
    }
    Top(){
        if(this.queue.length > 0)
            return this.queue[0];
    }
    Size(){
        return this.queue.length;
    }
}

class Node{
    constructor(posx, posy, cost){
        this.x = posx;
        this.y = posy;
        this.cost = cost;
    }
}