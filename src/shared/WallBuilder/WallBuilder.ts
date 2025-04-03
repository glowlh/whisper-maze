import { Wall } from "./types.ts";

const WALL_THICKNESS = 5;

export class WallBuilder {
  public maze: number[][] | null = null;
  public mazeWidth: number | null = null;
  public mazeHeight: number | null = null;
  public canvasWidth: number | null = null;
  public canvasHeight: number | null = null;
  public walls: Wall[] = [];

  private _visited: number[][] = [];

  constructor(maze: number[][], canvasWidth: number, canvasHeight: number) {
    if (!maze) {
      return;
    }

    this.maze = maze;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.mazeHeight = maze.length;
    this.mazeWidth = maze[0].length;
  }

  public calculate() {
    this._calculateHorizontal();
  }

  private _calculateHorizontal() {
    if (!this.maze) {
      return;
    }

    // debugger;
    for (let j = 0; j < this.maze.length; j++) {
      for (let i = 0; i < this.maze[j].length; i++) {
        const node = this.maze[j][i];
        let nextNode;
        if (this.maze[j].length - 1 >= i + 1) {
          nextNode = this.maze[j][i + 1];
        }
        const hasVisited = this._visited && this._visited.length;

        if ((node === 1 && hasVisited) || (node === 1 && nextNode)) {
          this._visited.push([i, j]);
        } else if (this._visited && this._visited.length) {
          const [firstI, firstJ] = this._visited[0];
          const [lastI] = this._visited[this._visited.length - 1];
          const wall = {
            x: Math.round(
              ((this.canvasWidth / this.mazeWidth) * (2 * firstI + 1)) / 2,
            ),
            y: Math.round(
              ((this.canvasHeight / this.mazeHeight) * (2 * firstJ + 1)) / 2,
            ),
            width: Math.round(
              ((lastI - firstI) * this.canvasWidth) / this.mazeWidth,
            ),
            height: WALL_THICKNESS,
          };
          this.walls.push(wall);
          this._visited = [];
        }
      }
    }
  }
}
