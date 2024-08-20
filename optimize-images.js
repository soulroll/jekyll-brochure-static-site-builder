const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '_site/assets/images';
const tempDir = '_site/assets/images_temp'; // Temporary directory within the project

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff'];

// Ensure the temporary directory exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Function to process a single file
const processFile = (inputFile) => {
  const ext = path.extname(inputFile).toLowerCase();

  if (supportedFormats.includes(ext)) {
    const tempFile = path.join(tempDir, path.basename(inputFile)); // Temporary file path within the project

    sharp(inputFile)
      .toFormat(ext === '.jpeg' ? 'jpeg' : ext.slice(1), { quality: 75 })
      .toFile(tempFile) // Save to the project-based temporary file
      .then(() => {
        fs.renameSync(tempFile, inputFile); // Replace the original file with the optimized file
        console.log(`Optimized ${inputFile}`);
      })
      .catch(err => console.error(`Error optimizing ${inputFile}:`, err));
  } else {
    console.log(`Skipping unsupported file format: ${inputFile}`);
  }
};

// Function to traverse directories and process images
const processDirectory = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      processDirectory(fullPath); // Recursively process subdirectory
    } else {
      processFile(fullPath); // Process file
    }
  });
};

// Start processing from the input directory
processDirectory(inputDir);

// Ensure the cleanup of the temporary directory happens after all files are processed
setTimeout(() => {
  fs.promises.rm(tempDir, { recursive: true, force: true })
    .then(() => console.log(`Temporary directory ${tempDir} removed`))
    .catch(err => console.error(`Error removing temporary directory ${tempDir}:`, err));
}, 5000); // Adjust the timeout if needed based on the size of your image set