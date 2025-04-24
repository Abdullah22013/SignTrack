import cv2
import numpy as np
from ultralytics import YOLO
import tempfile
import os
from pathlib import Path
from tqdm import tqdm
import json

class VideoProcessor:
    def __init__(self, model_path="best.pt"):
        """
        Initialize the video processor with YOLOv8 model
        Args:
            model_path (str): Path to the YOLOv8 model weights
        """
        self.model = YOLO(model_path)
        self.detected_labels = set()  # Store unique detected labels
        
    def process_video(self, input_video_path, output_video_path=None, suggested_labels=None):
        """
        Process a video file using YOLOv8 model
        Args:
            input_video_path (str): Path to the input video file
            output_video_path (str, optional): Path to save the processed video
            suggested_labels (list, optional): List of labels suggested by the user
        Returns:
            str: Path to the processed video file
        """
        # Reset detected labels for new video
        self.detected_labels = set()
        
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
                
                # Process the results and collect labels
                for result in results:
                    # Get class names for all detections
                    for cls in result.boxes.cls:
                        label = result.names[int(cls)]
                        self.detected_labels.add(label)
                
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

    def process_video_from_bytes(self, video_bytes, output_filename="processed_video.mp4", suggested_labels=None):
        """
        Process video from bytes (useful for web uploads)
        Args:
            video_bytes (bytes): Video file in bytes
            output_filename (str): Name for the output video file
            suggested_labels (list, optional): List of labels suggested by the user
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
            processed_path = self.process_video(temp_input_path, output_path, suggested_labels)
            
            # Save detection results
            results_filename = os.path.splitext(output_filename)[0] + '_results.json'
            results_path = os.path.join('processed', results_filename)
            self.save_detection_results(results_path, suggested_labels)
            
            return processed_path
        finally:
            # Clean up the temporary input file
            if os.path.exists(temp_input_path):
                os.unlink(temp_input_path)

    def get_detected_labels(self):
        """
        Get the list of unique labels detected in the last processed video
        Returns:
            list: List of detected labels
        """
        return list(self.detected_labels)

    def save_detection_results(self, results_path, suggested_labels=None):
        """
        Save detection results to a JSON file
        Args:
            results_path (str): Path to save the results
            suggested_labels (list, optional): List of labels suggested by the user
        """
        results = {
            'detected_labels': list(self.detected_labels),
            'suggested_labels': suggested_labels or []
        }
        
        with open(results_path, 'w') as f:
            json.dump(results, f)

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