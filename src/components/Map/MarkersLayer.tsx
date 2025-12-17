import { useMemo, useCallback } from 'react';
import { Marker } from 'react-map-gl/mapbox';
import type { Station, StationGeoJSON } from '../../types/velib';
import { getAvailabilityColor } from '../../services/velibService';
import './MarkersLayer.css';

interface MarkersLayerProps {
  geoJSON: StationGeoJSON;
  onStationClick: (station: Station) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MarkersLayer({ 
  geoJSON, 
  onStationClick, 
  onMouseEnter, 
  onMouseLeave 
}: MarkersLayerProps) {
  // Limiter le nombre de marqueurs affichés pour les performances
  const visibleStations = useMemo(() => {
    return geoJSON.features.slice(0, 500);
  }, [geoJSON.features]);

  const handleClick = useCallback((station: Station) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onStationClick(station);
  }, [onStationClick]);

  return (
    <>
      {visibleStations.map((feature) => {
        const station = feature.properties;
        const color = getAvailabilityColor(station.availabilityRatio);
        const size = Math.max(12, Math.min(20, 8 + station.totalBikes / 3));

        return (
          <Marker
            key={station.id}
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
          >
            <div
              className="station-marker"
              onClick={handleClick(station)}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 ${size / 2}px ${color}`,
              }}
            >
              <div className="marker-pulse" style={{ borderColor: color }} />
            </div>
          </Marker>
        );
      })}
    </>
  );
}

export default MarkersLayer;
