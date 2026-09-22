import { useState } from "react";
import { Box, Button, Form, FormField, TextInput, Text, Layer } from "grommet";
import { Camera, Upload, Close } from "grommet-icons";
import CameraScreen from "./CameraScreen";
import { useNavigate } from "react-router-dom";
import hijabIcon from "../../assets/form_icon.png";

export default function User() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  const file =
    image instanceof Blob
      ? new File([image], "photo.jpg", { type: "image/jpeg" })
      : image;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", file);

  const API_URL ="https://hijabmatch-backend.onrender.com"

  try {
    const res = await fetch(
      `${API_URL}/api/analyze/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Analysis failed");
    }

    navigate("/results", {
      state: {
        ...data,
        imageFile: file,
      },
    });
  } catch (error) {
    console.error("Analysis failed:", error);
    setLoading(false);
  }
};
  const clearImage = () => {
    setImage(null);
  };

  return (
    <Box 
      fill 
      align="center" 
      justify="center" 
      background="linear-gradient(180deg, rgba(255, 182, 219, 0.3), rgba(209, 70, 123, 0.6))"
 
      pad={{ vertical: "xlarge", horizontal: "medium" }}  
      style={{ minHeight: "calc(100vh - 80px)" }} 
      id="form" 
    >
      <Box 
        width="large" 
        background="white" 
        round="small" 
        pad="large" 
        elevation="medium"
        gap="medium"
        margin={{ top: "large" }}  
      >

        {/* Header */}
        <Box align="center" gap="medium" margin={{ bottom: "large" }}>
          <Box
            width="88px"
            height="88px"
            round="full"
            background="rgba(92, 31, 130, 0.08)"
            border={{ color: "rgba(92, 31, 130, 0.15)" }}
            align="center"
            justify="center"
          >
            <img
              src={hijabIcon}
              alt="Hijab color analysis illustration"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
          <Text size="xxlarge" weight="bold" color="brand">
            Discover Your Color Season
          </Text>
          <Text size="medium" color="dark-4" textAlign="center">
            Upload a clear photo in natural daylight.
          </Text>
          <Text size="medium" color="dark-4" textAlign="center">
            We'll recommend hijab colors that complement your complexion.
          </Text>
        </Box>

        {/* Form */}
        <Form onSubmit={handleSubmit}>
         
          <FormField 
            label="Your Name (Optional)" 
            margin={{ bottom: "medium" }}
            weight="bold"
          >
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>

        
          <Box gap="small" margin={{ bottom: "medium" }}>
            <Text weight="bold">Upload Your Photo</Text>
            
            {!image ? (
              <Box gap="small">
                {/* Upload Button */}
                <Button
                  icon={<Upload />}
                  label="Choose from Device"
                  secondary
                  onClick={() => document.getElementById("file-input").click()}
                />
                <input
                  id="file-input"
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />

                {/* Camera Button */}
                <Button
                  icon={<Camera />}
                  label="Take Photo with Camera"
                  secondary
                  onClick={() => setShowCamera(true)}
                />
              </Box>
            ) : (
              
              <Box
                direction="row"
                align="center"
                gap="medium"
                pad="small"
                background="light-2"
                round="small"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <Box flex>
                  <Text weight="bold">Photo ready!</Text>
                  <Text size="small" color="dark-4">
                    {image.name || "Captured photo"}
                  </Text>
                </Box>
                <Button
                  icon={<Close />}
                  onClick={clearImage}
                  tip="Remove photo"
                  plain
                />
              </Box>
            )}
          </Box>

          {/* Photo Tips */}
          <Box 
            background="light-2" 
            pad="medium" 
            round="small" 
            gap="xsmall"
            margin={{ bottom: "medium" }}
          >
            <Text size="small" weight="bold">📸 For Best Results:</Text>
            <Text size="small">• Use natural daylight (not direct sun)</Text>
            <Text size="small">• Face the camera directly</Text>
            <Text size="small">• Remove heavy makeup if possible</Text>
            <Text size="small">• Ensure your face is clearly visible</Text>
             <Text size="small">• Wear a light -colored hijab if possible</Text>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            primary
            label={loading ? "Analyzing Your Colors..." : "Analyze My Colors"}
            disabled={!image || loading}
            size="large"
            fill="horizontal"
          />
        </Form>
      </Box>

      {/* Camera Modal */}
      {showCamera && (
        <Layer
          onEsc={() => setShowCamera(false)}
          onClickOutside={() => setShowCamera(false)}
          full
        >
          <CameraScreen
            onCapture={(blob) => {
              setImage(blob);
              setShowCamera(false);
            }}
          />
          <Box pad="small" background="dark-1">
            <Button
              label="Cancel"
              onClick={() => setShowCamera(false)}
              secondary
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
}