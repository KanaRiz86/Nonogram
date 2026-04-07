// Formate la première colonne du tableau "Rang"
 export function formaterRang(rang) {
      switch (rang) {
          case 1: return "1er";
          case 2: return "2eme";
          case 3: return "3eme";
          case 4: return "4eme";
          case 5: return "5eme";
          default: return ""; // Ne devrait jamais arriver (car LIMIT 5 en SQL)
      }
  }