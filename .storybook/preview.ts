import type { Preview } from "@storybook/nextjs";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: "#fdfcfb", // cream-50
        },

        surface: {
          name: "surface",
          value: "#faf8f5", // cream-100
        },

        sage: {
          name: "sage",
          value: "#7d8768", // sage-500
        },

        terracotta: {
          name: "terracotta",
          value: "#d4704d", // terracotta-500
        }
      }
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    docs: {
      toc: true,
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "light"
    }
  }
};

export default preview;
