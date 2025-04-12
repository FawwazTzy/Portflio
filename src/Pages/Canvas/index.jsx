import { useRef, useState, useEffect } from "react";

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [mode, setMode] = useState("rectangle"); // 'rectangle' or 'polygon'
  const [rectStart, setRectStart] = useState(null);
  const [rects, setRects] = useState([]);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [isPolygonClosed, setIsPolygonClosed] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setRects([]);
      setPolygonPoints([]);
    }
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "rectangle") {
      if (!rectStart) {
        setRectStart({ x, y });
      } else {
        const newRect = {
          x: Math.min(rectStart.x, x),
          y: Math.min(rectStart.y, y),
          w: Math.abs(rectStart.x - x),
          h: Math.abs(rectStart.y - y),
        };
        setRects([...rects, newRect]);
        setRectStart(null);
      }
    } else if (mode === "polygon") {
      if (isPolygonClosed) return; // Jangan tambah titik jika sudah tertutup
      setPolygonPoints([...polygonPoints, { x, y }]);
    }
  };

  const drawCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw rectangles
    ctx.strokeStyle = "red";
    rects.forEach((r) => {
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    });

    // Draw polygon
    if (polygonPoints.length > 0) {
      ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
      for (let i = 1; i < polygonPoints.length; i++) {
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
      }

      const isClosed =
        polygonPoints.length > 2 &&
        polygonPoints[0].x === polygonPoints[polygonPoints.length - 1].x &&
        polygonPoints[0].y === polygonPoints[polygonPoints.length - 1].y;

      if (isClosed) {
        ctx.closePath();
      }

      ctx.stroke();

      // Draw dots
      polygonPoints.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
      });
    }
  };

  useEffect(() => {
    if (imageSrc) {
      drawCanvas();
    }
  }, [rects, polygonPoints, imageSrc]);

  const handleCanvasDoubleClick = (e) => {
    if (mode === "polygon" && polygonPoints.length > 2) {
      // Secara eksplisit menutup polygon
      setPolygonPoints([...polygonPoints, polygonPoints[0]]);
      setIsPolygonClosed(true);
    }
  };

  const handleUndoPolygonPoint = () => {
    if (polygonPoints.length === 0) return;

    // Cek apakah polygon tertutup
    const last = polygonPoints[polygonPoints.length - 1];
    const first = polygonPoints[0];
    const isClosed =
      isPolygonClosed ||
      (polygonPoints.length > 2 && last.x === first.x && last.y === first.y);

    if (isClosed) {
      // Hapus titik terakhir (penutup)
      setPolygonPoints(polygonPoints.slice(0, -1));
      setIsPolygonClosed(false);
    } else {
      // Hapus titik biasa
      setPolygonPoints(polygonPoints.slice(0, -1));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Image Selector</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div className="my-4">
        <button
          onClick={() => setMode("rectangle")}
          className={`px-3 py-1 mr-2 rounded ${
            mode === "rectangle" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Rectangle
        </button>
        <button
          onClick={() => setMode("polygon")}
          className={`px-3 py-1 rounded ${
            mode === "polygon" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Polygon
        </button>
        {mode === "polygon" && polygonPoints.length > 2 && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleUndoPolygonPoint}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Undo Polygon
            </button>
            <button
              onClick={() => {
                setPolygonPoints([]);
                setIsPolygonClosed(false);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Clear Polygon
            </button>
          </div>
        )}
      </div>

      {imageSrc && (
        <div className="relative inline-block">
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Uploaded"
            onLoad={() => {
              canvasRef.current.width = imageRef.current.width;
              canvasRef.current.height = imageRef.current.height;
              drawCanvas();
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute left-0 top-0"
            onClick={handleCanvasClick}
            onDoubleClick={handleCanvasDoubleClick}
          />
        </div>
      )}
    </div>
  );
}

export default App;
