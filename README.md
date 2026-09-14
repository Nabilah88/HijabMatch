# HijabMatch

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![Django](https://img.shields.io/badge/Django-REST%20Framework-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![OpenCV](https://img.shields.io/badge/OpenCV-4.x-critical.svg)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Image%20Segmenter-orange.svg)
![TensorFlow Lite](https://img.shields.io/badge/TFLite-256x256%20model-yellow.svg)

AI-powered seasonal color analysis and hijab color recommendations for women who wear hijab.

Hijab Match helps women find hijab colors that enhance their natural features using seasonal color analysis, skin tone detection, and computer vision. The app analyzes a user's photo, detects skin tone and undertone, identifies the hijab region, and generates personalized hijab color recommendations.

## Features

- Seasonal color Analysis
- AI-Powered Skin Tone Detection
- Hijab Region Segmentation (MediaPipe)
- Hijab Color Recommendations
- Hijab Recoloring Previews

## Why Hijab Match?

Hijab Match was created by a woman who struggled with buying hijabs online-- many colors washed out her features. With an AI and IT background, she built Hijab Match with a purpose to help herself and other struggled hijabi women out there to choose hijab colors that truly suit them.

## Screenshots

### Form

![Form](https://raw.githubusercontent.com/Nabilah88/HijabMatch/master/frontend/src/assets/screenshots/form.gif)

### Upload Photo

![Upload Photo](https://raw.githubusercontent.com/Nabilah88/HijabMatch/master/frontend/src/assets/screenshots/upload_photo.gif)

### Hijab Color Recommendations

![Color Recommendations](https://raw.githubusercontent.com/Nabilah88/HijabMatch/master/frontend/src/assets/screenshots/color_suggestions.gif)


### Hijab Recoloring Preview

![Hijab Recoloring](https://raw.githubusercontent.com/Nabilah88/HijabMatch/master/frontend/src/assets/screenshots/hijab_recoloring.gif)


## Technologies used

Frontend

- React.js
- JavaScript
- Grommet UI
- Vite

Backend

- Python
- Django
- Django REST Framework
- SQLite

Computer Vision/ AI

- MediaPipe Image Segmenter
- TensorFlow Lite (.tflite 256x256 model)
- Haar Cascade face detection
- HSV + LAB color analysis
- K-means clustering

Development tools

- VS Code
- Git/GitHub

## Project Structure

hijabApp/
├── LICENSE
├── .gitignore
├── backend/
│ ├── api/
│ │ ├── migrations/
│ │ ├── color_recommendations.py
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── urls.py
│ │ ├── views.py
│ │ └── vision/
│ │ └── selfie_multiclass_256x256.tflite
│ ├── backend/
│ │ ├── settings.py
│ │ └── urls.py
│ └── manage.py
├── frontend/
│ └── src/
│ ├── assets/
│ └── Components/
│ ├── Company/
│ ├── Features/
│ ├── Footer/
│ ├── Form/
│ ├── Hero/
│ ├── Info1/
│ ├── Navbar/
│ └── Steps/

Company → About, Contact, FAQ, Privacy, search-related pages

Features → Hijab Match feature sections

Footer → Footer components/data

Form → User input, camera, results, and Hijab Match functionality

Hero → Homepage and Hijab Match hero sections

Info1 → Color comparison, examples, testimonials

Navbar → Navigation components

Steps → How Hijab Match works

## AI and Image Processing

Hijab Match is a web application that performs skin tone and undertone analysis and provides recommendations for hijab colors based on seasonal color analysis and the user's skin tone.

It combines machine-learning-based image segmentation with traditional computer vision and color analysis.

For seasonal color analysis, Haar Cascade face detection is used to locate facial regions. HSV-based-skin-pixel filtering is then applied, followed by LAB color analysis to estimate the user's undertone and map the result to seasonal color category.

For image segmentation, MediaPipe's Selfie Multiclass Image Segmenter is used to identify the regions of the person, which are then processed to isolate the hijab region. K-means clustering in the LAB color space is used to distinguish the primary hijab region from other candidate regions.

For hijab recoloring, the hijab color is changed by converting the image into the HSV color space and replacing the hue and saturation with the target color while preserving the original lighting and shading. Then, the algorithm adjusts how much brightness is blended based on how light or dark the target color is, ensuring that extreme colors like black or white still look natural and avoid becoming washed out or muddy.A feathered (soft‑edge) mask is applied around the hijab region so the recolored area transitions smoothly into the original image, preventing harsh edges or visible cut‑out lines. The recoloring process keeps the original shadows, highlights, and fabric folds of the hijab intact, making the recolored result look realistic rather than flat or artificially painted.

## Future Improvements

Improve undertone classification: The current undertone classification is highly dependent on fixed thresholds. A trained KNN classifier could be explored to improve the consistency of undertone classification.

Improve seasonal color classification: The current seasonal color analysis uses rule-based logic. KNN and SVM models could be explored to provide more consistent and data-driven seasonal color classification.

Improve skin region extraction: Haar cascade face detection can be inaccurate in some cases. Exploring more modern face or skin-region extraction methods could improve the accuracy of cheek and forehead sampling.

Improve hijab recoloring: The current recoloring method can sometimes produce colors that appear too overpowering or unnatural. Exploring generative AI could improve the realism of the color swatches and their appearance on user's images.

Add virtual fitting: Adding a virtual fitting feature could allow users how different styles of hijab look on their image, making the system more interactive and useful.

## Installation & Usage

### Backend (Django)

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Frontend (React)

cd frontend
npm install
npm run dev

## 🔌 API Endpoints

### Analyze User

POST `/api/analyze_user/`
Uploads an image and returns:

- undertone
- season
- recommended colors
- avoid colors
- neutral colors

### Recolor Hijab

POST `/api/recolor_hijab/`
Uploads an image + target hex color and returns a recolored hijab preview.

### Recolor Swatches

POST `/api/recolor_swatches/`
Uploads an image + list of hex colors and returns up to 8 recolored thumbnails.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome!
If you’d like to improve HijabMatch, please:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

Please ensure your code follows the existing style and includes relevant documentation.
