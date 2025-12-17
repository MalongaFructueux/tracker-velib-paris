import { useEffect } from 'react';
import { Source, Layer, useMap } from 'react-map-gl/mapbox';
import type { HeatmapLayerSpecification } from 'mapbox-gl';
import type { StationGeoJSON } from '../../types/velib';

interface HeatmapLayerProps {
  geoJSON: StationGeoJSON;
}

// Configuration de la couche heatmap
const heatmapLayerStyle: Omit<HeatmapLayerSpecification, 'id' | 'source'> = {
  type: 'heatmap',
  paint: {
    // Poids basé sur le nombre total de vélos
    'heatmap-weight': [
      'interpolate',
      ['linear'],
      ['get', 'totalBikes'],
      0, 0,
      5, 0.3,
      15, 0.6,
      30, 0.8,
      50, 1,
    ],
    // Intensité basée sur le zoom
    'heatmap-intensity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10, 0.5,
      13, 1,
      16, 1.5,
    ],
    // Couleurs du gradient
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(0, 0, 0, 0)',
      0.1, 'rgba(103, 58, 183, 0.4)',      // Violet profond
      0.2, 'rgba(63, 81, 181, 0.5)',       // Indigo
      0.3, 'rgba(33, 150, 243, 0.6)',      // Bleu
      0.4, 'rgba(0, 188, 212, 0.7)',       // Cyan
      0.5, 'rgba(0, 230, 118, 0.75)',      // Vert émeraude
      0.6, 'rgba(76, 175, 80, 0.8)',       // Vert
      0.7, 'rgba(205, 220, 57, 0.85)',     // Lime
      0.8, 'rgba(255, 193, 7, 0.9)',       // Ambre
      0.9, 'rgba(255, 152, 0, 0.95)',      // Orange
      1, 'rgba(244, 67, 54, 1)',           // Rouge
    ],
    // Rayon basé sur le zoom
    'heatmap-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10, 20,
      12, 30,
      14, 40,
      16, 50,
    ],
    // Opacité basée sur le zoom
    'heatmap-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      10, 0.8,
      14, 0.7,
      16, 0.5,
    ],
  },
};

export function HeatmapLayer({ geoJSON }: HeatmapLayerProps) {
  const { current: map } = useMap();

  // Transformer les données pour la heatmap
  const heatmapData = {
    type: 'FeatureCollection' as const,
    features: geoJSON.features.map((feature) => ({
      type: 'Feature' as const,
      geometry: feature.geometry,
      properties: {
        totalBikes: feature.properties.totalBikes,
        mechanicalBikes: feature.properties.mechanicalBikes,
        electricBikes: feature.properties.electricBikes,
      },
    })),
  };

  useEffect(() => {
    // Force un re-render de la carte quand les données changent
    if (map) {
      map.triggerRepaint();
    }
  }, [map, geoJSON]);

  return (
    <Source id="velib-heatmap-source" type="geojson" data={heatmapData}>
      <Layer
        id="velib-heatmap-layer"
        type="heatmap"
        paint={heatmapLayerStyle.paint}
      />
    </Source>
  );
}

export default HeatmapLayer;
