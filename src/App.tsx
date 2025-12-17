import { useState, useCallback } from 'react';
import { MapContainer } from './components/Map/MapContainer';
import { LayerToggle } from './components/Controls/LayerToggle';
import { StatsPanel } from './components/Controls/StatsPanel';
import { useVelibData } from './hooks/useVelibData';
import type { LayerVisibility, LayerType } from './types/velib';
import './App.css';

function App() {
  const { geoJSON, stats, isLoading, error, lastUpdate, refresh } = useVelibData({
    refreshInterval: 60000, // 60 seconds
    autoRefresh: true,
  });

  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    markers: false,
    heatmap: true,
    clusters: true,
  });

  const handleLayerToggle = useCallback((layer: LayerType) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-icon">🚲</span>
          <h1 className="brand-title">Vélib' Live</h1>
          <span className="brand-badge">REAL-TIME</span>
        </div>
        <div className="header-info">
          <span className="station-count">
            {stats.activeStations.toLocaleString('en-US')} stations
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        {/* Error message */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>Error loading data. Auto-retry in progress...</span>
          </div>
        )}

        {/* Map */}
        <MapContainer
          geoJSON={geoJSON}
          layerVisibility={layerVisibility}
          isLoading={isLoading}
        />

        {/* Controls overlay */}
        <div className="controls-overlay">
          <div className="controls-left">
            <StatsPanel
              stats={stats}
              lastUpdate={lastUpdate}
              onRefresh={refresh}
              isLoading={isLoading}
            />
          </div>
          
          <div className="controls-right">
            <LayerToggle
              visibility={layerVisibility}
              onToggle={handleLayerToggle}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <span>Data: </span>
        <a 
          href="https://velib-metropole-opendata.smovengo.cloud" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Vélib' Métropole GBFS
        </a>
        <span className="separator">•</span>
        <a 
          href="https://opendata.paris.fr" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          OpenData Paris
        </a>
        <span className="separator">•</span>
        <span>Map: </span>
        <a 
          href="https://www.mapbox.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Mapbox
        </a>
      </footer>
    </div>
  );
}

export default App;
