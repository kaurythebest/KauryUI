import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Type, 
  Copy,
  Check,
  Download,
  Eye,
  Settings,
  Palette,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MousePointer,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';

interface TextAnimationsPageProps {
  onNavigate: (view: string) => void;
}

type AnimationType = 'glitch' | 'shiny' | 'gradient' | 'scrambled' | 'rotating' | 'circular' | 'truefocus' | 'variable';

interface AnimationConfig {
  type: AnimationType;
  text: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  // Glitch specific
  glitchIntensity: number;
  glitchSpeed: number;
  glitchColors: { before: string; after: string };
  enableOnHover: boolean;
  // Shiny specific
  shinySpeed: number;
  shinyColor: string;
  // Gradient specific
  gradientColors: string[];
  gradientSpeed: number;
  // Scrambled specific
  scrambleSpeed: number;
  scrambleChars: string;
  // Rotating specific
  rotatingWords: string[];
  rotatingSpeed: number;
  // Circular specific
  circularRadius: number;
  circularSpeed: number;
  // Variable proximity
  variableIntensity: number;
}

export const TextAnimationsPage: React.FC<TextAnimationsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'code' | 'preview'>('design');
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [config, setConfig] = useState<AnimationConfig>({
    type: 'glitch',
    text: 'AMAZING TEXT',
    fontSize: 48,
    fontWeight: '900',
    fontFamily: 'Inter, sans-serif',
    color: '#ffffff',
    backgroundColor: '#000000',
    // Glitch
    glitchIntensity: 5,
    glitchSpeed: 3,
    glitchColors: { before: '#00ffff', after: '#ff0000' },
    enableOnHover: false,
    // Shiny
    shinySpeed: 5,
    shinyColor: '#ffffff',
    // Gradient
    gradientColors: ['#ff0080', '#7928ca', '#0070f3'],
    gradientSpeed: 3,
    // Scrambled
    scrambleSpeed: 50,
    scrambleChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    // Rotating
    rotatingWords: ['AMAZING', 'BEAUTIFUL', 'STUNNING', 'INCREDIBLE'],
    rotatingSpeed: 2000,
    // Circular
    circularRadius: 100,
    circularSpeed: 10,
    // Variable
    variableIntensity: 100
  });

  const animations = [
    {
      id: 'glitch',
      name: 'Glitch Text',
      description: 'Cyberpunk-style glitch effect with color distortion',
      category: 'Effects',
      icon: Zap
    },
    {
      id: 'shiny',
      name: 'Shiny Text',
      description: 'Smooth shine animation across text',
      category: 'Effects',
      icon: Sparkles
    },
    {
      id: 'gradient',
      name: 'Gradient Text',
      description: 'Animated gradient background with text',
      category: 'Colors',
      icon: Palette
    },
    {
      id: 'scrambled',
      name: 'Scrambled Text',
      description: 'Matrix-style character scrambling effect',
      category: 'Effects',
      icon: RotateCcw
    },
    {
      id: 'rotating',
      name: 'Rotating Text',
      description: 'Cycle through different words with smooth transitions',
      category: 'Motion',
      icon: RotateCcw
    },
    {
      id: 'circular',
      name: 'Circular Text',
      description: 'Text arranged in a rotating circle',
      category: 'Motion',
      icon: RotateCcw
    },
    {
      id: 'truefocus',
      name: 'True Focus',
      description: 'Focus effect with corner highlights',
      category: 'Interactive',
      icon: MousePointer
    },
    {
      id: 'variable',
      name: 'Variable Proximity',
      description: 'Font weight changes based on mouse proximity',
      category: 'Interactive',
      icon: MousePointer
    }
  ];

  const generateAnimationCSS = () => {
    switch (config.type) {
      case 'glitch':
        return `
          .glitch {
            color: ${config.color};
            font-size: ${config.fontSize}px;
            font-weight: ${config.fontWeight};
            font-family: ${config.fontFamily};
            white-space: nowrap;
            position: relative;
            margin: 0 auto;
            user-select: none;
            cursor: pointer;
          }

          .glitch::after,
          .glitch::before {
            content: attr(data-text);
            position: absolute;
            top: 0;
            color: ${config.color};
            background-color: ${config.backgroundColor};
            overflow: hidden;
            clip-path: inset(0 0 0 0);
          }

          ${config.enableOnHover ? `
          .glitch::after,
          .glitch::before {
            content: '';
            opacity: 0;
            animation: none;
          }

          .glitch:hover::after {
            content: attr(data-text);
            opacity: 1;
            left: ${config.glitchIntensity}px;
            text-shadow: -${config.glitchIntensity}px 0 ${config.glitchColors.after};
            animation: animate-glitch ${config.glitchSpeed}s infinite linear alternate-reverse;
          }
          .glitch:hover::before {
            content: attr(data-text);
            opacity: 1;
            left: -${config.glitchIntensity}px;
            text-shadow: ${config.glitchIntensity}px 0 ${config.glitchColors.before};
            animation: animate-glitch ${config.glitchSpeed - 1}s infinite linear alternate-reverse;
          }
          ` : `
          .glitch::after {
            left: ${config.glitchIntensity}px;
            text-shadow: -${config.glitchIntensity}px 0 ${config.glitchColors.after};
            animation: animate-glitch ${config.glitchSpeed}s infinite linear alternate-reverse;
          }
          .glitch::before {
            left: -${config.glitchIntensity}px;
            text-shadow: ${config.glitchIntensity}px 0 ${config.glitchColors.before};
            animation: animate-glitch ${config.glitchSpeed - 1}s infinite linear alternate-reverse;
          }
          `}

          @keyframes animate-glitch {
            0%   { clip-path: inset(20% 0 50% 0); }
            5%   { clip-path: inset(10% 0 60% 0); }
            10%  { clip-path: inset(15% 0 55% 0); }
            15%  { clip-path: inset(25% 0 35% 0); }
            20%  { clip-path: inset(30% 0 40% 0); }
            25%  { clip-path: inset(40% 0 20% 0); }
            30%  { clip-path: inset(10% 0 60% 0); }
            35%  { clip-path: inset(15% 0 55% 0); }
            40%  { clip-path: inset(25% 0 35% 0); }
            45%  { clip-path: inset(30% 0 40% 0); }
            50%  { clip-path: inset(20% 0 50% 0); }
            55%  { clip-path: inset(10% 0 60% 0); }
            60%  { clip-path: inset(15% 0 55% 0); }
            65%  { clip-path: inset(25% 0 35% 0); }
            70%  { clip-path: inset(30% 0 40% 0); }
            75%  { clip-path: inset(40% 0 20% 0); }
            80%  { clip-path: inset(20% 0 50% 0); }
            85%  { clip-path: inset(10% 0 60% 0); }
            90%  { clip-path: inset(15% 0 55% 0); }
            95%  { clip-path: inset(25% 0 35% 0); }
            100% { clip-path: inset(30% 0 40% 0); }
          }
        `;

      case 'shiny':
        return `
          .shiny-text {
            color: ${config.color};
            font-size: ${config.fontSize}px;
            font-weight: ${config.fontWeight};
            font-family: ${config.fontFamily};
            background: linear-gradient(
              120deg,
              rgba(255, 255, 255, 0) 40%,
              ${config.shinyColor} 50%,
              rgba(255, 255, 255, 0) 60%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            display: inline-block;
            animation: shine ${config.shinySpeed}s linear infinite;
          }

          @keyframes shine {
            0% { background-position: 100%; }
            100% { background-position: -100%; }
          }
        `;

      case 'gradient':
        const gradientString = config.gradientColors.join(', ');
        return `
          .animated-gradient-text {
            position: relative;
            margin: 0 auto;
            display: flex;
            max-width: fit-content;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            border-radius: 1.25rem;
            font-weight: ${config.fontWeight};
            font-family: ${config.fontFamily};
            font-size: ${config.fontSize}px;
            backdrop-filter: blur(10px);
            transition: box-shadow 0.5s ease-out;
            overflow: hidden;
            cursor: pointer;
            padding: 1rem 2rem;
          }

          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(-45deg, ${gradientString});
            background-size: 300% 100%;
            animation: gradient ${config.gradientSpeed}s linear infinite;
            border-radius: inherit;
            z-index: 0;
            pointer-events: none;
          }

          .gradient-overlay::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: inherit;
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            background-color: ${config.backgroundColor};
            z-index: -1;
          }

          .text-content {
            display: inline-block;
            position: relative;
            z-index: 2;
            background: linear-gradient(-45deg, ${gradientString});
            background-size: 300% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: gradient ${config.gradientSpeed}s linear infinite;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;

      case 'scrambled':
        return `
          .scrambled-text {
            font-family: monospace;
            font-size: ${config.fontSize}px;
            font-weight: ${config.fontWeight};
            color: ${config.color};
            cursor: pointer;
            user-select: none;
          }

          .char {
            will-change: transform;
            display: inline-block;
            transition: all 0.1s ease;
          }
        `;

      case 'rotating':
        return `
          .text-rotate {
            display: flex;
            flex-wrap: wrap;
            white-space: pre-wrap;
            position: relative;
            font-size: ${config.fontSize}px;
            font-weight: ${config.fontWeight};
            font-family: ${config.fontFamily};
            color: ${config.color};
          }

          .text-rotate-word {
            display: inline-flex;
            overflow: hidden;
            height: 1.2em;
          }

          .text-rotate-element {
            display: inline-block;
            transform: translateY(100%);
            animation: rotateText ${config.rotatingSpeed * config.rotatingWords.length}ms infinite;
          }

          @keyframes rotateText {
            0%, 20% { transform: translateY(100%); }
            25%, 45% { transform: translateY(0%); }
            50%, 70% { transform: translateY(0%); }
            75%, 100% { transform: translateY(-100%); }
          }
        `;

      case 'circular':
        return `
          .circular-text {
            margin: 0 auto;
            border-radius: 50%;
            width: ${config.circularRadius * 2}px;
            height: ${config.circularRadius * 2}px;
            position: relative;
            font-weight: ${config.fontWeight};
            font-family: ${config.fontFamily};
            color: ${config.color};
            text-align: center;
            cursor: pointer;
            transform-origin: 50% 50%;
            animation: rotate ${config.circularSpeed}s linear infinite;
          }

          .circular-text span {
            position: absolute;
            display: inline-block;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            font-size: ${config.fontSize}px;
            transition: all 0.5s cubic-bezier(0, 0, 0, 1);
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `;

      case 'truefocus':
        return `
          .focus-container {
            position: relative;
            display: flex;
            gap: 1em;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }

          .focus-word {
            position: relative;
            font-size: ${config.fontSize}px;
            font-weight: ${config.fontWeight};
            font-family: ${config.fontFamily};
            color: ${config.color};
            cursor: pointer;
            transition: filter 0.3s ease, color 0.3s ease;
            filter: blur(2px);
          }

          .focus-word:hover {
            filter: blur(0);
          }

          .focus-frame {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            box-sizing: content-box;
            border: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .focus-word:hover .focus-frame {
            opacity: 1;
          }

          .corner {
            position: absolute;
            width: 1rem;
            height: 1rem;
            border: 3px solid ${config.color};
            filter: drop-shadow(0px 0px 4px ${config.color});
            border-radius: 3px;
          }

          .top-left { top: -10px; left: -10px; border-right: none; border-bottom: none; }
          .top-right { top: -10px; right: -10px; border-left: none; border-bottom: none; }
          .bottom-left { bottom: -10px; left: -10px; border-right: none; border-top: none; }
          .bottom-right { bottom: -10px; right: -10px; border-left: none; border-top: none; }
        `;

      case 'variable':
        return `
          .variable-proximity {
            font-family: "Roboto Flex", sans-serif;
            font-size: ${config.fontSize}px;
            font-weight: ${config.fontWeight};
            color: ${config.color};
            cursor: crosshair;
          }

          .variable-char {
            display: inline-block;
            transition: font-weight 0.2s ease;
            font-variation-settings: 'wght' var(--font-weight, 400);
          }
        `;

      default:
        return '';
    }
  };

  const generateAnimationHTML = () => {
    const css = generateAnimationCSS();
    
    const renderAnimation = () => {
      switch (config.type) {
        case 'glitch':
          return `<div class="glitch" data-text="${config.text}">${config.text}</div>`;
        
        case 'shiny':
          return `<div class="shiny-text">${config.text}</div>`;
        
        case 'gradient':
          return `
            <div class="animated-gradient-text">
              <div class="gradient-overlay"></div>
              <div class="text-content">${config.text}</div>
            </div>
          `;
        
        case 'scrambled':
          const chars = config.text.split('').map(char => `<span class="char">${char}</span>`).join('');
          return `<div class="scrambled-text" onclick="scrambleText(this)">${chars}</div>`;
        
        case 'rotating':
          const words = config.rotatingWords.map((word, index) => 
            `<span class="text-rotate-element" style="animation-delay: ${index * config.rotatingSpeed}ms">${word}</span>`
          ).join('');
          return `
            <div class="text-rotate">
              <div class="text-rotate-word">${words}</div>
            </div>
          `;
        
        case 'circular':
          const circularChars = config.text.split('').map((char, index) => {
            const angle = (index / config.text.length) * 360;
            return `<span style="transform: rotate(${angle}deg) translateY(-${config.circularRadius}px) rotate(-${angle}deg)">${char}</span>`;
          }).join('');
          return `<div class="circular-text">${circularChars}</div>`;
        
        case 'truefocus':
          const focusWords = config.text.split(' ').map(word => `
            <div class="focus-word">
              ${word}
              <div class="focus-frame">
                <div class="corner top-left"></div>
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>
                <div class="corner bottom-right"></div>
              </div>
            </div>
          `).join('');
          return `<div class="focus-container">${focusWords}</div>`;
        
        case 'variable':
          const variableChars = config.text.split('').map(char => 
            `<span class="variable-char">${char}</span>`
          ).join('');
          return `<div class="variable-proximity">${variableChars}</div>`;
        
        default:
          return `<div>${config.text}</div>`;
      }
    };

    const generateJavaScript = () => {
      switch (config.type) {
        case 'scrambled':
          return `
            function scrambleText(element) {
              const chars = '${config.scrambleChars}';
              const originalText = '${config.text}';
              const spans = element.querySelectorAll('.char');
              
              spans.forEach((span, index) => {
                let iterations = 0;
                const interval = setInterval(() => {
                  span.textContent = chars[Math.floor(Math.random() * chars.length)];
                  iterations++;
                  
                  if (iterations > ${Math.floor(config.scrambleSpeed / 10)}) {
                    clearInterval(interval);
                    span.textContent = originalText[index];
                  }
                }, ${config.scrambleSpeed});
              });
            }
          `;
        
        case 'variable':
          return `
            document.addEventListener('mousemove', (e) => {
              const chars = document.querySelectorAll('.variable-char');
              chars.forEach(char => {
                const rect = char.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;
                const distance = Math.sqrt(Math.pow(e.clientX - charX, 2) + Math.pow(e.clientY - charY, 2));
                const maxDistance = ${config.variableIntensity};
                const weight = Math.max(100, 900 - (distance / maxDistance) * 800);
                char.style.setProperty('--font-weight', weight);
              });
            });
          `;
        
        default:
          return '';
      }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${animations.find(a => a.id === config.type)?.name} - Text Animation</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: ${config.backgroundColor};
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
        }
        
        ${css}
    </style>
</head>
<body>
    ${renderAnimation()}
    
    <script>
        ${generateJavaScript()}
    </script>
</body>
</html>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateAnimationHTML());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadHTML = () => {
    const html = generateAnimationHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.type}-animation.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const updateConfig = (updates: Partial<AnimationConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  const renderConfigPanel = () => {
    const currentAnimation = animations.find(a => a.id === config.type);
    
    return (
      <div className="space-y-6">
        {/* Animation Selection */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Animation Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {animations.map((animation) => (
              <button
                key={animation.id}
                onClick={() => updateConfig({ type: animation.id as AnimationType })}
                className={`p-3 rounded-lg border text-left transition-all ${
                  config.type === animation.id
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                    : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                <animation.icon className="w-4 h-4 mb-1" />
                <div className="text-xs font-medium">{animation.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Text</label>
          {config.type === 'rotating' ? (
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Words to rotate (one per line)</label>
              <textarea
                value={config.rotatingWords.join('\n')}
                onChange={(e) => updateConfig({ rotatingWords: e.target.value.split('\n').filter(w => w.trim()) })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                rows={4}
                placeholder="Enter words to rotate..."
              />
            </div>
          ) : (
            <input
              type="text"
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your text..."
            />
          )}
        </div>

        {/* Typography */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Typography</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Font Size: {config.fontSize}px</label>
            <input
              type="range"
              min="16"
              max="120"
              value={config.fontSize}
              onChange={(e) => updateConfig({ fontSize: Number(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Font Weight</label>
            <select
              value={config.fontWeight}
              onChange={(e) => updateConfig({ fontWeight: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="100">Thin</option>
              <option value="300">Light</option>
              <option value="400">Normal</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
              <option value="900">Black</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
            <select
              value={config.fontFamily}
              onChange={(e) => updateConfig({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="'Roboto Flex', sans-serif">Roboto Flex</option>
            </select>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Colors</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.color}
                onChange={(e) => updateConfig({ color: e.target.value })}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer"
              />
              <input
                type="text"
                value={config.color}
                onChange={(e) => updateConfig({ color: e.target.value })}
                className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                className="w-12 h-8 border border-gray-600 rounded cursor-pointer"
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Animation-specific controls */}
        {config.type === 'glitch' && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-white">Glitch Settings</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Intensity: {config.glitchIntensity}px</label>
              <input
                type="range"
                min="1"
                max="20"
                value={config.glitchIntensity}
                onChange={(e) => updateConfig({ glitchIntensity: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Speed: {config.glitchSpeed}s</label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={config.glitchSpeed}
                onChange={(e) => updateConfig({ glitchSpeed: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Before Color</label>
                <input
                  type="color"
                  value={config.glitchColors.before}
                  onChange={(e) => updateConfig({ 
                    glitchColors: { ...config.glitchColors, before: e.target.value }
                  })}
                  className="w-full h-8 border border-gray-600 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">After Color</label>
                <input
                  type="color"
                  value={config.glitchColors.after}
                  onChange={(e) => updateConfig({ 
                    glitchColors: { ...config.glitchColors, after: e.target.value }
                  })}
                  className="w-full h-8 border border-gray-600 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.enableOnHover}
                onChange={(e) => updateConfig({ enableOnHover: e.target.checked })}
                className="mr-2 rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
              />
              <label className="text-sm font-medium text-gray-300">Enable only on hover</label>
            </div>
          </div>
        )}

        {config.type === 'shiny' && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-white">Shine Settings</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Speed: {config.shinySpeed}s</label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={config.shinySpeed}
                onChange={(e) => updateConfig({ shinySpeed: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Shine Color</label>
              <input
                type="color"
                value={config.shinyColor}
                onChange={(e) => updateConfig({ shinyColor: e.target.value })}
                className="w-full h-8 border border-gray-600 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {config.type === 'gradient' && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-white">Gradient Settings</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Speed: {config.gradientSpeed}s</label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={config.gradientSpeed}
                onChange={(e) => updateConfig({ gradientSpeed: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gradient Colors</label>
              <div className="space-y-2">
                {config.gradientColors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...config.gradientColors];
                        newColors[index] = e.target.value;
                        updateConfig({ gradientColors: newColors });
                      }}
                      className="w-8 h-8 border border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...config.gradientColors];
                        newColors[index] = e.target.value;
                        updateConfig({ gradientColors: newColors });
                      }}
                      className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-1 focus:ring-purple-500"
                    />
                    {config.gradientColors.length > 2 && (
                      <button
                        onClick={() => {
                          const newColors = config.gradientColors.filter((_, i) => i !== index);
                          updateConfig({ gradientColors: newColors });
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => updateConfig({ 
                    gradientColors: [...config.gradientColors, '#ffffff'] 
                  })}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  + Add Color
                </button>
              </div>
            </div>
          </div>
        )}

        {config.type === 'scrambled' && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-white">Scramble Settings</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Speed: {config.scrambleSpeed}ms</label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={config.scrambleSpeed}
                onChange={(e) => updateConfig({ scrambleSpeed: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Scramble Characters</label>
              <input
                type="text"
                value={config.scrambleChars}
                onChange={(e) => updateConfig({ scrambleChars: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                placeholder="Characters to use for scrambling..."
              />
            </div>
          </div>
        )}

        {config.type === 'rotating' && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-white">Rotation Settings</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Speed: {config.rotatingSpeed}ms</label>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={config.rotatingSpeed}
                onChange={(e) => updateConfig({ rotatingSpeed: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {config.type === 'circular' && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-white">Circular Settings</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Radius: {config.circularRadius}px</label>
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={config.circularRadius}
                onChange={(e) => updateConfig({ circularRadius: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Speed: {config.circularSpeed}s</label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={config.circularSpeed}
                onChange={(e) => updateConfig({ circularSpeed: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {config.type === 'variable' && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-white">Variable Settings</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Intensity: {config.variableIntensity}px</label>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={config.variableIntensity}
                onChange={(e) => updateConfig({ variableIntensity: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Type className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Text Animations</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2">Create stunning animated text effects</p>
        </div>

        {/* Configuration Panel */}
        <div className="flex-1 overflow-y-auto p-4">
          {renderConfigPanel()}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy HTML Code'}</span>
          </button>
          
          <button
            onClick={downloadHTML}
            className="w-full flex items-center justify-center space-x-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download HTML</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-800">
          {[
            { id: 'design', label: 'Design', icon: Palette },
            { id: 'code', label: 'Code', icon: Type },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-8 bg-gray-900">
          {activeTab === 'design' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Design Preview</h2>
              
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div 
                  className="flex items-center justify-center min-h-[300px] rounded-lg"
                  style={{ backgroundColor: config.backgroundColor }}
                >
                  <iframe
                    srcDoc={generateAnimationHTML()}
                    className="w-full h-80 border-0 rounded-lg"
                    title="Animation Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>

              {/* Animation Info */}
              <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Animation Information</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div>
                    <h4 className="font-medium text-white mb-2">Features:</h4>
                    <ul className="space-y-1">
                      <li>• Smooth CSS animations</li>
                      <li>• Customizable colors</li>
                      <li>• Responsive design</li>
                      <li>• Cross-browser compatible</li>
                      <li>• No external dependencies</li>
                      <li>• Lightweight code</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Usage:</h4>
                    <ul className="space-y-1">
                      <li>• Copy the HTML code</li>
                      <li>• Paste into your website</li>
                      <li>• Customize as needed</li>
                      <li>• Works on any platform</li>
                      <li>• Mobile-friendly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">HTML Code</h2>
              
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Complete HTML File</h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code>{generateAnimationHTML()}</code>
                  </pre>
                </div>
              </div>

              {/* Integration Instructions */}
              <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Integration Instructions</h3>
                <div className="space-y-4 text-sm text-gray-300">
                  <div>
                    <h4 className="font-medium text-white mb-2">1. Copy the Code</h4>
                    <p>Click the "Copy" button above to copy the complete HTML code to your clipboard.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">2. Save as HTML File</h4>
                    <p>Create a new HTML file and paste the code, or use the download button to get the file directly.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">3. Customize (Optional)</h4>
                    <p>You can modify the CSS variables and text content to match your design requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                
                {/* Device Toggle */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
                    {[
                      { id: 'desktop', icon: Monitor },
                      { id: 'tablet', icon: Tablet },
                      { id: 'mobile', icon: Smartphone }
                    ].map(device => (
                      <button
                        key={device.id}
                        onClick={() => setPreviewDevice(device.id as any)}
                        className={`p-2 rounded-md transition-colors ${
                          previewDevice === device.id
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        <device.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="mx-auto transition-all duration-300" style={{ width: getDeviceWidth() }}>
                  <iframe
                    ref={iframeRef}
                    srcDoc={generateAnimationHTML()}
                    className="w-full h-96 border border-gray-600 rounded-lg bg-white"
                    title="Animation Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>

              {/* Preview Info */}
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <Type className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">Pure CSS</h3>
                  <p className="text-sm text-gray-400">No JavaScript dependencies for most animations</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <Zap className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">Performant</h3>
                  <p className="text-sm text-gray-400">Hardware-accelerated animations for smooth performance</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <Settings className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">Customizable</h3>
                  <p className="text-sm text-gray-400">Easy to modify colors, timing, and effects</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};