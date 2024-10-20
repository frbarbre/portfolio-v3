export default function getToolName(name: string | undefined): string | null {
  if (name === 'addResource') {
    return 'Add Ressource';
  }
  if (name === 'getInformation') {
    return 'Get Information';
  }

  return null;
}
