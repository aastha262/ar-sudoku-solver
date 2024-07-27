import React, { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import Processor, { VideoReadyPayload } from "./augmentedReality/Processor";
import StatsPanel from "./components/StatsPanel";

const processor = new Processor();

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [videoSize, setVideoSize] = useState({ width: 100, height: 100 });
  const [stats, setStats] = useState({
    imageCaptureTime: 0,
    thresholdTime: 0,
    connectedComponentTime: 0,
    getCornerPointsTime: 0,
    extractImageTime: 0,
    extractBoxesTime: 0,
    ocrTime: 0,
    solveTime: 0,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      processor.startVideo(video).then(
        () => console.log("Video started"),
        (error) => alert(error.message)
      );
    }
  }, []);

  const updateCanvas = useCallback(() => {
    const canvas = previewCanvasRef.current;
    if (canvas && processor.isVideoRunning) {
      setStats({
        imageCaptureTime: processor.captureTime,
        thresholdTime: processor.thresholdTime,
        connectedComponentTime: processor.connectedComponentTime,
        getCornerPointsTime: processor.cornerPointTime,
        extractImageTime: processor.extractPuzzleTime,
        extractBoxesTime: processor.extractBoxesTime,
        ocrTime: processor.neuralNetTime,
        solveTime: processor.solveTime,
      });

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(processor.video, 0, 0);
        drawCorners(context);
        drawGridLines(context);
        drawSolvedPuzzle(context);
      }
    }
  }, []);

  const drawCorners = (context: CanvasRenderingContext2D) => {
    if (processor.corners) {
      const { topLeft, topRight, bottomLeft, bottomRight } = processor.corners;
      context.strokeStyle = "rgba(0,200,0,0.5)";
      context.fillStyle = "rgba(0,0,0,0.1)";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(topLeft.x, topLeft.y);
      context.lineTo(topRight.x, topRight.y);
      context.lineTo(bottomRight.x, bottomRight.y);
      context.lineTo(bottomLeft.x, bottomLeft.y);
      context.closePath();
      context.stroke();
      context.fill();
    }
  };

  const drawGridLines = (context: CanvasRenderingContext2D) => {
    if (processor.gridLines) {
      context.strokeStyle = "rgba(0,200,0,0.5)";
      context.lineWidth = 2;
      processor.gridLines.forEach((line) => {
        context.beginPath();
        context.moveTo(line.p1.x, line.p1.y);
        context.lineTo(line.p2.x, line.p2.y);
        context.stroke();
      });
    }
  };

  const drawSolvedPuzzle = (context: CanvasRenderingContext2D) => {
    if (processor.solvedPuzzle) {
      context.fillStyle = "rgba(0,200,0,1)";
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (processor.solvedPuzzle[y][x]) {
            const { digit, digitHeight, digitRotation, position, isKnown } = processor.solvedPuzzle[y][x];
            if (!isKnown) {
              context.font = `bold ${digitHeight}px sans-serif`;
              context.save();
              context.translate(position.x, position.y);
              context.rotate(Math.PI - digitRotation);
              context.fillText(digit.toString(), -digitHeight / 4, digitHeight / 3);
              context.restore();
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const interval = window.setInterval(updateCanvas, 100);
    return () => window.clearInterval(interval);
  }, [updateCanvas]);

  useEffect(() => {
    const videoReadyListener = ({ width, height }: VideoReadyPayload) => {
      setVideoSize({ width, height });
    };
    processor.on("videoReady", videoReadyListener);
    return () => {
      processor.off("videoReady", videoReadyListener);
    };
  }, []);

  return (
    <div className="App">
   <h1 className="title">
  <span className="title-word">AR</span>
  <span className="title-word">Sudoku</span>
  <span className="title-word">Solver</span>
</h1>
      <div className="content-wrapper">
        <video
          ref={videoRef}
          className="video-preview"
          width={50}
          height={50}
          playsInline
          muted
        />
        <canvas
          ref={previewCanvasRef}
          className="preview-canvas"
          width={videoSize.width}
          height={videoSize.height}
        />
      </div>
      <StatsPanel {...stats} />
    </div>
  );
}
export default App;