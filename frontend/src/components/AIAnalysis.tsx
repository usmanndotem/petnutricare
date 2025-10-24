import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { VeterinarySidebar } from './VeterinarySidebar';
import { 
  Brain, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Lightbulb
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'nutrition' | 'health' | 'behavior' | 'trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  timestamp: string;
}

interface AnalysisResult {
  id: string;
  patientName: string;
  analysisType: string;
  summary: string;
  insights: AIInsight[];
  recommendations: string[];
  riskFactors: string[];
  generatedAt: string;
}

const mockAnalysisResults: AnalysisResult[] = [
  {
    id: '1',
    patientName: 'Max',
    analysisType: 'Comprehensive Health Analysis',
    summary: 'Overall health status is excellent with minor dietary adjustments recommended.',
    insights: [
      {
        id: '1',
        type: 'nutrition',
        title: 'Protein Intake Optimization',
        description: 'Current protein levels are adequate but could be increased by 15% for optimal muscle maintenance.',
        confidence: 87,
        impact: 'medium',
        category: 'Nutrition',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        type: 'health',
        title: 'Weight Management Trend',
        description: 'Weight has been stable over the last 3 months, indicating good dietary compliance.',
        confidence: 92,
        impact: 'high',
        category: 'Health Monitoring',
        timestamp: '2024-01-15T10:30:00Z'
      }
    ],
    recommendations: [
      'Increase protein content in daily meals by 15%',
      'Continue current exercise routine',
      'Monitor weight weekly for any changes'
    ],
    riskFactors: [
      'Age-related joint health concerns',
      'Potential seasonal allergies'
    ],
    generatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    patientName: 'Luna',
    analysisType: 'Digestive Health Analysis',
    summary: 'Digestive issues detected with recommended dietary modifications.',
    insights: [
      {
        id: '3',
        type: 'health',
        title: 'Digestive Sensitivity Alert',
        description: 'Pattern analysis suggests sensitivity to certain food ingredients. Recommend elimination diet.',
        confidence: 78,
        impact: 'high',
        category: 'Digestive Health',
        timestamp: '2024-01-14T14:20:00Z'
      },
      {
        id: '4',
        type: 'nutrition',
        title: 'Fiber Intake Deficiency',
        description: 'Current fiber levels are below recommended range for optimal digestive health.',
        confidence: 85,
        impact: 'medium',
        category: 'Nutrition',
        timestamp: '2024-01-14T14:20:00Z'
      }
    ],
    recommendations: [
      'Switch to sensitive stomach formula',
      'Increase fiber intake gradually',
      'Monitor stool consistency daily',
      'Consider probiotic supplementation'
    ],
    riskFactors: [
      'Food sensitivity reactions',
      'Potential inflammatory bowel disease'
    ],
    generatedAt: '2024-01-14T14:20:00Z'
  }
];

export function AIAnalysis() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nutrition': return <Target className="w-4 h-4" />;
      case 'health': return <Activity className="w-4 h-4" />;
      case 'behavior': return <Brain className="w-4 h-4" />;
      case 'trend': return <TrendingUp className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const handleGenerateAnalysis = () => {
    setIsGenerating(true);
    // Simulate AI analysis generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger the AI analysis
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <VeterinarySidebar currentPage="ai-analysis" />

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#2A4B7C] mb-2">AI Analysis</h1>
              <p className="text-muted-foreground">Advanced AI-powered insights and recommendations</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Import Data
              </Button>
              <Button onClick={handleGenerateAnalysis} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Analysis
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* AI Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-[#7ED9B9]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Total Analyses</p>
                <Brain className="w-5 h-5 text-[#7ED9B9]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">47</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">+12 this week</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-[#5EC7E8]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Avg Confidence</p>
                <Zap className="w-5 h-5 text-[#5EC7E8]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">87%</p>
              <p className="text-xs text-green-600 mt-2 m-0">↑ 3% from last month</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-[#2A4B7C]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">High Impact Insights</p>
                <AlertTriangle className="w-5 h-5 text-[#2A4B7C]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">23</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">Require attention</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-orange-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Success Rate</p>
                <CheckCircle className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">94%</p>
              <p className="text-xs text-green-600 mt-2 m-0">↑ 2% improvement</p>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analysis List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2A4B7C]">Recent Analyses</h3>
              {mockAnalysisResults.map((analysis) => (
                <Card 
                  key={analysis.id} 
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedAnalysis(analysis)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-[#2A4B7C]">{analysis.patientName}</h4>
                      <p className="text-sm text-muted-foreground">{analysis.analysisType}</p>
                    </div>
                    <Badge variant="outline">
                      {new Date(analysis.generatedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{analysis.summary}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{analysis.insights.length} insights</span>
                    <span>{analysis.recommendations.length} recommendations</span>
                    <span>{analysis.riskFactors.length} risk factors</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Analysis Details */}
            <div>
              {selectedAnalysis ? (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#2A4B7C]">Analysis Details</h3>
                    <Badge variant="outline">
                      {new Date(selectedAnalysis.generatedAt).toLocaleDateString()}
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {/* Summary */}
                    <div>
                      <h4 className="font-medium text-[#2A4B7C] mb-2">Summary</h4>
                      <p className="text-sm text-muted-foreground">{selectedAnalysis.summary}</p>
                    </div>

                    {/* Insights */}
                    <div>
                      <h4 className="font-medium text-[#2A4B7C] mb-3">AI Insights</h4>
                      <div className="space-y-3">
                        {selectedAnalysis.insights.map((insight) => (
                          <div key={insight.id} className="border rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getTypeIcon(insight.type)}
                                <span className="font-medium text-sm">{insight.title}</span>
                              </div>
                              <div className="flex gap-2">
                                <Badge className={getImpactColor(insight.impact)}>
                                  {insight.impact}
                                </Badge>
                                <Badge variant="outline">
                                  {insight.confidence}%
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{insight.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-muted-foreground">{insight.category}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(insight.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-medium text-[#2A4B7C] mb-3">Recommendations</h4>
                      <div className="space-y-2">
                        {selectedAnalysis.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{recommendation}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Factors */}
                    <div>
                      <h4 className="font-medium text-[#2A4B7C] mb-3">Risk Factors</h4>
                      <div className="space-y-2">
                        {selectedAnalysis.riskFactors.map((risk, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded">
                            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <div className="text-center text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select an analysis to view detailed insights</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
