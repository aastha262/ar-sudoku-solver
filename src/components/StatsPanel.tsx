import React from "react";

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
    <div className="stats-panel">
      <div>
        <b>image Capture Time:</b> {Math.round(imageCaptureTime)}
      </div>
      <div>
        <b>threshold Time:</b> {Math.round(thresholdTime)}
      </div>
      <div>
        <b>connected Component Time:</b> {Math.round(connectedComponentTime)}
      </div>
      <div>
        <b>get CornerPoints Time:</b> {Math.round(getCornerPointsTime)}
      </div>
      <div>
        <b>extract Image Time:</b> {Math.round(extractImageTime)}
      </div>
      <div>
        <b>extract Boxes Time:</b> {Math.round(extractBoxesTime)}
      </div>
      <div>
        <b>ocr Time:</b> {Math.round(ocrTime)}
      </div>
      <div>
        <b>solve Time:</b> {Math.round(solveTime)}
      </div>
    </div>
  );
}
