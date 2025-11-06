"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { focusManagement, screenReader } from "@/lib/utils/accessibility";

/**
 * Accessible form field wrapper with proper labeling
 */
interface FormFieldProps {
  /**
   * Field label text
   */
  label: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Help text
   */
  description?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Form field content
   */
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  error,
  description,
  className,
  children,
}: FormFieldProps) {
  const fieldId = useId();
  const errorId = useId();
  const descriptionId = useId();

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-sand-900"
      >
        {label}
        {required && (
          <span className="text-terracotta-600 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {React.cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          "aria-required": required,
          "aria-invalid": !!error,
          "aria-describedby":
            cn(description && descriptionId, error && errorId).trim() ||
            undefined,
        })}
      </div>

      {description && !error && (
        <p id={descriptionId} className="text-sm text-sand-600">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-terracotta-600"
          role="alert"
          aria-live="polite"
        >
          <span className={screenReader.only}>Error: </span>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Accessible input component
 */
interface AccessibleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input variant
   */
  variant?: "default" | "error";

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const AccessibleInput = forwardRef<
  HTMLInputElement,
  AccessibleInputProps
>(({ variant = "default", className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        // Base styles
        "h-11 min-h-[44px] w-full min-w-0 rounded-base border-2 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none",
        // Placeholder styles
        "placeholder:text-sand-600",
        // Selection styles
        "selection:bg-terracotta-500 selection:text-cream-50",
        // Focus styles
        focusManagement.focusRing,
        // Hover styles
        "hover:border-sand-300",
        // Disabled styles
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-sand-100",
        // Variant styles
        variant === "default" && "border-sand-200",
        variant === "error" &&
          "border-terracotta-600 ring-2 ring-terracotta-600/20",
        // File input styles
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-sand-900",
        className
      )}
      {...props}
    />
  );
});

AccessibleInput.displayName = "AccessibleInput";

/**
 * Accessible textarea component
 */
interface AccessibleTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Textarea variant
   */
  variant?: "default" | "error";

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const AccessibleTextarea = forwardRef<
  HTMLTextAreaElement,
  AccessibleTextareaProps
>(({ variant = "default", className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // Base styles
        "min-h-[120px] w-full min-w-0 rounded-base border-2 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none resize-vertical",
        // Placeholder styles
        "placeholder:text-sand-600",
        // Selection styles
        "selection:bg-terracotta-500 selection:text-cream-50",
        // Focus styles
        focusManagement.focusRing,
        // Hover styles
        "hover:border-sand-300",
        // Disabled styles
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-sand-100",
        // Variant styles
        variant === "default" && "border-sand-200",
        variant === "error" &&
          "border-terracotta-600 ring-2 ring-terracotta-600/20",
        className
      )}
      {...props}
    />
  );
});

AccessibleTextarea.displayName = "AccessibleTextarea";

/**
 * Accessible select component
 */
interface AccessibleSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Select variant
   */
  variant?: "default" | "error";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Select options
   */
  children: React.ReactNode;
}

export const AccessibleSelect = forwardRef<
  HTMLSelectElement,
  AccessibleSelectProps
>(({ variant = "default", className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        // Base styles
        "h-11 min-h-[44px] w-full min-w-0 rounded-base border-2 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none",
        // Focus styles
        focusManagement.focusRing,
        // Hover styles
        "hover:border-sand-300",
        // Disabled styles
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-sand-100",
        // Variant styles
        variant === "default" && "border-sand-200",
        variant === "error" &&
          "border-terracotta-600 ring-2 ring-terracotta-600/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

AccessibleSelect.displayName = "AccessibleSelect";

/**
 * Accessible checkbox component
 */
interface AccessibleCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Checkbox label
   */
  label: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Description text
   */
  description?: string;
}

export const AccessibleCheckbox = forwardRef<
  HTMLInputElement,
  AccessibleCheckboxProps
>(({ label, className, description, ...props }, ref) => {
  const checkboxId = useId();
  const descriptionId = useId();

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        className={cn(
          "mt-1 h-4 w-4 min-h-[16px] min-w-[16px] rounded border-2 border-sand-300 bg-cream-50 text-terracotta-500 transition-colors",
          focusManagement.focusRing,
          "checked:bg-terracotta-500 checked:border-terracotta-500",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      />
      <div className="flex-1">
        <label
          htmlFor={checkboxId}
          className="text-sm font-medium text-sand-900 cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-sm text-sand-600 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});

AccessibleCheckbox.displayName = "AccessibleCheckbox";

/**
 * Accessible radio group component
 */
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface AccessibleRadioGroupProps {
  /**
   * Group name
   */
  name: string;

  /**
   * Group label
   */
  label: string;

  /**
   * Radio options
   */
  options: RadioOption[];

  /**
   * Selected value
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (value: string) => void;

  /**
   * Whether the group is required
   */
  required?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export function AccessibleRadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  required = false,
  className,
}: AccessibleRadioGroupProps) {
  const groupId = useId();

  return (
    <fieldset className={cn("space-y-4", className)}>
      <legend className="text-sm font-medium text-sand-900">
        {label}
        {required && (
          <span className="text-terracotta-600 ml-1" aria-label="required">
            *
          </span>
        )}
      </legend>

      <div className="space-y-3" role="radiogroup" aria-labelledby={groupId}>
        {options.map((option) => {
          const optionId = useId();
          const descriptionId = useId();

          return (
            <div key={option.value} className="flex items-start gap-3">
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className={cn(
                  "mt-1 h-4 w-4 min-h-[16px] min-w-[16px] border-2 border-sand-300 bg-cream-50 text-terracotta-500 transition-colors",
                  focusManagement.focusRing,
                  "checked:bg-terracotta-500 checked:border-terracotta-500"
                )}
                aria-describedby={
                  option.description ? descriptionId : undefined
                }
                required={required}
              />
              <div className="flex-1">
                <label
                  htmlFor={optionId}
                  className="text-sm font-medium text-sand-900 cursor-pointer"
                >
                  {option.label}
                </label>
                {option.description && (
                  <p id={descriptionId} className="text-sm text-sand-600 mt-1">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
