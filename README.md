# 🚲 Vélib' Live - Visualisation Temps Réel

Une application React moderne pour visualiser en temps réel les données des stations Vélib' de Paris avec Mapbox GL JS.

![Vélib' Live Preview](https://via.placeholder.com/800x450/1a1a2e/10b981?text=Vélib'+Live+Paris)

## ✨ Fonctionnalités

- **📍 Marqueurs dynamiques** - Points colorés selon la disponibilité (vert → rouge)
- **🔥 Heatmap** - Carte de chaleur de la densité des vélos
- **⭕ Clusters intelligents** - Regroupement dynamique avec Supercluster
- **📊 Statistiques en direct** - Vélos mécaniques/électriques, places libres
- **🔄 Auto-refresh** - Mise à jour automatique chaque minute
- **🌙 Design sombre** - Interface moderne et élégante

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ (recommandé: 20+)
- Un token Mapbox (gratuit sur [mapbox.com](https://www.mapbox.com))

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd Mapbox-realtime-bike

# Installer les dépendances
npm install

# Configurer Mapbox
# Créer un fichier .env à la racine avec:
echo "VITE_MAPBOX_TOKEN=votre_token_mapbox" > .env

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔑 Configuration Mapbox

1. Créez un compte gratuit sur [mapbox.com](https://www.mapbox.com)
2. Récupérez votre token d'accès dans votre dashboard
3. Créez un fichier `.env` à la racine du projet:

```env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoiVk9UUkVfVVNFUk5BTUUiLCJhIjoiY2x...
```

## 📡 Sources de Données

Cette application utilise les APIs ouvertes Vélib' Métropole:

- **API GBFS** (mise à jour chaque minute):
  - [Station Information](https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json)
  - [Station Status](https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json)

- **OpenData Paris**:
  - [Vélib - Disponibilité temps réel](https://opendata.paris.fr/explore/dataset/velib-disponibilite-en-temps-reel)

## 🏗️ Architecture

```
src/
├── components/
│   ├── Map/
│   │   ├── MapContainer.tsx    # Conteneur principal
│   │   ├── MarkersLayer.tsx    # Couche marqueurs
│   │   ├── HeatmapLayer.tsx    # Couche heatmap
│   │   └── ClustersLayer.tsx   # Couche clusters
│   ├── Controls/
│   │   ├── LayerToggle.tsx     # Bascule entre couches
│   │   └── StatsPanel.tsx      # Statistiques temps réel
│   └── UI/
│       └── Popup.tsx           # Info station
├── services/
│   └── velibService.ts         # Appels API
├── hooks/
│   └── useVelibData.ts         # Hook données temps réel
├── types/
│   └── velib.ts                # Types TypeScript
└── utils/
    └── dataTransform.ts        # Utilitaires Supercluster
```

## 🛠️ Technologies

- **React 19** + TypeScript
- **Vite** - Build tool rapide
- **Mapbox GL JS** - Rendu cartographique WebGL
- **react-map-gl** - Bindings React pour Mapbox
- **Supercluster** - Clustering côté client
- **Axios** - Requêtes HTTP

## 📦 Scripts NPM

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Vérification ESLint
```

## 🎨 Personnalisation

### Changer le style de carte

Dans `MapContainer.tsx`, modifiez `mapStyle`:

```typescript
mapStyle="mapbox://styles/mapbox/dark-v11"    // Sombre (défaut)
mapStyle="mapbox://styles/mapbox/light-v11"   // Clair
mapStyle="mapbox://styles/mapbox/streets-v12" // Rues
mapStyle="mapbox://styles/mapbox/satellite-v9" // Satellite
```

### Modifier l'intervalle de refresh

Dans `App.tsx`:

```typescript
const { geoJSON, stats, ... } = useVelibData({
  refreshInterval: 30000, // 30 secondes
  autoRefresh: true,
});
```

## 📄 License

MIT License - Libre d'utilisation et de modification.

## 🙏 Crédits

- Données: [Vélib' Métropole](https://www.velib-metropole.fr) / [OpenData Paris](https://opendata.paris.fr)
- Cartographie: [Mapbox](https://www.mapbox.com)
