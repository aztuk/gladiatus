export function getCycleDisplay(cycle: number): string {
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const month = monthNames[cycle % 12];
  const year = Math.floor(cycle / 12) + 1;
  return `${month} ${year}`;
}
