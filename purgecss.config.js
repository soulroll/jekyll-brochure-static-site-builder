const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, '_site/**/*.html'), // Target Jekyll output directory
    path.join(__dirname, '_site/**/*.js')    // Include any JS files
  ],
  css: [path.join(__dirname, 'assets/css/*.css')], // Path to your output CSS
  output: path.join(__dirname, '_site/assets/css/'), // Output directory for cleaned CSS
  safelist: {
    standard: [/^keep-me$/] // Add any patterns you want to keep
  }
};
