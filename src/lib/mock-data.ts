export type LeadStatus = "Nouveau Lead" | "Lead Qualifié" | "RDV Pris" | "Reprise Humaine";

export type Message = {
  id: string;
  from: "ai" | "user" | "human";
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  insuranceType: string;
  status: LeadStatus;
  lastMessage: string;
  updatedAt: string;
  unread: number;
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Sophie Martin",
    phone: "+212 6 12 34 56 78",
    email: "sophie.martin@email.fr",
    city: "Casablanca",
    insuranceType: "Assurance Auto",
    status: "Lead Qualifié",
    lastMessage: "Parfait, je suis disponible demain à 14h.",
    updatedAt: "il y a 2 min",
    unread: 2,
    messages: [
      { id: "m1", from: "ai", text: "Bonjour 👋 Je suis Jemma, votre assistante Jemassur. Comment puis-je vous aider aujourd'hui ?", time: "14:02" },
      { id: "m2", from: "user", text: "Bonjour, je cherche une assurance pour ma nouvelle voiture.", time: "14:03" },
      { id: "m3", from: "ai", text: "Avec plaisir ! Pourriez-vous me donner votre prénom et nom, ainsi que la marque et le modèle du véhicule ?", time: "14:03" },
      { id: "m4", from: "user", text: "Sophie Martin, Peugeot 208 de 2023.", time: "14:04" },
      { id: "m5", from: "ai", text: "Merci Sophie. Souhaitez-vous une formule Tiers, Tiers + ou Tous Risques ?", time: "14:04" },
      { id: "m6", from: "user", text: "Tous Risques de préférence.", time: "14:05" },
      { id: "m7", from: "ai", text: "Excellent choix. Un conseiller peut vous appeler pour finaliser. Votre numéro ?", time: "14:05" },
      { id: "m8", from: "user", text: "+212 6 12 34 56 78", time: "14:06" },
      { id: "m9", from: "ai", text: "Parfait ! Je vous propose un rendez-vous demain à 14h avec M. Bennani. Cela vous convient ?", time: "14:06" },
      { id: "m10", from: "user", text: "Parfait, je suis disponible demain à 14h.", time: "14:07" },
    ],
  },
  {
    id: "c2",
    name: "Karim El Amrani",
    phone: "+212 6 65 43 21 09",
    city: "Rabat",
    insuranceType: "Assurance Habitation",
    status: "Nouveau Lead",
    lastMessage: "Quel type de couverture proposez-vous ?",
    updatedAt: "il y a 5 min",
    unread: 1,
    messages: [
      { id: "m1", from: "ai", text: "Bonjour 👋 Comment puis-je vous aider ?", time: "13:55" },
      { id: "m2", from: "user", text: "Je viens d'acheter un appartement.", time: "13:56" },
      { id: "m3", from: "user", text: "Quel type de couverture proposez-vous ?", time: "13:57" },
    ],
  },
  {
    id: "c3",
    name: "Yasmine Tazi",
    phone: "+212 6 78 90 12 34",
    city: "Marrakech",
    insuranceType: "Assurance Santé",
    status: "RDV Pris",
    lastMessage: "Confirmé pour vendredi 10h ✅",
    updatedAt: "il y a 1 h",
    unread: 0,
    messages: [
      { id: "m1", from: "ai", text: "Bonjour ! Quel type d'assurance recherchez-vous ?", time: "12:00" },
      { id: "m2", from: "user", text: "Une mutuelle santé famille.", time: "12:01" },
      { id: "m3", from: "ai", text: "Combien de personnes à assurer ?", time: "12:01" },
      { id: "m4", from: "user", text: "4 personnes.", time: "12:02" },
      { id: "m5", from: "ai", text: "Je vous réserve un créneau vendredi 10h avec Mme Alaoui.", time: "12:03" },
      { id: "m6", from: "user", text: "Confirmé pour vendredi 10h ✅", time: "12:04" },
    ],
  },
  {
    id: "c4",
    name: "Mehdi Benjelloun",
    phone: "+212 6 11 22 33 44",
    city: "Tanger",
    insuranceType: "Assurance Pro",
    status: "Reprise Humaine",
    lastMessage: "Je préfère parler à un conseiller.",
    updatedAt: "il y a 3 min",
    unread: 3,
    messages: [
      { id: "m1", from: "ai", text: "Bonjour 👋", time: "14:10" },
      { id: "m2", from: "user", text: "J'ai une PME, j'ai besoin d'une couverture complète multi-risques.", time: "14:11" },
      { id: "m3", from: "ai", text: "Très bien, combien de salariés et quel chiffre d'affaires ?", time: "14:11" },
      { id: "m4", from: "user", text: "Je préfère parler à un conseiller.", time: "14:12" },
    ],
  },
  {
    id: "c5",
    name: "Leila Fassi",
    phone: "+212 6 55 44 33 22",
    city: "Fès",
    insuranceType: "Assurance Voyage",
    status: "Lead Qualifié",
    lastMessage: "Merci pour les informations !",
    updatedAt: "il y a 20 min",
    unread: 0,
    messages: [
      { id: "m1", from: "ai", text: "Bonjour ! Vous partez bientôt en voyage ?", time: "13:30" },
      { id: "m2", from: "user", text: "Oui, en Europe pour 15 jours.", time: "13:31" },
      { id: "m3", from: "ai", text: "Je note. Un conseiller vous rappelle aujourd'hui.", time: "13:32" },
      { id: "m4", from: "user", text: "Merci pour les informations !", time: "13:33" },
    ],
  },
];

export type Notification = {
  id: string;
  type: "new_lead" | "qualified" | "phone" | "appointment" | "takeover";
  title: string;
  message: string;
  time: string;
};

export const notifications: Notification[] = [
  { id: "n1", type: "appointment", title: "📅 Nouveau RDV", message: "Sophie Martin a réservé un RDV demain à 14h", time: "il y a 2 min" },
  { id: "n2", type: "takeover", title: "🙋 Reprise humaine demandée", message: "Mehdi Benjelloun souhaite parler à un conseiller", time: "il y a 3 min" },
  { id: "n3", type: "new_lead", title: "✨ Nouveau visiteur", message: "Karim El Amrani a démarré une conversation", time: "il y a 5 min" },
  { id: "n4", type: "phone", title: "📞 Numéro collecté", message: "Yasmine Tazi a partagé son numéro", time: "il y a 12 min" },
  { id: "n5", type: "qualified", title: "🎯 Lead qualifié", message: "Leila Fassi - Assurance Voyage", time: "il y a 20 min" },
  { id: "n6", type: "appointment", title: "📅 RDV confirmé", message: "Yasmine Tazi confirme vendredi 10h", time: "il y a 1 h" },
];

export type Appointment = {
  id: string;
  client: string;
  advisor: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmé" | "En attente" | "Annulé";
};

export const appointments: Appointment[] = [
  { id: "a1", client: "Sophie Martin", advisor: "Hamza Bennani", date: "Demain", time: "14:00", type: "Auto", status: "Confirmé" },
  { id: "a2", client: "Yasmine Tazi", advisor: "Nadia Alaoui", date: "Vendredi", time: "10:00", type: "Santé", status: "Confirmé" },
  { id: "a3", client: "Omar Cherkaoui", advisor: "Hamza Bennani", date: "Lundi", time: "09:30", type: "Habitation", status: "En attente" },
  { id: "a4", client: "Fatima Zahra", advisor: "Karim Idrissi", date: "Mardi", time: "11:00", type: "Pro", status: "Confirmé" },
  { id: "a5", client: "Anas Belkadi", advisor: "Nadia Alaoui", date: "Mercredi", time: "15:30", type: "Voyage", status: "En attente" },
];

export const advisors = [
  { id: "ad1", name: "Hamza Bennani", role: "Conseiller Senior", email: "h.bennani@jemassur.ma", status: "En ligne", conversations: 12 },
  { id: "ad2", name: "Nadia Alaoui", role: "Conseillère Santé", email: "n.alaoui@jemassur.ma", status: "En ligne", conversations: 8 },
  { id: "ad3", name: "Karim Idrissi", role: "Conseiller Pro", email: "k.idrissi@jemassur.ma", status: "Absent", conversations: 5 },
  { id: "ad4", name: "Salma Berrada", role: "Administratrice", email: "s.berrada@jemassur.ma", status: "En ligne", conversations: 3 },
];

export const stats = {
  conversationsToday: 47,
  qualifiedLeads: 23,
  appointments: 12,
  conversionRate: 48.9,
};

export const insuranceProducts = [
  { name: "Assurance Auto", desc: "Tiers, Tiers+, Tous Risques", icon: "🚗", color: "from-blue-500 to-cyan-500" },
  { name: "Assurance Habitation", desc: "Multirisque habitation", icon: "🏠", color: "from-indigo-500 to-blue-500" },
  { name: "Assurance Santé", desc: "Mutuelle individuelle et famille", icon: "❤️", color: "from-rose-500 to-pink-500" },
  { name: "Assurance Voyage", desc: "Couverture monde entier", icon: "✈️", color: "from-sky-500 to-blue-500" },
  { name: "Assurance Pro", desc: "PME, indépendants, RC Pro", icon: "💼", color: "from-violet-500 to-purple-500" },
  { name: "Prévoyance", desc: "Vie, décès, invalidité", icon: "🛡️", color: "from-emerald-500 to-teal-500" },
];

export const faqs = [
  { q: "Comment souscrire à une assurance ?", a: "Vous pouvez souscrire en ligne via notre assistant IA en moins de 5 minutes." },
  { q: "Quels documents sont nécessaires ?", a: "CIN, carte grise pour l'auto, ou titre de propriété pour l'habitation." },
  { q: "Puis-je modifier mon contrat ?", a: "Oui, à tout moment depuis votre espace client ou via un conseiller." },
  { q: "Quels sont les délais de remboursement ?", a: "Sous 48h ouvrées après réception du dossier complet." },
];
