import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Eye,
  Clock,
  Zap,
  Target,
  PieChart,
  LineChart,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  MousePointer,
  ShoppingCart,
  Heart,
  MessageCircle,
  Share2,
  Download,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react';
import { CodeModal } from './CodeModal';

interface DashboardComponentsProps {
  onNavigate: (view: string) => void;
}

interface ComponentCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'overview' | 'analytics' | 'realtime';
  gradient: string;
  value?: string;
  change?: string;
  trend?: 'up' | 'down';
}

export const DashboardComponents: React.FC<DashboardComponentsProps> = ({ onNavigate }) => {
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'overview' | 'analytics' | 'realtime'>('all');

  const components: ComponentCard[] = [
    // Overview Components
    {
      id: 'total-users',
      title: 'Total Users',
      description: 'Display total user count with trend indicator',
      icon: Users,
      category: 'overview',
      gradient: 'from-blue-500 to-cyan-500',
      value: '12,345',
      change: '+12%',
      trend: 'up'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      description: 'Show revenue metrics with growth percentage',
      icon: DollarSign,
      category: 'overview',
      gradient: 'from-green-500 to-emerald-500',
      value: '$45,678',
      change: '+8.2%',
      trend: 'up'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      description: 'Track conversion metrics and performance',
      icon: Target,
      category: 'overview',
      gradient: 'from-purple-500 to-pink-500',
      value: '3.24%',
      change: '-0.5%',
      trend: 'down'
    },
    {
      id: 'page-views',
      title: 'Page Views',
      description: 'Monitor total page views and engagement',
      icon: Eye,
      category: 'overview',
      gradient: 'from-orange-500 to-red-500',
      value: '89,123',
      change: '+15.3%',
      trend: 'up'
    },

    // Analytics Components
    {
      id: 'traffic-chart',
      title: 'Traffic Analytics',
      description: 'Interactive line chart for traffic analysis',
      icon: LineChart,
      category: 'analytics',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'user-demographics',
      title: 'User Demographics',
      description: 'Pie chart showing user demographic breakdown',
      icon: PieChart,
      category: 'analytics',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'device-analytics',
      title: 'Device Analytics',
      description: 'Track user devices and platform usage',
      icon: Monitor,
      category: 'analytics',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'geographic-data',
      title: 'Geographic Data',
      description: 'World map showing user geographic distribution',
      icon: Globe,
      category: 'analytics',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'performance-metrics',
      title: 'Performance Metrics',
      description: 'Track website performance and loading times',
      icon: Zap,
      category: 'analytics',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      id: 'funnel-analysis',
      title: 'Funnel Analysis',
      description: 'Conversion funnel visualization and analysis',
      icon: BarChart3,
      category: 'analytics',
      gradient: 'from-emerald-500 to-teal-500'
    },

    // Real-time Components
    {
      id: 'live-visitors',
      title: 'Live Visitors',
      description: 'Real-time visitor count with live updates',
      icon: Activity,
      category: 'realtime',
      gradient: 'from-red-500 to-pink-500',
      value: '247',
      change: 'Live'
    },
    {
      id: 'recent-activity',
      title: 'Recent Activity',
      description: 'Live feed of recent user activities',
      icon: Clock,
      category: 'realtime',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'live-sales',
      title: 'Live Sales',
      description: 'Real-time sales tracking and notifications',
      icon: ShoppingCart,
      category: 'realtime',
      gradient: 'from-green-500 to-teal-500',
      value: '$1,234',
      change: '+$89 (5m ago)'
    },
    {
      id: 'social-mentions',
      title: 'Social Mentions',
      description: 'Real-time social media mentions and engagement',
      icon: MessageCircle,
      category: 'realtime',
      gradient: 'from-purple-500 to-violet-500',
      value: '156',
      change: '+12 (1h)'
    },
    {
      id: 'system-status',
      title: 'System Status',
      description: 'Live system health and performance monitoring',
      icon: Heart,
      category: 'realtime',
      gradient: 'from-emerald-500 to-green-500',
      value: '99.9%',
      change: 'Healthy'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Components', count: components.length },
    { id: 'overview', label: 'Overview', count: components.filter(c => c.category === 'overview').length },
    { id: 'analytics', label: 'Analytics', count: components.filter(c => c.category === 'analytics').length },
    { id: 'realtime', label: 'Real-time', count: components.filter(c => c.category === 'realtime').length }
  ];

  const filteredComponents = activeCategory === 'all' 
    ? components 
    : components.filter(c => c.category === activeCategory);

  const generateCdnCode = (component: ComponentCard) => {
    const componentTag = `kaury-dashboard-${component.id.replace(/_/g, '-')}`;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.title} - KauryUI Dashboard Component</title>
    
    <!-- KauryUI CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kauryui@latest/kauryui.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/kauryui@latest/kauryui.min.js"></script>
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0f172a;
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            max-width: 1200px;
            width: 100%;
            padding: 20px;
        }
        
        .demo-header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .demo-title {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .demo-description {
            font-size: 1.1rem;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="demo-header">
            <h1 class="demo-title">${component.title}</h1>
            <p class="demo-description">${component.description}</p>
        </div>
        
        <!-- KauryUI Dashboard Component -->
        <${componentTag}
            ${component.value ? `value="${component.value}"` : ''}
            ${component.change ? `change="${component.change}"` : ''}
            ${component.trend ? `trend="${component.trend}"` : ''}
            theme="dark"
            animated="true"
        ></${componentTag}>
    </div>
    
    <script>
        // Initialize KauryUI components
        document.addEventListener('DOMContentLoaded', function() {
            // Component will auto-initialize
            console.log('KauryUI Dashboard Component loaded: ${component.title}');
        });
    </script>
</body>
</html>`;
  };

  const handleComponentClick = (component: ComponentCard) => {
    setSelectedComponent(component);
    setShowCodeModal(true);
  };

  const closeModal = () => {
    setShowCodeModal(false);
    setSelectedComponent(null);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Dashboard Components</h1>
          </div>
          
          <p className="text-gray-400 text-lg max-w-3xl">
            Professional dashboard components for analytics, metrics, and real-time data visualization. 
            Click any component to get the CDN code.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map((component, index) => {
            const IconComponent = component.icon;
            
            return (
              <div
                key={component.id}
                onClick={() => handleComponentClick(component)}
                className="group relative bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${component.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${component.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full capitalize">
                      {component.category}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {component.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {component.description}
                  </p>

                  {/* Metrics (if available) */}
                  {component.value && (
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">
                        {component.value}
                      </div>
                      {component.change && (
                        <div className={`flex items-center space-x-1 text-sm ${
                          component.trend === 'up' ? 'text-green-400' : 
                          component.trend === 'down' ? 'text-red-400' : 'text-blue-400'
                        }`}>
                          {component.trend === 'up' && <ArrowUp className="w-3 h-3" />}
                          {component.trend === 'down' && <ArrowDown className="w-3 h-3" />}
                          {!component.trend && <Activity className="w-3 h-3" />}
                          <span>{component.change}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Click indicator */}
                  <div className="mt-4 flex items-center text-gray-500 text-xs group-hover:text-blue-400 transition-colors">
                    <MousePointer className="w-3 h-3 mr-1" />
                    <span>Click to get CDN code</span>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">How to Use</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <h3 className="font-medium text-white mb-2">1. Click Component</h3>
              <p>Click on any dashboard component above to open the code modal with ready-to-use CDN code.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">2. Copy & Paste</h3>
              <p>Copy the generated HTML code and paste it into your project. No build process required!</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">3. Customize</h3>
              <p>Modify the component attributes and styling to match your design requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Modal */}
      {selectedComponent && (
        <CodeModal
          isOpen={showCodeModal}
          onClose={closeModal}
          title={`${selectedComponent.title} - CDN Code`}
          code={generateCdnCode(selectedComponent)}
          componentName={selectedComponent.title}
        />
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};