const express = require('express');
const multer = require('multer');
const yauzl = require('yauzl');
const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const archiver = require('archiver');

const app = express();
const port = 3001;

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Middleware
app.use(express.json());
app.use('/downloads', express.static('downloads'));

class StaticToReactConverter {
  constructor(extractDir, outputDir) {
    this.extractDir = extractDir;
    this.outputDir = outputDir;
    this.components = new Set();
    this.pages = [];
    this.assets = [];
    this.cssFiles = [];
    this.jsFiles = [];
  }

  async convert(progressCallback) {
    try {
      progressCallback('Analyzing Project', 10, 'Scanning files and structure...');
      await this.analyzeProject();
      
      progressCallback('Creating Structure', 20, 'Setting up React project structure...');
      await this.setupProjectStructure();
      
      progressCallback('Converting HTML', 40, 'Converting HTML pages to React components...');
      await this.convertHtmlToReact();
      
      progressCallback('Processing Assets', 60, 'Moving and updating asset references...');
      await this.processAssets();
      
      progressCallback('Setting up Supabase', 80, 'Integrating Supabase authentication...');
      await this.setupSupabase();
      
      progressCallback('Finalizing', 95, 'Creating configuration files...');
      await this.createConfigFiles();
      
      progressCallback('Complete', 100, 'Conversion completed successfully!');
      
      return { success: true };
    } catch (error) {
      console.error('Conversion error:', error);
      return { success: false, error: error.message };
    }
  }

  async analyzeProject() {
    const files = await fs.readdir(this.extractDir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(this.extractDir, file.name);
      
      if (file.isDirectory()) {
        await this.analyzeDirectory(fullPath);
      } else {
        await this.analyzeFile(fullPath);
      }
    }
  }

  async analyzeDirectory(dirPath) {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        await this.analyzeDirectory(fullPath);
      } else {
        await this.analyzeFile(fullPath);
      }
    }
  }

  async analyzeFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const relativePath = path.relative(this.extractDir, filePath);
    
    switch (ext) {
      case '.html':
        this.pages.push({ path: filePath, name: path.basename(filePath, '.html') });
        break;
      case '.css':
      case '.scss':
        this.cssFiles.push(filePath);
        break;
      case '.js':
        this.jsFiles.push(filePath);
        break;
      case '.png':
      case '.jpg':
      case '.jpeg':
      case '.gif':
      case '.svg':
      case '.ico':
      case '.webp':
      case '.woff':
      case '.woff2':
      case '.ttf':
      case '.eot':
        this.assets.push({ path: filePath, relativePath });
        break;
    }
  }

  async setupProjectStructure() {
    // Create directory structure
    const dirs = [
      'src',
      'src/components',
      'src/pages',
      'src/styles',
      'src/assets',
      'src/assets/images',
      'src/assets/fonts',
      'src/supabase',
      'src/context',
      'public'
    ];

    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.outputDir, dir));
    }
  }

  async convertHtmlToReact() {
    for (const page of this.pages) {
      const html = await fs.readFile(page.path, 'utf8');
      const $ = cheerio.load(html);
      
      // Extract components
      await this.extractComponents($);
      
      // Convert to React component
      const reactComponent = await this.createReactComponent($, page.name);
      
      // Write React component
      const componentPath = path.join(this.outputDir, 'src/pages', `${this.capitalizeFirst(page.name)}.tsx`);
      await fs.writeFile(componentPath, reactComponent);
    }
  }

  async extractComponents($) {
    // Extract navbar
    const navbar = $('nav, .navbar, .navigation, header');
    if (navbar.length > 0) {
      this.components.add('Navbar');
      await this.createComponent('Navbar', navbar.first().html() || '');
    }

    // Extract footer
    const footer = $('footer, .footer');
    if (footer.length > 0) {
      this.components.add('Footer');
      await this.createComponent('Footer', footer.first().html() || '');
    }
  }

  async createComponent(name, html) {
    const reactHtml = this.convertHtmlToJsx(html);
    const component = `import React from 'react';

const ${name}: React.FC = () => {
  return (
    ${reactHtml}
  );
};

export default ${name};`;

    const componentPath = path.join(this.outputDir, 'src/components', `${name}.tsx`);
    await fs.writeFile(componentPath, component);
  }

  async createReactComponent($, pageName) {
    const title = $('title').text() || pageName;
    const bodyHtml = $('body').html() || '';
    const reactHtml = this.convertHtmlToJsx(bodyHtml);

    const imports = [];
    imports.push("import React from 'react';");
    
    if (this.components.has('Navbar')) {
      imports.push("import Navbar from '../components/Navbar';");
    }
    if (this.components.has('Footer')) {
      imports.push("import Footer from '../components/Footer';");
    }

    const component = `${imports.join('\n')}

const ${this.capitalizeFirst(pageName)}: React.FC = () => {
  return (
    <div>
      ${this.components.has('Navbar') ? '<Navbar />' : ''}
      ${reactHtml}
      ${this.components.has('Footer') ? '<Footer />' : ''}
    </div>
  );
};

export default ${this.capitalizeFirst(pageName)};`;

    return component;
  }

  convertHtmlToJsx(html) {
    return html
      .replace(/class=/g, 'className=')
      .replace(/for=/g, 'htmlFor=')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(\w+)([^>]*?)\/>/g, '<$1$2 />')
      .replace(/(\w+)="([^"]*?)"/g, (match, attr, value) => {
        if (attr.includes('-')) {
          return `${this.toCamelCase(attr)}="${value}"`;
        }
        return match;
      });
  }

  toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async processAssets() {
    for (const asset of this.assets) {
      const destPath = path.join(this.outputDir, 'src/assets', asset.relativePath);
      await fs.ensureDir(path.dirname(destPath));
      await fs.copy(asset.path, destPath);
    }

    // Copy CSS files
    for (const cssFile of this.cssFiles) {
      const fileName = path.basename(cssFile);
      const destPath = path.join(this.outputDir, 'src/styles', fileName);
      await fs.copy(cssFile, destPath);
    }
  }

  async setupSupabase() {
    // Create Supabase client
    const supabaseClient = `import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)`;

    await fs.writeFile(path.join(this.outputDir, 'src/supabase/client.ts'), supabaseClient);

    // Create Auth Context
    const authContext = `import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}`;

    await fs.writeFile(path.join(this.outputDir, 'src/context/AuthContext.tsx'), authContext);

    // Create Login component
    const loginComponent = `import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) throw error
      navigate('/')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default Login`;

    await fs.writeFile(path.join(this.outputDir, 'src/pages/Login.tsx'), loginComponent);
  }

  async createConfigFiles() {
    // Package.json
    const packageJson = {
      name: "converted-react-app",
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc && vite build",
        preview: "vite preview"
      },
      dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.8.1",
        "@supabase/supabase-js": "^2.39.3"
      },
      devDependencies: {
        "@types/react": "^18.2.55",
        "@types/react-dom": "^18.2.19",
        "@vitejs/plugin-react": "^4.2.1",
        "typescript": "^5.2.2",
        "vite": "^5.1.0"
      }
    };

    await fs.writeFile(
      path.join(this.outputDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Vite config
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`;

    await fs.writeFile(path.join(this.outputDir, 'vite.config.ts'), viteConfig);

    // TypeScript config
    const tsConfig = {
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true
      },
      include: ["src"],
      references: [{ path: "./tsconfig.node.json" }]
    };

    await fs.writeFile(
      path.join(this.outputDir, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );

    // Environment file
    const envExample = `VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`;

    await fs.writeFile(path.join(this.outputDir, '.env.example'), envExample);

    // README
    const readme = `# Converted React Application

This project was automatically converted from a static HTML/CSS/JS project to a modern React + TypeScript + Supabase application.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Then edit \`.env\` with your Supabase credentials.

3. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Features

- ✅ React + TypeScript
- ✅ Vite for fast development
- ✅ Supabase integration
- ✅ Authentication system
- ✅ All original styling preserved
- ✅ Responsive design maintained

## Deployment

Build for production:
\`\`\`bash
npm run build
\`\`\`

Deploy to Vercel, Netlify, or any static hosting service.
`;

    await fs.writeFile(path.join(this.outputDir, 'README.md'), readme);

    // Main App component
    const appComponent = `import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
${this.pages.map(page => `import ${this.capitalizeFirst(page.name)} from './pages/${this.capitalizeFirst(page.name)}'`).join('\n')}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          ${this.pages.map(page => 
            `<Route path="${page.name === 'index' ? '/' : '/' + page.name}" element={<${this.capitalizeFirst(page.name)} />} />`
          ).join('\n          ')}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App`;

    await fs.writeFile(path.join(this.outputDir, 'src/App.tsx'), appComponent);

    // Main entry point
    const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

    await fs.writeFile(path.join(this.outputDir, 'src/main.tsx'), mainTsx);

    // HTML template
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Converted React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    await fs.writeFile(path.join(this.outputDir, 'index.html'), indexHtml);
  }
}

// API endpoint for conversion
app.post('/api/convert', upload.single('zipFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const zipPath = req.file.path;
  const extractDir = path.join('temp', `extract_${Date.now()}`);
  const outputDir = path.join('temp', `output_${Date.now()}`);

  // Set up SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const sendProgress = (stage, progress, message) => {
    res.write(JSON.stringify({ type: 'progress', stage, progress, message }) + '\n');
  };

  try {
    // Extract ZIP file
    sendProgress('Extracting', 5, 'Extracting ZIP file...');
    await extractZip(zipPath, extractDir);

    // Convert project
    const converter = new StaticToReactConverter(extractDir, outputDir);
    const result = await converter.convert(sendProgress);

    if (result.success) {
      // Create ZIP of converted project
      sendProgress('Packaging', 98, 'Creating download package...');
      const outputZipPath = await createZip(outputDir);
      const downloadUrl = `/downloads/${path.basename(outputZipPath)}`;

      res.write(JSON.stringify({ 
        type: 'complete', 
        downloadUrl 
      }) + '\n');
    } else {
      res.write(JSON.stringify({ 
        type: 'error', 
        error: result.error 
      }) + '\n');
    }
  } catch (error) {
    console.error('Conversion error:', error);
    res.write(JSON.stringify({ 
      type: 'error', 
      error: error.message 
    }) + '\n');
  } finally {
    // Clean up
    await fs.remove(zipPath);
    await fs.remove(extractDir);
    res.end();
  }
});

async function extractZip(zipPath, extractDir) {
  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
      if (err) return reject(err);

      zipfile.readEntry();
      zipfile.on('entry', (entry) => {
        if (/\/$/.test(entry.fileName)) {
          // Directory
          fs.ensureDir(path.join(extractDir, entry.fileName))
            .then(() => zipfile.readEntry())
            .catch(reject);
        } else {
          // File
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) return reject(err);

            const filePath = path.join(extractDir, entry.fileName);
            fs.ensureDir(path.dirname(filePath))
              .then(() => {
                const writeStream = fs.createWriteStream(filePath);
                readStream.pipe(writeStream);
                writeStream.on('close', () => zipfile.readEntry());
              })
              .catch(reject);
          });
        }
      });

      zipfile.on('end', resolve);
      zipfile.on('error', reject);
    });
  });
}

async function createZip(sourceDir) {
  const timestamp = Date.now();
  const zipPath = path.join('downloads', `converted-project-${timestamp}.zip`);
  
  await fs.ensureDir('downloads');
  
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve(zipPath));
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

app.listen(port, () => {
  console.log(`Conversion server running at http://localhost:${port}`);
});