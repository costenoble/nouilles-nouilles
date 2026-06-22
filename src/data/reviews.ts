export type Review = {
  author: string;
  initials: string;
  rating: number;
  date: { fr: string; en: string };
  text: { fr: string; en: string };
};

export const reviews: Review[] = [
  {
    author: "Camille D.",
    initials: "CD",
    rating: 5,
    date: { fr: "Il y a 2 semaines", en: "2 weeks ago" },
    text: {
      fr: "Les meilleures nouilles fraîches de Rennes, sans hésiter. On sent que tout est fait maison. Le bol de poulet croustillant est une tuerie.",
      en: "The best fresh noodles in Rennes, no question. You can tell everything is house-made. The crispy chicken bowl is unreal.",
    },
  },
  {
    author: "Thomas L.",
    initials: "TL",
    rating: 5,
    date: { fr: "Il y a 1 mois", en: "1 month ago" },
    text: {
      fr: "Le phở est incroyable, un bouillon avec une vraie profondeur. Accueil adorable et addition très raisonnable.",
      en: "The phở is incredible, a broth with real depth. Lovely welcome and a very reasonable bill.",
    },
  },
  {
    author: "Marine R.",
    initials: "MR",
    rating: 5,
    date: { fr: "Il y a 3 semaines", en: "3 weeks ago" },
    text: {
      fr: "Cadre superbe, plats généreux et gyozas parfaitement poêlés. On a réservé en ligne en 30 secondes, top.",
      en: "Beautiful setting, generous dishes and perfectly pan-fried gyoza. Booked online in 30 seconds, brilliant.",
    },
  },
  {
    author: "Hugo M.",
    initials: "HM",
    rating: 4,
    date: { fr: "Il y a 1 mois", en: "1 month ago" },
    text: {
      fr: "Très bon rapport qualité-prix, produits frais et savoureux. Pensez à réserver le soir, ça se remplit vite !",
      en: "Great value, fresh and tasty produce. Book ahead for dinner, it fills up fast!",
    },
  },
  {
    author: "Léa P.",
    initials: "LP",
    rating: 5,
    date: { fr: "Il y a 5 jours", en: "5 days ago" },
    text: {
      fr: "Mention spéciale pour les options végé et l'info allergènes super claire. Service au top, je reviendrai !",
      en: "Special mention for the veggie options and crystal-clear allergen info. Top service, I'll be back!",
    },
  },
];

export const reviewSummary = { rating: 4.9, count: 74 };
