"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook for managing keyboard navigation in lists and grids
 */
export function useKeyboardNavigation<T extends HTMLElement>({
  items,
  orientation = "vertical",
  loop = true,
  onSelect,
}: {
  items: T[];
  orientation?: "vertical" | "horizontal" | "grid";
  loop?: boolean;
  onSelect?: (index: number, item: T) => void;
}) {
  const currentIndex = useRef(0);
  const containerRef = useRef<HTMLElement>(null);

  const focusItem = useCallback(
    (index: number) => {
      if (items[index]) {
        items[index].focus();
        currentIndex.current = index;
      }
    },
    [items]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      let newIndex = currentIndex.current;

      switch (orientation) {
        case "vertical":
          if (key === "ArrowDown") {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current + 1) % items.length
              : Math.min(currentIndex.current + 1, items.length - 1);
          } else if (key === "ArrowUp") {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current - 1 + items.length) % items.length
              : Math.max(currentIndex.current - 1, 0);
          }
          break;

        case "horizontal":
          if (key === "ArrowRight") {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current + 1) % items.length
              : Math.min(currentIndex.current + 1, items.length - 1);
          } else if (key === "ArrowLeft") {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current - 1 + items.length) % items.length
              : Math.max(currentIndex.current - 1, 0);
          }
          break;

        case "grid":
          // Grid navigation requires knowing columns per row
          // For now, treat as vertical
          if (key === "ArrowDown" || key === "ArrowRight") {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current + 1) % items.length
              : Math.min(currentIndex.current + 1, items.length - 1);
          } else if (key === "ArrowUp" || key === "ArrowLeft") {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current - 1 + items.length) % items.length
              : Math.max(currentIndex.current - 1, 0);
          }
          break;
      }

      // Handle Enter and Space for selection
      if (key === "Enter" || key === " ") {
        event.preventDefault();
        onSelect?.(currentIndex.current, items[currentIndex.current]);
        return;
      }

      // Handle Home and End keys
      if (key === "Home") {
        event.preventDefault();
        newIndex = 0;
      } else if (key === "End") {
        event.preventDefault();
        newIndex = items.length - 1;
      }

      if (newIndex !== currentIndex.current) {
        focusItem(newIndex);
      }
    },
    [items, orientation, loop, onSelect, focusItem]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
      return () => container.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown]);

  return {
    containerRef,
    focusItem,
    currentIndex: currentIndex.current,
  };
}

/**
 * Hook for managing focus trap in modals and dialogs
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Get all focusable elements
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element
    if (firstElement) {
      firstElement.focus();
    }

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        // Return focus to previously focused element
        previousFocusRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscapeKey);

      // Return focus when trap is deactivated
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Hook for managing roving tabindex in component groups
 */
export function useRovingTabIndex<T extends HTMLElement>({
  items,
  defaultIndex = 0,
}: {
  items: T[];
  defaultIndex?: number;
}) {
  const activeIndex = useRef(defaultIndex);

  const setActiveIndex = useCallback(
    (index: number) => {
      // Remove tabindex from all items
      items.forEach((item, i) => {
        if (i === index) {
          item.setAttribute("tabindex", "0");
          activeIndex.current = index;
        } else {
          item.setAttribute("tabindex", "-1");
        }
      });
    },
    [items]
  );

  useEffect(() => {
    // Initialize tabindex values
    setActiveIndex(defaultIndex);
  }, [defaultIndex, setActiveIndex]);

  return {
    activeIndex: activeIndex.current,
    setActiveIndex,
  };
}

/**
 * Hook for skip links functionality
 */
export function useSkipLinks() {
  const skipLinksRef = useRef<HTMLElement>(null);

  const addSkipLink = useCallback((targetId: string, label: string) => {
    if (!skipLinksRef.current) return;

    const skipLink = document.createElement("a");
    skipLink.href = `#${targetId}`;
    skipLink.textContent = label;
    skipLink.className =
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-terracotta-600 focus:text-cream-50 focus:rounded-base focus:no-underline";

    skipLinksRef.current.appendChild(skipLink);

    return () => {
      if (skipLinksRef.current?.contains(skipLink)) {
        skipLinksRef.current.removeChild(skipLink);
      }
    };
  }, []);

  return {
    skipLinksRef,
    addSkipLink,
  };
}

/**
 * Hook for managing keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifiers = {
        ctrl: event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
        meta: event.metaKey,
      };

      // Build shortcut string
      const shortcutParts = [];
      if (modifiers.ctrl) shortcutParts.push("ctrl");
      if (modifiers.alt) shortcutParts.push("alt");
      if (modifiers.shift) shortcutParts.push("shift");
      if (modifiers.meta) shortcutParts.push("meta");
      shortcutParts.push(key);

      const shortcutString = shortcutParts.join("+");

      if (shortcuts[shortcutString]) {
        event.preventDefault();
        shortcuts[shortcutString]();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}

/**
 * Hook for accessible dropdown/combobox behavior
 */
export function useCombobox<T>({
  items,
  onSelect,
  isOpen,
  onToggle,
}: {
  items: T[];
  onSelect: (item: T, index: number) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}) {
  const activeIndex = useRef(-1);
  const triggerRef = useRef<HTMLElement>(null);
  const listboxRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            onToggle(true);
          } else {
            activeIndex.current = Math.min(
              activeIndex.current + 1,
              items.length - 1
            );
          }
          break;

        case "ArrowUp":
          event.preventDefault();
          if (!isOpen) {
            onToggle(true);
          } else {
            activeIndex.current = Math.max(activeIndex.current - 1, 0);
          }
          break;

        case "Enter":
        case " ":
          event.preventDefault();
          if (isOpen && activeIndex.current >= 0) {
            onSelect(items[activeIndex.current], activeIndex.current);
            onToggle(false);
          } else {
            onToggle(!isOpen);
          }
          break;

        case "Escape":
          event.preventDefault();
          if (isOpen) {
            onToggle(false);
            triggerRef.current?.focus();
          }
          break;

        case "Home":
          if (isOpen) {
            event.preventDefault();
            activeIndex.current = 0;
          }
          break;

        case "End":
          if (isOpen) {
            event.preventDefault();
            activeIndex.current = items.length - 1;
          }
          break;
      }
    },
    [items, isOpen, onSelect, onToggle]
  );

  return {
    triggerRef,
    listboxRef,
    activeIndex: activeIndex.current,
    handleKeyDown,
  };
}
