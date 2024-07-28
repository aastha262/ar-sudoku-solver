import React from "react";
import "./statspanel.css"

export default function StatsPanel({
  imageCaptureTime,
  thresholdTime,
  connectedComponentTime,
  getCornerPointsTime,
  extractImageTime,
  extractBoxesTime,
  ocrTime,
  solveTime,
}: {
  imageCaptureTime: number;
  thresholdTime: number;
  connectedComponentTime: number;
  getCornerPointsTime: number;
  extractImageTime: number;
  extractBoxesTime: number;
  ocrTime: number;
  solveTime: number;
}) {
  return (
    <div className="mainbox">
      <div className="stats-panel">
        <div className="pad">
          <b>Capture Time</b>
          <span>{Math.round(imageCaptureTime)} ms</span>
        </div>
        <div className="pad">
          <b>Threshold Time</b>
          <span>{Math.round(thresholdTime)} ms</span>
        </div>
        <div className="pad">
          <b>Component Conn Time</b>
          <span>{Math.round(connectedComponentTime)} ms</span>
        </div>
        <div className="pad">
          <b>Corner Points Time</b>
          <span>{Math.round(getCornerPointsTime)} ms</span>
        </div>
        <div className="pad">
          <b>Image Extract Time</b>
          <span>{Math.round(extractImageTime)} ms</span>
        </div>
        <div className="pad">
          <b>Boxes Extract Time</b>
          <span>{Math.round(extractBoxesTime)} ms</span>
        </div>
        <div className="pad">
          <b>OCR Time</b>
          <span>{Math.round(ocrTime)} ms</span>
        </div>
        <div className="pad">
          <b>Solve Time</b>
          <span>{Math.round(solveTime)} ms</span>
        </div>
      </div>
    </div>
  );
}