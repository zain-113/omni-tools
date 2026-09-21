export type AdSlotType = 'leaderboard' | 'in-article' | 'sidebar' | 'footer';

interface AdPlaceholderProps {
  slot?: AdSlotType;
  className?: string;
}

export default function AdPlaceholder(_props: AdPlaceholderProps) {
  // Temporary advertisement containers removed
  return null;
}
