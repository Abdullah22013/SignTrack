# SignTrack: Traffic Sign Detection using YOLOv8

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement & Scope](#problem-statement--scope)
3. [Dataset & Preprocessing](#dataset--preprocessing)
4. [Model Architecture & Training](#model-architecture--training)
5. [Evaluation Metrics & Results](#evaluation-metrics--results)
6. [Web Application](#web-application)

   * [Architecture](#architecture)
   * [Backend (Flask)](#backend-flask)
   * [Frontend (React)](#frontend-react)
7. [MLOps & Deployment](#mlops--deployment)
8. [Installation & Usage](#installation--usage)
9. [Future Work](#future-work)
10. [Contributions](#contributions)
11. [License](#license)

---

## Project Overview

**SignTrack** is a real‑time traffic sign detection system built on the latest YOLOv8 object‑detection framework. It processes images or video streams (e.g., dashcam, CCTV) to accurately identify and annotate traffic signs—enhancing road‑safety applications in autonomous vehicles and urban monitoring systems.&#x20;

---

## Problem Statement & Scope

* **Goal**: Develop a system that detects and recognizes various traffic signs (e.g., speed limits, stop signs, traffic lights) in real time to support autonomous navigation and road‑safety monitoring.
* **Inputs**: Still images or video streams from dashcams, surveillance cameras, or vehicle sensors.
* **Dataset**: 4,969 annotated traffic‑sign samples, split into training, validation, and test sets.
* **Outputs**: Annotated frames with bounding boxes, class labels, and confidence scores.
* **Target Users**:

  * Autonomous Vehicles & ADAS systems
  * Traffic‑monitoring authorities
  * Urban planners and smart‑city developers&#x20;

---

## Dataset & Preprocessing

1. **Primary Dataset**:

   * “Traffic Sign Detection Dataset” (4,969 images), covering 15 classes including speed limits, stop signs, and traffic lights.
2. **Planned Extensions**:

   * GTSRB (German Traffic Sign Benchmark)
   * Indian Traffic Sign Datasets (multiple sources)
3. **Preprocessing Steps**:

   * Image resizing and normalization
   * Data augmentation (random rotations, brightness adjustments, occlusion simulation) to address class imbalance and lighting variation&#x20;

---

## Model Architecture & Training

* **Base Model**: [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics)
* **Training Framework**: PyTorch 2.0 with GPU acceleration (Tesla T4 ×2, 16 GB VRAM each)
* **Key Hyperparameters**:

  * Batch sizes: 8, 16, 32, 64
  * Epochs: 10, 50, 100
  * Optimizer: SGD/Adam (tuned per experiment)
* **Loss Components**:

  * Box loss, classification loss, distribution focal loss (DFL)
* **Inference Speed**: \~2.4 ms per image (supporting real‑time use cases)&#x20;

---

## Evaluation Metrics & Results

| Metric            | Overall (%) | Top Classes                              |
| ----------------- | ----------- | ---------------------------------------- |
| **Precision**     | 94.2        | Stop Sign: 97.3, Speed Limits: 92–100    |
| **Recall**        | 90.6        | Stop Sign: 98.8, Speed Limits: 94.1–99.1 |
| **mAP\@0.5**      | 95.7        |                                          |
| **mAP\@0.5–0.95** | 82.97       |                                          |
| **Inference**     | 2.4 ms/img  |                                          |

* **Notable Gaps**:

  * Red Light recall: 69.4%
  * Green Light recall: 74.1%
* **Class Imbalance** and **lighting/occlusion** are key challenges highlighted in error analyses.&#x20;

---

## Web Application

### Architecture

Client‑server design with a React frontend and Flask backend, communicating over RESTful APIs.&#x20;

### Backend (Flask)

* **Model Loading**: Loads YOLOv8 weights (`weights/best.pt`) at startup
* **Prediction Endpoint** (`/predict`):

  1. Receive base64‑encoded image
  2. Decode → OpenCV → YOLOv8 inference
  3. Draw bounding boxes & labels
  4. Encode annotated image → JSON response
* **Static Serving**: Serves built React assets
* **Production**: Gunicorn WSGI for reliable performance&#x20;

### Frontend (React)

* **Upload UI**: Drag‑and‑drop or file selector for images/videos
* **API Calls**: `fetch` or `axios` to `/predict`
* **Result Display**: Renders annotated images with overlayed detection boxes
* **Build**: `npm run build` → static assets in `frontend/build`&#x20;

---

## MLOps & Deployment

* **Containerization**: Dockerfile bundles Python environment, model weights, and built frontend.
* **CI/CD**: GitHub Actions workflow automates:

  1. Dependency installation (Node.js & Python)
  2. Frontend build & backend packaging
  3. Docker image build & push to container registry
* **Deployment Targets**: AWS ECS, Google Cloud Run, Azure App Service, Kubernetes clusters&#x20;

---

## Installation & Usage

1. **Clone Repository**

   ```bash
   git clone https://github.com/Aarya-Gupta/SignTrack.git
   cd SignTrack
   ```
2. **Backend Dependencies**

   ```bash
   pip install -r requirements.txt
   ```
3. **Frontend Dependencies**

   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```
4. **Run Locally**

   ```bash
   # Start Flask (development)
   export FLASK_APP=app.py
   flask run

   # OR with Gunicorn
   gunicorn -w 4 app:app
   ```
5. **Access**
   Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Future Work

* **Model Refinement**: Improve detection of red/green lights via hyperparameter tuning and class‑specific augmentation
* **Real-Time Video Streams**: Extend UI to handle webcam/video uploads with continuous detection
* **Dataset Expansion**: Incorporate additional national/regional traffic‑sign datasets
* **Edge Deployment**: Optimize model for mobile/edge devices (TensorRT, ONNX)
* **Monitoring & Logging**: Integrate Prometheus/Grafana for performance tracking&#x20;

---

## Contributions

| Member                   | Role                                                               |
| ------------------------ | ------------------------------------------------------------------ |
| **Aarya Gupta**          | Model training, EDA, backend API development, performance analysis |
| **Abdullah Shujat**      | Frontend UI, data collection & augmentation, literature review     |
| **Sargun Singh Khurana** | System integration, UI testing, CI/CD pipeline, debugging          |

---

## License

This project is released under the [MIT License](LICENSE).
