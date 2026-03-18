export function normalizeBranch(value: string): string {
  return value.split('/')[0].trim();
}