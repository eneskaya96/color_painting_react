import React, { useEffect,useRef, useState } from 'react';

interface DrawingCanvasProps {
  width: number;
  height: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [color, setColor] = useState<string>('#000000');
    const [lineWidth, setLineWidth] = useState<number>(5);

    const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => {
        // Event nesnesi ve canvas'ın doğru bir şekilde tanımlandığından emin olun.
        if (!canvas) return { offsetX: 0, offsetY: 0 };
    
        // MouseEvent ve TouchEvent için ayrı ayrı kontrol yapılıyor.
        if (event.type.startsWith('mouse')) {
            // MouseEvent için offsetX ve offsetY direkt kullanılabilir.
            return {
                offsetX: event.offsetX,
                offsetY: event.offsetY,
            };
        } else if (event.type.startsWith('touch')) {
            // TouchEvent için, dokunmatik noktanın ekran koordinatları canvas koordinatlarına çevriliyor.
            const touchEvent = event as React.TouchEvent<HTMLCanvasElement>;
            const touch = touchEvent.touches[0];
            const rect = canvas.getBoundingClientRect();
            return {
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top,
            };
        }
    
        // Eğer event tipi bilinmiyorsa, varsayılan değerler döndürülüyor.
        return { offsetX: 0, offsetY: 0 };
    };

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        console.log("startDrawing event", event)
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        
        const { offsetX, offsetY } = getCoordinates(event, canvas);
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {

        console.log("draw event", event)

        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const { offsetX, offsetY } = getCoordinates(event, canvas);

        ctx.lineTo(offsetX, offsetY);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };

    const endDrawing = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.closePath();
        }
        setIsDrawing(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        console.log("canvas")

        // Event listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);

        canvas.addEventListener('touchstart', startDrawing as any); // Type ataması gerekebilir.
        canvas.addEventListener('touchmove', draw as any); // Type ataması gerekebilir.
        canvas.addEventListener('touchend', endDrawing);

        // Cleanup
        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);

            canvas.removeEventListener('touchstart', startDrawing as any); // Type ataması gerekebilir.
            canvas.removeEventListener('touchmove', draw as any); // Type ataması gerekebilir.
            canvas.removeEventListener('touchend', endDrawing);
        };
    }, [draw]);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} />
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            <input type="range" min="1" max="10" value={lineWidth.toString()} onChange={(e) => setLineWidth(parseInt(e.target.value))} />
        </div>
    );
};

export default DrawingCanvas;
