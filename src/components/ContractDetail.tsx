import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContracts, ContractDetail as ContractDetailType } from '../contexts/ContractsContext';
import { ArrowLeft, Calendar, Users, AlertTriangle, FileText, Eye, TrendingUp } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ErrorState from './ErrorState';

const ContractDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getContractDetail } = useContracts();
  const [contract, setContract] = useState<ContractDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    const fetchContractDetail = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const detail = await getContractDetail(id);
        if (detail) {
          setContract(detail);
        } else {
          setError('Contract not found');
        }
      } catch (err) {
        setError('Failed to load contract details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractDetail();
  }, [id, getContractDetail]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Renewal Due':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Medium':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="Loading contract details..." />
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorState message={error || 'Contract not found'} onRetry={() => navigate('/dashboard')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contract Metadata */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{contract.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{contract.parties}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(contract.start)} - {formatDate(contract.expiry)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getRiskColor(contract.risk)}`}>
                    {contract.risk} Risk
                  </span>
                </div>
              </div>
            </div>

            {/* Clauses Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Clauses</h2>
              <div className="space-y-4">
                {contract.clauses.map((clause, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{clause.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Confidence</span>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {Math.round(clause.confidence * 100)}%
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{clause.summary}</p>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${clause.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Insights & Recommendations</h2>
              <div className="space-y-3">
                {contract.insights.map((insight, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getRiskColor(insight.risk)} border-l-4`}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getRiskIcon(insight.risk)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium uppercase tracking-wide">
                            {insight.risk} Risk
                          </span>
                        </div>
                        <p className="text-sm">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Evidence Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Evidence Panel</h3>
                    <button
                      onClick={() => setShowEvidence(!showEvidence)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      {showEvidence ? 'Hide' : 'Show'} Details
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {contract.evidence.map((evidence, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-medium text-gray-900">{evidence.source}</span>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {Math.round(evidence.relevance * 100)}%
                        </div>
                      </div>
                      {showEvidence && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-700 leading-relaxed">
                            "{evidence.snippet}"
                          </p>
                        </div>
                      )}
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-green-600 h-1 rounded-full"
                          style={{ width: `${evidence.relevance * 100}%` }}
                        />
                      </div>
                      {index < contract.evidence.length - 1 && (
                        <div className="border-b border-gray-100" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;