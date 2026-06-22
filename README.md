# NOUILLES NOUILLES — site démo

Site vitrine immersif pour **NOUILLES NOUILLES**, restaurant asiatique de nouilles fraîches à Rennes
(48 rue Legraverend, 35000 Rennes).

> Démo de présentation — proposition commerciale. Données et formulaires en local (sans backend).

## ✨ Fonctionnalités

- **Hero immersif** : bols de nouilles flottants et déplaçables à la souris / au doigt
- **Carte interactive** : filtres (catégorie, végé), badges piment, **allergènes** détaillés, photos des signatures
- **Réservation en ligne** : horloge analogique, créneaux midi/soir, indicateur de tables restantes
- **Galerie** photo (bento + lightbox), **Google Maps** intégré, **avis Google**, **newsletter**
- **Contact & privatisation** + bouton **WhatsApp** flottant
- **Bilingue FR / EN** (bascule instantanée)
- **Espace admin** (`/admin`) : gestion des réservations (accepter / refuser, capacité),
  édition de la carte et des prix, gestion de la galerie (upload par glisser-déposer)

## 🚀 Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

Admin : http://localhost:3000/admin — identifiant `admin` · mot de passe `admin` (démo).

## 📱 PWA (installable)

Le site **et** l'espace admin sont une Progressive Web App : installables sur téléphone
(« Ajouter à l'écran d'accueil »), avec icône, écran de démarrage et page hors-ligne.
Le service worker est actif **en production** (build/Vercel), pas en `npm run dev`.

## 🔔 Notifications

Quand un client réserve (ou envoie un message), le restaurant reçoit un e-mail via
[Resend](https://resend.com). Configurer les variables (voir `.env.example`) :

```bash
RESEND_API_KEY=...                 # clé Resend
RESTAURANT_EMAIL=...               # adresse qui reçoit les demandes
RESEND_FROM=Nouilles Nouilles <onboarding@resend.dev>
```

Sans clé, le site reste fonctionnel (mode démo, aucun e-mail envoyé).

## 🛠 Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Resend.

## 📦 Notes démo

- Les données (carte, galerie, réservations) sont stockées en `localStorage` du navigateur
  (pas de base de données) — parfait pour la démo, à brancher sur un vrai backend en production.
- Authentification admin volontairement simplifiée pour la démonstration.
