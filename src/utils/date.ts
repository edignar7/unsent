import { format, formatDistanceToNow, parseISO, differenceInDays } from 'date-fns';

export function formatMessageDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}

export function formatMessageTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'h:mm a');
}

export function formatRelativeTime(dateString: string): string {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function getDaysSince(dateString: string): number {
  const date = parseISO(dateString);
  return differenceInDays(new Date(), date);
}

export function getHourOfDay(dateString: string): number {
  const date = parseISO(dateString);
  return date.getHours();
}

export function getTimeOfDay(hour: number): string {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'late night';
}
