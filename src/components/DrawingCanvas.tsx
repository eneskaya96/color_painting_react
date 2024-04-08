import React, { useEffect, useRef, useState } from 'react';

interface DrawingCanvasProps {
  width: number;
  height: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(5);

  // Adjust this to handle both MouseEvent and TouchEvent for the canvas
  const getCoordinates = (event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { offsetX: 0, offsetY: 0 };
    }

    const rect = canvas.getBoundingClientRect();

    if (event instanceof MouseEvent) {
      return {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };
    } else {
      const touch = event.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }
  };

  const startDrawing = (event: MouseEvent | TouchEvent) => {
    const { offsetX, offsetY } = getCoordinates(event);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(event);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const endDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.closePath();
    }
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Helper to cast event types
    const handleEvent = (handler: (e: MouseEvent | TouchEvent) => void) => {
      return (e: Event) => handler(e as MouseEvent | TouchEvent);
    };

    // Attach event listeners
    canvas.addEventListener('mousedown', handleEvent(startDrawing));
    canvas.addEventListener('mousemove', handleEvent(draw));
    canvas.addEventListener('mouseup', handleEvent(endDrawing));
    canvas.addEventListener('mouseout', handleEvent(endDrawing));

    canvas.addEventListener('touchstart', handleEvent(startDrawing));
    canvas.addEventListener('touchmove', handleEvent(draw));
    canvas.addEventListener('touchend', handleEvent(endDrawing));

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleEvent(startDrawing));
      canvas.removeEventListener('mousemove', handleEvent(draw));
      canvas.removeEventListener('mouseup', handleEvent(endDrawing));
      canvas.removeEventListener('mouseout', handleEvent(endDrawing));

      canvas.removeEventListener('touchstart', handleEvent(startDrawing));
      canvas.removeEventListener('touchmove', handleEvent(draw));
      canvas.removeEventListener('touchend', handleEvent(endDrawing));
    };
  }, [draw]); // Note: Including `draw` here could cause unnecessary re-attachments; consider dependencies carefully

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input type="range" min="1" max="10" value={lineWidth.toString()} onChange={(e) => setLineWidth(parseInt(e.target.value, 10))} />
    </div>
  );
};

export default DrawingCanvas;
