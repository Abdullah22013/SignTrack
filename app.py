from flask import Flask, request, send_file, jsonify, Response, send_from_directory
from flask_cors import CORS
from video_processor import VideoProcessor
import os
from werkzeug.utils import secure_filename
import logging
import json
import glob

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the video processor
processor = VideoProcessor()

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(PROCESSED_FOLDER):
    os.makedirs(PROCESSED_FOLDER)

# Counter file path
COUNTER_FILE = 'video_counter.json'

def get_next_video_number():
    if os.path.exists(COUNTER_FILE):
        with open(COUNTER_FILE, 'r') as f:
            data = json.load(f)
            return data.get('count', 0) + 1
    return 1

def save_video_number(number):
    with open(COUNTER_FILE, 'w') as f:
        json.dump({'count': number}, f)

def get_latest_processed_video():
    """Get the filename of the latest processed video"""
    files = glob.glob(os.path.join(PROCESSED_FOLDER, '*_out.mp4'))
    if not files:
        return None
    # Sort files by modification time, newest first
    latest_file = max(files, key=os.path.getmtime)
    return os.path.basename(latest_file)

@app.route('/api/latest-video', methods=['GET'])
def get_latest_video():
    """Get information about the latest processed video"""
    latest_filename = get_latest_processed_video()
    if not latest_filename:
        return jsonify({'error': 'No processed videos found'}), 404
    
    return jsonify({
        'success': True,
        'filename': latest_filename,
        'video_url': f'/processed/{latest_filename}'
    })

@app.route('/api/all-videos', methods=['GET'])
def get_all_videos():
    """Get information about all processed videos"""
    files = glob.glob(os.path.join(PROCESSED_FOLDER, '*_out.mp4'))
    if not files:
        return jsonify({'success': False, 'videos': []}), 200
    
    # Sort files by modification time, newest first
    files.sort(key=os.path.getmtime, reverse=True)
    
    videos = []
    for file_path in files:
        filename = os.path.basename(file_path)
        videos.append({
            'filename': filename,
            'video_url': f'/processed/{filename}'
        })
    
    return jsonify({
        'success': True,
        'videos': videos
    })

@app.route('/processed/<filename>')
def serve_processed_video(filename):
    """Serve processed videos from the processed folder"""
    return send_from_directory(PROCESSED_FOLDER, filename)

@app.route('/api/process-video', methods=['POST'])
def process_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
    
    video_file = request.files['video']
    if video_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Get next video number
        video_number = get_next_video_number()
        save_video_number(video_number)
        
        logger.info(f"Processing video number: {video_number}")
        
        # Read the video file
        video_bytes = video_file.read()
        logger.info("Video file read successfully")
        
        # Process the video
        logger.info("Starting video processing...")
        output_filename = f"{video_number}_out.mp4"
        processed_video_path = processor.process_video_from_bytes(
            video_bytes, 
            output_filename=output_filename
        )
        logger.info(f"Video processing completed. Output saved to: {processed_video_path}")
        
        if not os.path.exists(processed_video_path):
            raise FileNotFoundError(f"Processed video not found at {processed_video_path}")

        # Return the video information
        return jsonify({
            'success': True,
            'video_number': video_number,
            'filename': output_filename,
            'video_url': f'/processed/{output_filename}'
        })
    
    except Exception as e:
        logger.error(f"Error processing video: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/download-video/<video_id>', methods=['GET'])
def download_video(video_id):
    if video_id not in processed_videos:
        return jsonify({'error': 'Video not found'}), 404
    
    video_path = processed_videos[video_id]
    if not os.path.exists(video_path):
        return jsonify({'error': 'Video file not found'}), 404
    
    return send_file(
        video_path,
        mimetype='video/mp4',
        as_attachment=True,
        download_name='processed_video.mp4'
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000) 