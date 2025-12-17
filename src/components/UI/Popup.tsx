import type { Station } from '../../types/velib';
import { getAvailabilityColor } from '../../services/velibService';
import './Popup.css';

interface PopupProps {
  station: Station;
  onClose: () => void;
}

export function Popup({ station, onClose }: PopupProps) {
  const availabilityColor = getAvailabilityColor(station.availabilityRatio);
  
  return (
    <div className="velib-popup">
      <button className="popup-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      
      <div className="popup-header">
        <div 
          className="popup-indicator"
          style={{ backgroundColor: availabilityColor }}
        />
        <h3 className="popup-title">{station.name}</h3>
      </div>

      <div className="popup-content">
        <div className="popup-stats">
          <div className="popup-stat">
            <div className="popup-stat-icon mechanical">🚲</div>
            <div className="popup-stat-info">
              <span className="popup-stat-value">{station.mechanicalBikes}</span>
              <span className="popup-stat-label">Mechanical</span>
            </div>
          </div>
          
          <div className="popup-stat">
            <div className="popup-stat-icon electric">⚡</div>
            <div className="popup-stat-info">
              <span className="popup-stat-value">{station.electricBikes}</span>
              <span className="popup-stat-label">Electric</span>
            </div>
          </div>
          
          <div className="popup-stat">
            <div className="popup-stat-icon docks">🅿️</div>
            <div className="popup-stat-info">
              <span className="popup-stat-value">{station.availableDocks}</span>
              <span className="popup-stat-label">Docks</span>
            </div>
          </div>
        </div>

        <div className="popup-capacity">
          <div className="popup-capacity-bar">
            <div 
              className="popup-capacity-fill"
              style={{ 
                width: `${station.availabilityRatio * 100}%`,
                backgroundColor: availabilityColor,
              }}
            />
          </div>
          <span className="popup-capacity-text">
            {station.totalBikes} / {station.capacity} bikes
          </span>
        </div>

        <div className="popup-status">
          {station.isRenting && station.isReturning ? (
            <span className="status-badge active">Station Active</span>
          ) : (
            <span className="status-badge inactive">Station Inactive</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
