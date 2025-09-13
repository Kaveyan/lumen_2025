import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123',
          currentPlan: 'basic',
          usageData: {
            averageDownload: 250,
            averageUpload: 50,
            peakUsage: 400,
            deviceCount: 8
          },
          preferences: {
            budget: 'medium',
            priority: 'speed',
            familySize: 4
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      } else {
        throw new Error(data.error || 'Failed to get recommendations');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(`Failed to get AI recommendations: ${err.message}`);
      
      // Fallback to mock data if API fails
      setRecommendations([
        {
          planName: 'Premium Fiber',
          price: 59.99,
          downloadSpeed: 500,
          uploadSpeed: 100,
          confidence: 0.92,
          reasoning: 'Based on your usage patterns and family size, this plan offers the best balance of speed and value.',
          features: ['Unlimited Data', 'Free Router', 'Priority Support']
        },
        {
          planName: 'Ultra Fiber',
          price: 89.99,
          downloadSpeed: 1000,
          uploadSpeed: 500,
          confidence: 0.78,
          reasoning: 'For future-proofing and handling peak usage times with multiple devices.',
          features: ['Unlimited Data', 'Premium Router', '24/7 Priority Support']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🤖 AI-Powered Plan Recommendations</h1>
        <p style={subtitleStyle}>
          Get personalized broadband plan suggestions based on your usage patterns and preferences
        </p>
      </div>

      <div style={contentStyle}>
        {!recommendations.length && !loading && (
          <div style={startSectionStyle}>
            <div style={iconStyle}>🎯</div>
            <h2 style={startTitleStyle}>Ready to find your perfect plan?</h2>
            <p style={startDescStyle}>
              Our AI will analyze your usage patterns, family size, and preferences to recommend 
              the best broadband plans for your needs.
            </p>
            <button 
              onClick={getRecommendations}
              style={getRecommendationsButtonStyle}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Get My Recommendations'}
            </button>
          </div>
        )}

        {error && (
          <div style={errorStyle}>
            <h3>⚠️ API Connection Issue</h3>
            <p>{error}</p>
            <p style={fallbackNoteStyle}>
              Showing sample recommendations below. The backend server may not be running or the Gemini API key may need to be configured.
            </p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div style={recommendationsContainerStyle}>
            <h2 style={recommendationsTitleStyle}>Your Personalized Recommendations</h2>
            <div style={recommendationsGridStyle}>
              {recommendations.map((rec, index) => (
                <div key={index} style={recommendationCardStyle}>
                  <div style={confidenceBadgeStyle}>
                    {Math.round(rec.confidence * 100)}% Match
                  </div>
                  
                  <h3 style={planNameStyle}>{rec.planName}</h3>
                  <div style={priceStyle}>
                    ${rec.price}<span style={periodStyle}>/month</span>
                  </div>

                  <div style={speedInfoStyle}>
                    <div style={speedItemStyle}>
                      <span style={speedLabelStyle}>Download</span>
                      <span style={speedValueStyle}>{rec.downloadSpeed} Mbps</span>
                    </div>
                    <div style={speedItemStyle}>
                      <span style={speedLabelStyle}>Upload</span>
                      <span style={speedValueStyle}>{rec.uploadSpeed} Mbps</span>
                    </div>
                  </div>

                  <div style={reasoningStyle}>
                    <h4 style={reasoningTitleStyle}>Why this plan?</h4>
                    <p style={reasoningTextStyle}>{rec.reasoning}</p>
                  </div>

                  <ul style={featuresListStyle}>
                    {rec.features.map((feature, idx) => (
                      <li key={idx} style={featureItemStyle}>✓ {feature}</li>
                    ))}
                  </ul>

                  <Link to="/plans" style={selectPlanButtonStyle}>
                    View This Plan
                  </Link>
                </div>
              ))}
            </div>

            <div style={actionsStyle}>
              <button 
                onClick={getRecommendations}
                style={refreshButtonStyle}
                disabled={loading}
              >
                Get New Recommendations
              </button>
              <Link to="/plans" style={browseAllButtonStyle}>
                Browse All Plans
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc'
};

const headerStyle = {
  backgroundColor: 'white',
  padding: '3rem 0',
  textAlign: 'center',
  borderBottom: '1px solid #e2e8f0'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#64748b',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
};

const contentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '3rem 2rem'
};

const startSectionStyle = {
  textAlign: 'center',
  padding: '3rem',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const iconStyle = {
  fontSize: '4rem',
  marginBottom: '2rem'
};

const startTitleStyle = {
  fontSize: '2rem',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const startDescStyle = {
  fontSize: '1.1rem',
  color: '#64748b',
  marginBottom: '2rem',
  lineHeight: '1.6'
};

const getRecommendationsButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '1rem 2rem',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s'
};

const errorStyle = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '1.5rem',
  marginBottom: '2rem',
  color: '#dc2626'
};

const fallbackNoteStyle = {
  fontSize: '0.9rem',
  fontStyle: 'italic',
  marginTop: '1rem'
};

const recommendationsContainerStyle = {
  marginTop: '2rem'
};

const recommendationsTitleStyle = {
  fontSize: '2rem',
  color: '#1e3a8a',
  marginBottom: '2rem',
  textAlign: 'center'
};

const recommendationsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem'
};

const recommendationCardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e2e8f0',
  position: 'relative'
};

const confidenceBadgeStyle = {
  position: 'absolute',
  top: '-10px',
  right: '20px',
  backgroundColor: '#10b981',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: 'bold'
};

const planNameStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const priceStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1.5rem'
};

const periodStyle = {
  fontSize: '1rem',
  fontWeight: 'normal',
  color: '#64748b'
};

const speedInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#f8fafc',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '1.5rem'
};

const speedItemStyle = {
  textAlign: 'center'
};

const speedLabelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  color: '#64748b',
  marginBottom: '0.25rem'
};

const speedValueStyle = {
  display: 'block',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#1e3a8a'
};

const reasoningStyle = {
  marginBottom: '1.5rem'
};

const reasoningTitleStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#374151',
  marginBottom: '0.5rem'
};

const reasoningTextStyle = {
  fontSize: '0.95rem',
  color: '#64748b',
  lineHeight: '1.5'
};

const featuresListStyle = {
  listStyle: 'none',
  padding: '0',
  marginBottom: '2rem'
};

const featureItemStyle = {
  padding: '0.25rem 0',
  color: '#374151',
  fontSize: '0.9rem'
};

const selectPlanButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'block',
  transition: 'background-color 0.3s'
};

const actionsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

const refreshButtonStyle = {
  backgroundColor: 'transparent',
  color: '#1e3a8a',
  padding: '1rem 2rem',
  border: '2px solid #1e3a8a',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s'
};

const browseAllButtonStyle = {
  backgroundColor: '#64748b',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s'
};

export default Recommendations;
