# Supplementary Material for Fusion2Print: Deep Flash–Non-Flash Fusion for Contactless Fingerprint Matching

This document lists the folders in the repository, describes their purpose, and points to the primary scripts / notebooks / resources for reproduction.


## 1. Camera App (Data Collection)
React Native Expo app used to capture paired flash / non-flash fingerprint images.

- Overview / instructions: [CameraApp/README.md](CameraApp/README.md)  
- Main app entry: [CameraApp/App.js](CameraApp/App.js)  
- Expo config: [CameraApp/app.json](CameraApp/app.json)  
- Server for uploads: [CameraApp/server/backend.js](CameraApp/server/backend.js)  
- Node dependencies: [CameraApp/package.json](CameraApp/package.json)  
- iOS project file (build settings, pods): [CameraApp/ios/DataColl2.xcodeproj/project.pbxproj](CameraApp/ios/DataColl2.xcodeproj/project.pbxproj)

Notes:
- Use `npx expo start` to run the app (see [CameraApp/package.json](CameraApp/package.json)).
- The server side saves images to a local uploads folder; see [CameraApp/server/backend.js](CameraApp/server/backend.js).


## 2. Spectral Domain Noise Attenuation
Notebooks implementing frequency-domain subtraction and filtering to attenuate noise.

- Main notebook: [spectral-domain-noise-attenuation/frequency-domain-subtraction-process.ipynb](spectral-domain-noise-attenuation/frequency-domain-subtraction-process.ipynb)

Notes:
- Contains functions for FFT-based subtraction, cutoff selection, and post-processing.
- Requires Python imaging and scientific stack (OpenCV, NumPy, SciPy, scikit-image, PyTorch where used).

## 3. Dual-Encoder Fusion Net (Research notebook)
Reference notebook to experiment with attention-based fusion across flash / non-flash channels.

- Notebook: [dual-encoder-fusion-net/dual-encoder-fusion-net-training.ipynb](dual-encoder-fusion-net/dual-encoder-fusion-net-training.ipynb)

Notes:
- Defines encoders, attention fusion modules, training and loss utilities.


## 4. Color Space Ridge Enhancement
Experiments and U-Net training for ridge enhancement and RGB contrast analysis.

- RGB channel contrast analysis: [ color-space-ridge-enhancement/RGB-contrast.ipynb]( color-space-ridge-enhancement/RGB-contrast.ipynb)  
- U-Net training and utilities: [ color-space-ridge-enhancement/UNet-optimization-training.ipynb]( color-space-ridge-enhancement/UNet-optimization-training.ipynb)

Notes:
- Notebooks implement datasets, transformations, custom losses (edge loss, SSIM), and training loops.  
- See dataset path placeholders inside notebooks before running.


## 5. Triplet Distillation Network
Triplet training and distillation experiments for embedding learning.

- Notebook: [triplet-distil-net/triplet-distil-net-training.ipynb](triplet-distil-net/triplet-distil-net-training.ipynb)

Notes:
- Includes triplet generation, semi-hard mining, teacher-student distillation hooks and evaluation code.


## 6. e2e-fusion-2-print (End-to-end Fusion & Evaluation)
End-to-end fusion network, spatial transforms and evaluation code for matching.

- Fusion and training notebook: [e2e-fusion-2-print/f2p.ipynb](e2e-fusion-2-print/f2p.ipynb)  
- Spatial transform / alignment utilities: [e2e-fusion-2-print/spatial_transform.ipynb](e2e-fusion-2-print/spatial_transform.ipynb)

Notes:
- Contains dataset classes, model (DualEncoderFusionNet), collate function, training loops, embedding extraction and evaluation code (ROC / EER).
- Update dataset root variables before running.


## 7. Verification Experiments
Scripts for verification benchmarking (Verifinger / DeepPrint) and plotting metrics.

- Score computation & plotting: [verification/scores.ipynb](verification/scores.ipynb)  
- Simulated ROC / plotting utilities: [verification/test.ipynb](verification/test.ipynb)

Notes:
- Some cells expect local SDKs (Verifinger) or external pretrained models — path placeholders are present.
- Embedding save/load utilities and ROC / FAR/FRR plotting are available.


## Requirements (high level)
- Python 3.8+ with: numpy, matplotlib, scipy, scikit-image, OpenCV, torch, torchvision, pytorch-msssim, PIL, tqdm, sklearn  
- Node / Expo for CameraApp (see [CameraApp/package.json](CameraApp/package.json))  
- Optional: third-party SDKs (Verifinger, DeepPrint) as noted in notebooks.


## Reproducibility tips
- Set dataset path variables in notebooks before running (.e.g, `s1_dir`, `s2_dir`, `<DATASET>` placeholders).  
- Use virtual environments for Python dependencies.  
- For CameraApp: run `npx expo start` (see [CameraApp/server/readme.md](CameraApp/server/readme.md)).
