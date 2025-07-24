import React, { useState, useRef } from 'react'
import { Upload, Download, FileCode, Loader, CheckCircle, AlertCircle } from 'lucide-react'

interface ConversionStatus {
  stage: string
  progress: number
  message: string
}

interface ConversionResult {
  success: boolean
  downloadUrl?: string
  error?: string
}

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionStatus, setConversionStatus] = useState<ConversionStatus | null>(null)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/zip') {
      setFile(droppedFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/zip') {
      setFile(selectedFile)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleConvert = async () => {
    if (!file) return

    setIsConverting(true)
    setResult(null)
    setConversionStatus({ stage: 'Uploading', progress: 0, message: 'Preparing file upload...' })

    try {
      const formData = new FormData()
      formData.append('zipFile', file)

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Failed to read response')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split('\n').filter(line => line.trim())
        
        for (const line of lines) {
          try {
            const data = JSON.parse(line)
            if (data.type === 'progress') {
              setConversionStatus({
                stage: data.stage,
                progress: data.progress,
                message: data.message
              })
            } else if (data.type === 'complete') {
              setResult({
                success: true,
                downloadUrl: data.downloadUrl
              })
              setIsConverting(false)
              return
            } else if (data.type === 'error') {
              setResult({
                success: false,
                error: data.error
              })
              setIsConverting(false)
              return
            }
          } catch (e) {
            // Ignore JSON parse errors for partial chunks
          }
        }
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
      setIsConverting(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setResult(null)
    setConversionStatus(null)
    setIsConverting(false)
  }

  return (
    <div className="upload-container">
      <h1>Static to React Converter</h1>
      <p>Upload a ZIP file containing your static HTML/CSS/JS project and convert it to a modern React + Vite + TypeScript + Supabase application while maintaining 100% visual fidelity.</p>

      {!result && (
        <div
          className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <div className="upload-icon">
            <Upload size={48} />
          </div>
          <h3>Drop your ZIP file here or click to browse</h3>
          <p>Supports .zip files containing HTML, CSS, JS, and assets</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            onChange={handleFileSelect}
            className="file-input"
          />
        </div>
      )}

      {file && !result && (
        <div className="file-info">
          <p><strong>Selected file:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
          <button onClick={handleConvert} disabled={isConverting}>
            {isConverting ? (
              <>
                <Loader className="inline w-4 h-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <FileCode className="inline w-4 h-4 mr-2" />
                Convert to React
              </>
            )}
          </button>
        </div>
      )}

      {conversionStatus && (
        <div className="conversion-status">
          <h3>Converting: {conversionStatus.stage}</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${conversionStatus.progress}%` }}
            />
          </div>
          <p>{conversionStatus.message}</p>
        </div>
      )}

      {result && (
        <div className="result">
          {result.success ? (
            <div className="success-message">
              <CheckCircle className="inline w-5 h-5 mr-2" />
              <strong>Conversion completed successfully!</strong>
              <p>Your static project has been converted to a modern React + TypeScript + Supabase application.</p>
              
              {result.downloadUrl && (
                <a href={result.downloadUrl} download className="download-link">
                  <Download className="inline w-4 h-4 mr-2" />
                  Download Converted Project
                </a>
              )}
            </div>
          ) : (
            <div className="error-message">
              <AlertCircle className="inline w-5 h-5 mr-2" />
              <strong>Conversion failed:</strong>
              <p>{result.error}</p>
            </div>
          )}
          
          <button onClick={resetForm}>
            Convert Another Project
          </button>
        </div>
      )}

      <div className="features">
        <h2>What this converter does:</h2>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>✅ Extracts and analyzes your static project</li>
          <li>✅ Converts HTML pages to React components</li>
          <li>✅ Preserves all CSS, animations, and visual styling</li>
          <li>✅ Migrates JavaScript logic to React hooks</li>
          <li>✅ Sets up TypeScript configuration</li>
          <li>✅ Integrates Supabase for backend functionality</li>
          <li>✅ Creates authentication system</li>
          <li>✅ Adds React Router for navigation</li>
          <li>✅ Maintains 100% visual fidelity</li>
          <li>✅ Generates production-ready code</li>
        </ul>
      </div>
    </div>
  )
}

export default App