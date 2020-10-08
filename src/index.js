import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer } from "react-konva";
import { useSpring } from "react-spring";
import { Spring, animated } from "react-spring/renderprops-konva";

export const Node = (props) => {
  return (
    <animated.Line
      x={0}
      y={0}
      stroke="#e7328f"
      strokeWidth={0.5}
      lineCap="round"
      lineJoin="round"
      tension={0.5}
      {...props}
    />
  );
};

const generateLines = () => {
  const width = window.innerWidth;
  const lineCount = 40;

  return [...Array(lineCount)].map((_, i) => ({
    id: i.toString(),
    x: i * 4,
    y: i * 2,
    rotation: i * 0.5,
    opacity: i * (1 / lineCount),
    points: [-lineCount * 4, 70, width / 4, 23, (width / 4) * 3, 60, width, 20]
  }));
};

const interp = (i) => (r) => 15 * Math.sin(r + (i * 2 * Math.PI) / 1.6);

const App = () => {
  const [lines, setLines] = useState(generateLines);

  const { radians } = useSpring({
    to: async (next) => {
      while (1) await next({ x: 2 * Math.PI });
    },
    from: { x: 0 },
    config: { duration: 3500 },
    reset: true
  });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {lines.map((line) => (
          <Spring
            reset
            from={{ opacity: 0, x: 0, y: 0, rotation: 0 }}
            to={{
              opacity: line.opacity,
              x: line.x,
              y: line.y,
              rotation: line.rotation
            }}
            config={{ duration: 2000 }}
          >
            {(props) => <Node {...line} {...props} />}
          </Spring>
        ))}
      </Layer>
    </Stage>
  );
};

render(<App />, document.getElementById("root"));
