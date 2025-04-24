import cv2
import numpy as np
from ultralytics import YOLO
import tempfile
import os
from pathlib import Path
from tqdm import tqdm

class VideoProcessor:
    def __init__(self, model_path="best.pt"):
        """
        Initialize the video processor with YOLOv8 model
        Args:
            model_path (str): Path to the YOLOv8 model weights
        """
        self.model = YOLO(model_path)
        
    def process_video(self, input_video_path, output_video_path=None):
        """
        Process a video file using YOLOv8 model
        Args:
            input_video_path (str): Path to the input video file
            output_video_path (str, optional): Path to save the processed video
        Returns:
            str: Path to the processed video file
        """
        if output_video_path is None:
            # Create a temporary file for the output video
            temp_dir = tempfile.gettempdir()
            output_video_path = os.path.join(temp_dir, f"processed_{Path(input_video_path).name}")
        
        # Open the video file
        cap = cv2.VideoCapture(input_video_path)
        
        # Get video properties
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Create video writer
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))
        
        try:
            # Create progress bar
            pbar = tqdm(total=total_frames, desc="Processing video")
            
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break
                
                # Run YOLOv8 inference on the frame
                results = self.model(frame)
                
                # Process the results
                annotated_frame = results[0].plot()
                
                # Write the processed frame
                out.write(annotated_frame)
                
                # Update progress bar
                pbar.update(1)
                
            pbar.close()
                
        finally:
            # Release resources
            cap.release()
            out.release()
        
        return output_video_path

    def process_video_from_bytes(self, video_bytes, output_filename="processed_video.mp4"):
        """
        Process video from bytes (useful for web uploads)
        Args:
            video_bytes (bytes): Video file in bytes
            output_filename (str): Name for the output video file
        Returns:
            str: Path to the processed video file
        """
        # Create a temporary file for the input video
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_input:
            temp_input.write(video_bytes)
            temp_input_path = temp_input.name
        
        # Create output path in the processed folder
        output_path = os.path.join('processed', output_filename)
        
        try:
            # Process the video
            processed_path = self.process_video(temp_input_path, output_path)
            return processed_path
        finally:
            # Clean up the temporary input file
            if os.path.exists(temp_input_path):
                os.unlink(temp_input_path)

# Example usage:
if __name__ == "__main__":
    # Initialize the video processor
    processor = VideoProcessor()
    
    # Example of processing a video file
    # processed_video_path = processor.process_video("input_video.mp4")
    
    # Example of processing video from bytes (for web upload)
    # with open("input_video.mp4", "rb") as f:
    #     video_bytes = f.read()
    # processed_video_path = processor.process_video_from_bytes(video_bytes) 