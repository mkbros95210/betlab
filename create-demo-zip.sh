#!/bin/bash

# Create demo zip file for testing the converter

echo "📦 Creating demo project ZIP file..."

# Create a temporary directory for the demo
DEMO_DIR="demo-project"
ZIP_NAME="demo-portfolio.zip"

# Clean up any existing demo directory
rm -rf "$DEMO_DIR"
rm -f "$ZIP_NAME"

# Copy demo files to temporary directory
cp -r demo "$DEMO_DIR"

# Create the ZIP file
zip -r "$ZIP_NAME" "$DEMO_DIR"

# Clean up temporary directory
rm -rf "$DEMO_DIR"

echo "✅ Demo ZIP file created: $ZIP_NAME"
echo "📁 You can now upload this file to test the converter!"
echo ""
echo "Contents:"
echo "- index.html (Portfolio homepage)"
echo "- styles.css (Modern CSS with animations)"
echo "- script.js (Interactive JavaScript)"
echo "- images/profile.jpg (Placeholder image)"
echo ""
echo "🚀 Upload $ZIP_NAME to the converter at http://localhost:3000"