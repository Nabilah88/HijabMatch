import { useEffect, useRef, useState } from "react";
import { Box, Button } from "grommet";

export default function CameraScreen({ onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function startCamera() {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
    }

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      onCapture(blob);
    }, "image/jpeg");
  };

  return (
    <Box fill align="center" justify="center" background="black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Button
        label="Capture"
        primary
        onClick={capturePhoto}
        style={{
          position: "absolute",
          bottom: "40px",
          width: "200px",
        }}
      />
    </Box>
  );
}