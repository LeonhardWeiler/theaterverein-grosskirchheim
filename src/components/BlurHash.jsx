import React, { useEffect, useRef } from "react";
import { decode } from "blurhash";

const BlurhashCanvas = ({ hash, width, height }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!hash) return;

    const pixels = decode(hash, width, height);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }, [hash, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default BlurhashCanvas;
