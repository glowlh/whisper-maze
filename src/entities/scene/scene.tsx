import { useRef, useEffect, useState } from 'react';
import { Canvas } from './scene.styled.ts';
import { maze, WallBuilder } from '../../shared';

// const STEP = 2;
const INITIAL_POSITION = { x: 0, y: 0 };

const INITIAL_CONTROLLER = {
  w: false,
  d: false,
  s: false,
  a: false,
};

interface Position {
  x: number;
  y: number;
}

interface Controller {
  w: boolean;
  d: boolean;
  s: boolean;
  a: boolean;
}

export const Scene = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef<any>({ ctx: null });
  const [position, setPosition] = useState<Position>(INITIAL_POSITION);
  const [controller, setController] = useState<Controller>(INITIAL_CONTROLLER);

  /**
     * TODO: remove
     */
  const drawMaze = () => {
    const Walls = new WallBuilder(maze, 602, 602);
    Walls.calculate();

    if (!Walls.walls || !Walls.walls.length) {
      return;
    }

    const { current: context } = ctxRef
    console.log(Walls.walls);
    context.fillStyle = '#afafaf';

    for (const wall of Walls.walls) {
      context.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
  }

  const redraw = (nextX, nextY) => {
    console.log(nextX, nextY);

    const { x, y } = position;
    const { current } = ctxRef
    current.clearRect(x, y, 10, 10);
    current.fillRect(nextX, nextY, 10, 10);
    setPosition({ x: nextX, y: nextY });
  }

  const handleKeyDown = (e) => {
    const { x, y } = position;
    let nextX = x;
    let nextY = y;
    let nextController = controller;

    switch (e.key) {
      case 'w': {
        nextController = { ...controller, w: true };
        break;
      }
      case 'd': {
        nextController = { ...controller, d: true };
        break;
      }
      case 's': {
        nextController = { ...controller, s: true };
        break;
      }
      case 'a': {
        nextController = { ...controller, a: true };
        break;
      }
      default: break;
    }

    if (nextController.w) {
      nextY--;
    }
    if (nextController.d) {
      nextX++;
    }
    if (nextController.s) {
      nextY++;
    }
    if (nextController.a) {
      nextX--;
    }

    redraw(nextX, nextY);
    setController(nextController);
  }

  const handleKeyUp = (e) => {
    switch (e.key) {
      case 'w': {
        setController({ ...controller, w: false });
        return;
      }
      case 'd': {
        setController({ ...controller, d: false });
        return;
      }
      case 's': {
        setController({ ...controller, s: false });
        return;
      }
      case 'a': {
        setController({ ...controller, a: false });
        return;
      }
      default: return;
    }
  }

  useEffect(() => {
    // document.addEventListener('keydown', handleKeyClick);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvasRef.current.focus();
      const context = canvas.getContext('2d');
      ctxRef.current = context;

      if (context) {
        context.fillStyle = 'green';
        context.fillRect(INITIAL_POSITION.x, INITIAL_POSITION.y, 10, 10);
        drawMaze();
      }
    }
  }, []);

  return (<Canvas tabIndex={0} width={600} height={600} ref={canvasRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />);
}
