// Ce fichier est ton "majordome" pour le chat texte.
// Il reçoit les messages depuis ton site, ajoute la clé API en secret,
// et renvoie la réponse de Gemini. La clé n'est JAMAIS visible par les visiteurs.

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Clé API manquante côté serveur' });
  }

  const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + API_KEY;

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur : ' + error.message });
  }
}
