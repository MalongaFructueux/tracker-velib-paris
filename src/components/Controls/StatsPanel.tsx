import type { VelibStats } from '../../types/velib';
import './StatsPanel.css';

interface StatsPanelProps {
  stats: VelibStats;
  lastUpdate: Date | null;
  onRefresh: () => void;
  isLoading: boolean;
}

export function StatsPanel({ stats, lastUpdate, onRefresh, isLoading }: StatsPanelProps) {
  const formatTime = (date: Date | null): string => {
    if (!date) return '--:--';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="stats-panel">
      <div className="stats-header">
        <div className="stats-title">
          <span className="stats-icon">📊</span>
          <span>Vélib' Paris</span>
        </div>
        <button 
          className={`refresh-button ${isLoading ? 'loading' : ''}`}
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh data"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-value">{stats.totalBikes.toLocaleString('en-US')}</div>
          <div className="stat-label">Available Bikes</div>
          <div className="stat-breakdown">
            <span className="mechanical">🚲 {stats.mechanicalBikes.toLocaleString('en-US')}</span>
            <span className="electric">⚡ {stats.electricBikes.toLocaleString('en-US')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.activeStations.toLocaleString('en-US')}</div>
          <div className="stat-label">Active Stations</div>
          <div className="stat-sub">of {stats.totalStations.toLocaleString('en-US')}</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.availableDocks.toLocaleString('en-US')}</div>
          <div className="stat-label">Free Docks</div>
          <div className="stat-sub">of {stats.totalCapacity.toLocaleString('en-US')}</div>
        </div>

        <div className="stat-card">
          <div className="stat-value availability">{formatPercentage(stats.averageAvailability)}</div>
          <div className="stat-label">Availability</div>
          <div className="availability-bar">
            <div 
              className="availability-fill"
              style={{ width: `${stats.averageAvailability * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="stats-footer">
        <div className="last-update">
          <span className="update-dot" />
          <span>Updated: {formatTime(lastUpdate)}</span>
        </div>
        <div className="data-source">
          <a 
            href="https://opendata.paris.fr/explore/dataset/velib-disponibilite-en-temps-reel" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            OpenData Paris
          </a>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
