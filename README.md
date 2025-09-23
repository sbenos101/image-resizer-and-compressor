# image-resizer-and-compressor
A locally hosted web-based tool that allows the user to batch compress images, resize them to 550 × 550px, strip all associated meta data, reduce pixel density to 96 dpi, and export them as individual JPG files for direct use on www.cwberry.com.

Node.js is required to run the application. The following command prompts need to be run in advance of operation:

npm init -y / npm install express multer sharp uuid / npm install -g nodemon / nodemon server.js / npm start

Key Features of the Image Compressor / Resizer (v1) are listed below:

•	Upload multiple images at once (up to 50)
•	Resize all images to 550 × 550px (cropped to fit)
•	Convert all images to JPG from PNG, JPEG / JPG, WEBP, TIFF
•	Show a progress bar and “Processing X of Y images” while images are being compressed
•	Display thumbnails with download links on the frontend
•	Export each compressed image individually
•	Strip metadata to reduce file size
•	Reduce DPI to 96
