import { describe, it, expect } from "vitest";
import { getRemainingSpots } from "@/lib/utils";

describe("getRemainingSpots", () => {
  it("calculates remaining correctly", () => {
    expect(getRemainingSpots({ capacity: 10, bookings: Array(3) })).toBe(7);
  });
  it("does not go below zero", () => {
    expect(getRemainingSpots({ capacity: 2, bookings: Array(5) })).toBe(0);
  });
});
