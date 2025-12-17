import type { LayerVisibility, LayerType } from '../../types/velib';
import './LayerToggle.css';

interface LayerToggleProps {
  visibility: LayerVisibility;
  onToggle: (layer: LayerType) => void;
}

const LAYERS: { id: LayerType; label: string; icon: string; description: string }[] = [
  { 
    id: 'markers', 
    label: 'Markers', 
    icon: '📍',
    description: 'Individual station points',
  },
  { 
    id: 'heatmap', 
    label: 'Heatmap', 
    icon: '🔥',
    description: 'Density heat map',
  },
  { 
    id: 'clusters', 
    label: 'Clusters', 
    icon: '⭕',
    description: 'Smart grouping',
  },
];

export function LayerToggle({ visibility, onToggle }: LayerToggleProps) {
  return (
    <div className="layer-toggle">
      <div className="layer-toggle-header">
        <span className="layer-toggle-icon">🗺️</span>
        <span className="layer-toggle-title">Layers</span>
      </div>
      
      <div className="layer-toggle-options">
        {LAYERS.map((layer) => (
          <button
            key={layer.id}
            className={`layer-option ${visibility[layer.id] ? 'active' : ''}`}
            onClick={() => onToggle(layer.id)}
            title={layer.description}
          >
            <span className="layer-option-icon">{layer.icon}</span>
            <span className="layer-option-label">{layer.label}</span>
            <div className={`layer-option-indicator ${visibility[layer.id] ? 'on' : 'off'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default LayerToggle;
