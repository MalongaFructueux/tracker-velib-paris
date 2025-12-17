import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Station, StationGeoJSON, VelibStats } from '../types/velib';
import { fetchStations, stationsToGeoJSON, calculateStats } from '../services/velibService';

interface UseVelibDataOptions {
  refreshInterval?: number; // en millisecondes
  autoRefresh?: boolean;
}

interface UseVelibDataReturn {
  stations: Station[];
  geoJSON: StationGeoJSON;
  stats: VelibStats;
  isLoading: boolean;
  error: Error | null;
  lastUpdate: Date | null;
  refresh: () => Promise<void>;
}

const DEFAULT_REFRESH_INTERVAL = 60 * 1000; // 60 secondes

export function useVelibData(options: UseVelibDataOptions = {}): UseVelibDataReturn {
  const { 
    refreshInterval = DEFAULT_REFRESH_INTERVAL, 
    autoRefresh = true 
  } = options;

  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchStations();
      setStations(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      console.error('Erreur lors du chargement des données Vélib:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Chargement initial
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  // Mémoriser les données GeoJSON pour éviter les recalculs inutiles
  const geoJSON = useMemo(() => {
    return stationsToGeoJSON(stations);
  }, [stations]);

  // Mémoriser les statistiques
  const stats = useMemo(() => {
    return calculateStats(stations);
  }, [stations]);

  return {
    stations,
    geoJSON,
    stats,
    isLoading,
    error,
    lastUpdate,
    refresh,
  };
}

export default useVelibData;

