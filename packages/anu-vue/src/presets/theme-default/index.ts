import type { Preset } from "@unocss/core";
export const colors = ["primary", "success", "info", "warning", "danger"];

export function presetThemeDefault(): Preset {
  return {
    name: "@anu-vue/preset-theme-default",
    theme: {
      colors: {
        primary: "hsl(var(--primary))",
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
      },
    },
    safelist: [
      ...colors.map((c) => `bg-${c}`),
      ...colors.map((c) => `hover:bg-${c}`),

      ...colors.map((c) => `border-${c}`),
      ...colors.map((c) => `text-${c}`),
      ...colors.map((c) => `shadow-${c}`),
    ],
    rules: [
      [
        /^s-(\w+)$/,
        ([, c]: string[]) => ({
          "background-color": `hsl(var(--${c}))`,
          color: `hsl(var(--on-${c}))`,
        }),
      ],
      [
        "overlay",
        {
          position: "absolute",
          inset: 0,
          content: "''",
          background: "currentColor",
          opacity: 0,
        },
      ],
    ],
    shortcuts: [
      {
        btn: "py-2 px-4 font-semibold rounded-lg transition duration-200 ease-in-out",
        states: "relative after:overlay hover:after:opacity-25",
      },
    ],
  };
}