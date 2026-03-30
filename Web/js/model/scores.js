// ====================== Fonction permettant de calculer le score // ================================


function calculScore(temps, tailleGrille, erreurs) {
    // création de la variable pour accorder des points fixes de victoire selon la taille de la grille
    let pointsFixes;
    // création de la variable pour accorder un coefficient selon la taille de la grille
    let coefficient;

    switch (tailleGrille) {
        case 5:
            pointsFixes = 100;
            coefficient = 1;
            break;
        case 10:
            pointsFixes = 300;
            coefficient = 2;
            break;
        case 15:
            pointsFixes = 500;
            coefficient = 4;
            break;
        default:
            pointsFixes = 0;
            coefficient = 1;
    }
    // Variable de type constante basé sur 20 minutes (soit 1200 secondes)
    const tempsMax = 1200;
    // Math.max permet de prendre la plus grande valeur
    // Dans notre cas : tempsMax - temps = 1200 - 1500 (si le joueur finit la grille en 25 minutes)
    // Intervient alors Math.max(0, -300) --> Résultat = 0
    // 0 * coefficient = 0 , ça évite tout résultat négatif
    const bonusTemps = Math.max(0, tempsMax - temps) * coefficient;
    // 2 erreurs * 20 = 40 points
    const penalite = erreurs * 20;
    // Même procédé admettons grille 10*10 réalisée en 10 min
    // 300 + ((1200 - 600)*2) - 40 = 300 + (600*2) -40 = 1500 - 40 = 1460
    return Math.max(0, pointsFixes + bonusTemps - penalite);
  }