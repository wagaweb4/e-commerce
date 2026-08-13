export function formatPrice(prix: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(prix))} FCFA`;
}
