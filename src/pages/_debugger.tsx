import { maze, WallBuilder } from '../shared';

export const _DebuggerPage = () => {
  const Walls = new WallBuilder(maze, 602, 602);
  Walls.calculate();
  console.log(Walls.walls);

  return (<div>Debugger Page</div>);
}