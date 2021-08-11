# Pathfinding Visualizer [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Mattli8312/pathfindingviz/blob/master/LICENSE)

## Overview

Pathfinding Visualizer is a fun pathfinding simulator which contains numerous graphical UI features. This application was inspired by UIUC's Data structures course, specifically the final project in which we had to implement various graph traversal and pathfinding algorithms on certain data sets. Some of the important features this web application contains are

    - Rendering walls/obstacles for the pathfinding grid
    - Rendering specific shapes formed by walls including circles, lines, and squares using Bresenham's algorithms
    - Rendering Mazes using various approaches: Backtracking, Prim's Kruskal's etc.
    - Simulating Pathfinding Algorithms: BFS, Dijkstra, A*, etc.
    - Miscellanous: positioning start and end locations and controlling the speed at which the algorithms run

## Installation/Running 

In order to run this application, you can either open a Web Browser and open this link https://mattli8312.github.io/pathfindingviz/ or 
download and install the application and run the project locally.

If you want to run this project locally, you can simply clone the git repository:

```bash
$ cd MyFolder
$ git clone https://github.com/Mattli8312/pathfindingviz.git 
```

## Using the Application/ Potential Questions

1. **Setting the start and end points**
    - To set the start and end points, click on the Miscellaneous button. Then, click on either start or end. Drag the mouse
    tow which ever location you want either of those points to be and click.
    - *Note: You need to make sure both points aren't on wall nodes. If they are, none of the graph generating of solving buttons will work!*
2. **Clearing Path**
    - To clear paths, click on Miscellanous and then clear path.

3. **Clear Board**
    - To clear the board, click on Draw Shapes and then the bottom button. This will clear all the paths and walls.

## Contributing

As of right now, there are no known bugs in the code, however, if you happen to come across some issues, or want add additional features
to the application, feel free to make pull requests.