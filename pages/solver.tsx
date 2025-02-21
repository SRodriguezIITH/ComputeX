import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import "@/app/globals.css";
import { useMediaQuery } from "@mui/material";


const baseURL = "https://computex-backend.vercel.app";



export default function Home() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const isMobile = useMediaQuery("(max-width: 768px)");
  



  const handleSubmit = async () => {
    if (!canvasRef.current) return;
  
    setLoading(true);
    setError(null);
    setResult(null);
  
    try {
      // Export canvas to image
      const dataURL = await canvasRef.current.exportImage("png");
      const blob = await fetch(dataURL).then((res) => res.blob());
    
      // Prepare FormData
      const formData = new FormData();
      formData.append("file", blob, "equation.png");
    
      // Send request and expect a Blob (image)
      const response = await axios.post(`${baseURL}/g`, formData, {
        validateStatus: (status) => status < 500, // Handle only client errors
        responseType: "json",
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },);
    
      console.log("Server response:", response);
    
      if (!response || !response.data) {
        throw new Error("Empty response from server.");
      }

      //GET
      try {
        const response = await axios.get(`${baseURL}/out`, {
          responseType: "blob",
        });
      
        console.log("Server response:", response);
      
        if (!response || !response.data) {
          throw new Error("Empty response from server.");
        }
      
        // Convert Blob to Base64 using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string; // 
          console.log("Base64 Image URL:", base64data);
          setResult(base64data as string);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
      

      console.log("check", result);
      
    
      // if (axios.isAxiosError(error)) {
      //   if (!error.response) {
      //     // Handle network error (e.g., server is down)
      //     setError("Network Error: Unable to reach the server.");
      //   } else if (error.response.status === 400) {
      //     setError("Bad Request: The server could not process the request.");
      //   } else if (error.response.status === 403) {
      //     setError("Forbidden: You don't have permission to access this resource.");
      //   } else if (error.response.status === 404) {
      //     setError("Not Found: The requested resource does not exist.");
      //   } else if (error.response.status === 500) {
      //     setError("Server Error: The server encountered an error.");
      //   } else {
      //     setError(`Error ${error.response.status}: ${error.message}`);
      //   }
      // } else {
      //   setError("Unexpected error occurred. Please try again.");
      // }
    } finally {
      setLoading(false);
    }
  }    
  
  

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.resetCanvas();
      setResult(null);
      setError(null);
    }
  };

  const handleToolChange = (_event: React.MouseEvent<HTMLElement>, newTool: "pen" | "eraser" | null) => {
    if (newTool !== null) {
      setTool(newTool);
      if (canvasRef.current) {
        canvasRef.current.eraseMode(newTool === "eraser");
      }
    }
  };
  
  

  return (
    <div className="flex flex-col" style={{backgroundColor:"transparent"}}>
       <Navbar />
    <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#750000" paddingBottom={10} overflow="hidden">
     
      <Card sx={{ width: 800, p: 3, boxShadow: 3, padding: 5 }}>
        <CardContent>
          {/* <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Handwritten Equation Solver
          </Typography> */}

          {/* Tool Selector */}
          <Box display="flex" justifyContent="center" mb={2}>
            <ToggleButtonGroup value={tool} exclusive onChange={handleToolChange} aria-label="tool selection">
              <ToggleButton value="pen" aria-label="pen">
                &#9998; Pen 
              </ToggleButton>
              <ToggleButton value="eraser" aria-label="eraser">
                &#128465; Eraser 
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>


          {/* Sketch Canvas */}
          <Box
            sx={{
              border: "2px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactSketchCanvas
              ref={canvasRef}
              width="800px"
              height={isMobile? "auto": "400px"}
              strokeWidth={4}
              strokeColor="black"
            />
          </Box>

          {error && <Typography color="error" mt={2} textAlign="center">{error}</Typography>}
          {result && (
            <Typography mt={2} fontSize={18} fontWeight="bold" textAlign="center">
              Result: {result}
            </Typography>
          )}
        </CardContent>

        {/* Action Buttons */}
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
          <Button variant="contained" color="error" onClick={handleClear}>
            Clear
          </Button>
        </CardActions>

      </Card>
      {isMobile? <br/>: null}
      <Box sx={{ mt: 2, textAlign: "center", fontWeight: "bold", fontSize: 18, marginLeft: isMobile? 0: 10, backgroundColor: "#1e1e1e", borderRadius: 5, padding: 2, minWidth: 200}}>
          Result: 
          {result && (
            <Image 
              src={result as string} 
              alt="Processed Equation" 
              width={350} 
              height={200} 
              layout="intrinsic"
            />
          )}

        </Box>
      </Box>
          
    </div>
  );
}
