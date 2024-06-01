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
    <html>
    <div className="mainbox">
    <div className="stats-panel">
      <div className="pad">
        <b>Capture Time:</b> {Math.round(imageCaptureTime)}<br></br>
      </div>
      <div className="pad">
        <b>Threshold Time:</b> {Math.round(thresholdTime)}<br></br>
      </div>
      <div className="pad">
        <b>Component Conn Time:</b> {Math.round(connectedComponentTime)}<br></br>
      </div>
      <div className="pad">
        <b>Corner Points Time:</b> {Math.round(getCornerPointsTime)}<br></br>
      </div>
      <div className="pad">
        <b>Image Extract Time:</b> {Math.round(extractImageTime)}<br></br>
      </div>
      <div className="pad">
        <b>Boxes Extract Time:</b> {Math.round(extractBoxesTime)}<br></br>
      </div>
      <div className="pad">
        <b>OCR Time:</b> {Math.round(ocrTime)}<br></br>
      </div>
      <div className="pad">
      <b>Solve Time:</b> {Math.round(solveTime)}
      </div>
    </div>
    </div>
    </html>
  );
}
