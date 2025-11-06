"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/hooks/useKeyboardNavigation";
import { focusManagement, screenReader } from "@/lib/utils/accessibility";
import { X } from "lucide-react";

interface AccessibleModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Function to close the modal
   */
  onClose: () => void;

  /**
   * Modal title
   */
  title: string;

  /**
   * Modal description (optional)
   */
  description?: string;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes for the modal content
   */
  className?: string;

  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;

  /**
   * Whether clicking the overlay closes the modal
   */
  closeOnOverlayClick?: boolean;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = "md",
}: AccessibleModalProps) {
  const modalRef = useFocusTrap(isOpen);
  const titleId = useRef(
    `modal-title-${Math.random().toString(36).substr(2, 9)}`
  );
  const descriptionId = useRef(
    `modal-description-${Math.random().toString(36).substr(2, 9)}`
  );

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId.current}
      aria-describedby={description ? descriptionId.current : undefined}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-sand-900/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={modalRef as React.RefObject<HTMLDivElement>}
        className={cn(
          "relative w-full bg-cream-50 rounded-lg shadow-xl border border-sand-200",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          sizeClasses[size],
          size === "full" && "h-full overflow-auto",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-sand-200">
          <div className="flex-1 pr-4">
            <h2
              id={titleId.current}
              className="text-xl font-semibold text-sand-900 leading-tight"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId.current}
                className="mt-2 text-sm text-sand-700"
              >
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <button
              onClick={onClose}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-base text-sand-600 hover:text-sand-900 hover:bg-sand-100 transition-colors",
                focusManagement.focusRing
              )}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  // Render in portal to ensure proper stacking
  return createPortal(modalContent, document.body);
}

/**
 * Accessible alert dialog component
 */
interface AccessibleAlertDialogProps {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;

  /**
   * Function to close the dialog
   */
  onClose: () => void;

  /**
   * Dialog title
   */
  title: string;

  /**
   * Dialog message
   */
  message: string;

  /**
   * Confirm button text
   */
  confirmText?: string;

  /**
   * Cancel button text
   */
  cancelText?: string;

  /**
   * Confirm action handler
   */
  onConfirm?: () => void;

  /**
   * Dialog type
   */
  type?: "info" | "warning" | "error" | "success";
}

export function AccessibleAlertDialog({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  type = "info",
}: AccessibleAlertDialogProps) {
  const typeIcons = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
    success: "✅",
  };

  const typeColors = {
    info: "text-sand-700",
    warning: "text-clay-700",
    error: "text-terracotta-700",
    success: "text-sage-700",
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnOverlayClick={false}
      showCloseButton={false}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <span className="text-2xl" aria-hidden="true">
            {typeIcons[type]}
          </span>
          <p className={cn("text-base leading-relaxed", typeColors[type])}>
            <span className={screenReader.only}>
              {type === "error"
                ? "Error: "
                : type === "warning"
                ? "Warning: "
                : type === "success"
                ? "Success: "
                : "Info: "}
            </span>
            {message}
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className={cn(
              "px-4 py-2 text-sm font-medium text-sand-700 bg-transparent border border-sand-300 rounded-base hover:bg-sand-50 transition-colors",
              focusManagement.focusRing
            )}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium text-cream-50 bg-terracotta-500 border border-terracotta-500 rounded-base hover:bg-terracotta-600 transition-colors",
              focusManagement.focusRing
            )}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </AccessibleModal>
  );
}
