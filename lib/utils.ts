import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type SessionForRemaining = { capacity: number; bookings: Array<unknown> }
export function getRemainingSpots(session: SessionForRemaining): number {
  const taken = session.bookings.length
  const remaining = session.capacity - taken
  return remaining < 0 ? 0 : remaining
}
