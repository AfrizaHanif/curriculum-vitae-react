"use client";

import { useEffect } from "react";
import type { Tooltip as BootstrapTooltip } from "bootstrap";

export default function BootstrapClient() {
  useEffect(() => {
    let observer: MutationObserver | null = null;

    type TooltipConstructor = {
      new (el: Element, options?: unknown): BootstrapTooltip;
      getInstance?: (el: Element) => BootstrapTooltip | null;
      getOrCreateInstance?: (el: Element) => BootstrapTooltip;
    };

    async function initTooltips() {
      try {
        const bs = await import("bootstrap/dist/js/bootstrap.bundle.min.js");

        // Bootstrap exposes Tooltip and Popover on the module or on the default export
        const Tooltip =
          (
            bs as unknown as {
              Tooltip?: TooltipConstructor;
              Popover?: TooltipConstructor;
              default?: {
                Tooltip?: TooltipConstructor;
                Popover?: TooltipConstructor;
              };
            }
          ).Tooltip ??
          (bs as unknown as { default?: { Tooltip?: TooltipConstructor } })
            .default?.Tooltip;

        const Popover =
          (
            bs as unknown as {
              Popover?: TooltipConstructor;
              default?: { Popover?: TooltipConstructor };
            }
          ).Popover ??
          (bs as unknown as { default?: { Popover?: TooltipConstructor } })
            .default?.Popover;

        // init tooltips
        const tooltipEls = Array.from(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );

        tooltipEls.forEach((el) => {
          // Avoid creating duplicate instances (use getInstance if available)
          if (Tooltip && !Tooltip.getInstance?.(el)) {
            // Prefer getOrCreateInstance if available
            if (Tooltip.getOrCreateInstance) {
              Tooltip.getOrCreateInstance(el);
            } else {
              new Tooltip(el);
            }
          }
        });

        // init popovers
        const popEls = Array.from(
          document.querySelectorAll('[data-bs-toggle="popover"]')
        );

        popEls.forEach((el) => {
          if (Popover && !Popover.getInstance?.(el)) {
            if (Popover.getOrCreateInstance) {
              Popover.getOrCreateInstance(el);
            } else {
              new Popover(el);
            }
          }
        });
      } catch {
        // fail silently - tooltips are non-critical
      }
    }

    // Initialize once
    initTooltips();

    // Watch for dynamic changes (optional but helpful for client-rendered content)
    observer = new MutationObserver(() => initTooltips());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();

      // Dispose tooltip instances on unmount to avoid memory leaks
      const globalBootstrap = (
        window as unknown as {
          bootstrap?: {
            Tooltip?: TooltipConstructor;
            Popover?: TooltipConstructor;
          };
        }
      ).bootstrap;
      if (globalBootstrap) {
        // dispose tooltips
        if (globalBootstrap.Tooltip) {
          const els = Array.from(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
          );
          els.forEach((el) => {
            const inst = globalBootstrap.Tooltip?.getInstance?.(el);
            if (inst && typeof inst.dispose === "function") inst.dispose();
          });
        }

        // dispose popovers
        if (globalBootstrap.Popover) {
          const els = Array.from(
            document.querySelectorAll('[data-bs-toggle="popover"]')
          );
          els.forEach((el) => {
            const inst = globalBootstrap.Popover?.getInstance?.(el);
            if (inst && typeof inst.dispose === "function") inst.dispose();
          });
        }
      }
    };
  }, []);

  return null;
}
