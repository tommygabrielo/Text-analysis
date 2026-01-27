# Service d'Analyse de Texte

Prototype de service d'analyse de texte avec calcul de score de conformité.

## Choix techniques

### Backend
- **Node.js + TypeScript** : Typage strict pour la robustesse
- **Express** : Framework web minimaliste
- **PostgreSQL + pg** : Base de données relationnelle
- **Zod** : Validation de schémas type-safe
- **Jest** : Tests unitaires

### Frontend
- **React + TypeScript** : Interface moderne avec typage
- **Vite** : Build tool rapide
- **Composants fonctionnels** : Architecture moderne React

### Architecture
- **Service d'analyse isolé** : Module dédié testable indépendamment
- **Règles configurables** : Configuration centralisée dans `analysisRules.ts`
- **Séparation des responsabilités** : Controllers, Services, Models, Routes

## Installation

### Option 1 : Docker Compose (Recommandé)

**Prérequis :**
- Docker et Docker Compose

**Lancement :**
```bash
docker-compose up
```

L'application sera accessible sur :
- Frontend : `http://localhost:5173`
- Backend API : `http://localhost:3000`
- PostgreSQL : `localhost:5432`

**Arrêter les services :**
```bash
docker-compose down
```

**Arrêter et supprimer les volumes (données) :**
```bash
docker-compose down -v
```

### Option 2 : Installation manuelle

**Prérequis :**
- Node.js 18+
- PostgreSQL (local ou distant)

### Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` :
```
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/text_analysis
DB_HOST=localhost
DB_PORT=5432
DB_NAME=text_analysis
DB_USER=postgres
DB_PASSWORD="votre mot de pass PGADMIN"
NODE_ENV=development
```

Créer la base de données PostgreSQL :
```sql
CREATE DATABASE text_analysis;
```

Démarrer le serveur :
```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Docker

Le projet inclut une configuration Docker Compose pour faciliter le développement :

- **PostgreSQL** : Base de données avec volume persistant
- **Backend** : API Node.js avec hot reload
- **Frontend** : Application React avec hot reload

Les modifications de code sont reflétées automatiquement grâce aux volumes montés.

## Utilisation

1. Ouvrir l'application dans le navigateur
2. Entrer un texte dans le champ
3. Cliquer sur "Analyser"
4. Le score s'affiche (0-100)
5. L'historique se met à jour automatiquement

## Règles d'analyse

Le score est calculé selon :
- Score de base : 50
- Bonus : +20 si longueur > 100 caractères
- Pénalité : -15 si longueur < 20 caractères
- Pénalité : -10 par mot interdit ("fraude", "illégal", "faux")
- Bonus : +5 par mot positif ("conforme", "légal", "valide", "correct", "approuvé")
- Bonus : +10 si ponctuation présente (.,!?;:)
- Pénalité : -15 si plus de 30% de majuscules (agressivité)
- Bonus : +5 si texte bien structuré (paragraphes ou plusieurs phrases)
- Score borné entre 0 et 100

Les règles sont configurables dans `backend/src/config/analysisRules.ts`

## Tests

```bash
cd backend
npm test
```

## API Endpoints

### POST /api/analyze
Analyse un texte et retourne le score.

**Body:**
```json
{
  "text": "mon texte à analyser"
}
```

**Response:**
```json
{
  "score": 72,
  "status": "ok"
}
```

### GET /api/history
Retourne l'historique des analyses.

**Response:**
```json
[
  {
    "id": "...",
    "text": "...",
    "score": 72,
    "createdAt": "2026-01-01T10:00:00Z"
  }
]
```

## Structure détaillée

### Backend
```
backend/
├── src/
│   ├── config/          # Configuration (règles d'analyse)
│   ├── controllers/     # Contrôleurs API
│   ├── db/              # Connexion PostgreSQL
│   ├── models/          # Modèles de données
│   ├── routes/          # Routes Express
│   ├── services/        # Service d'analyse isolé
│   │   └── __tests__/   # Tests unitaires
│   └── index.ts         # Point d'entrée
├── package.json
└── tsconfig.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/      # Composants React
│   ├── services/        # Appels API
│   ├── types/           # Types TypeScript
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

