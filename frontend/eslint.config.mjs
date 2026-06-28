import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import unusedImports from "eslint-plugin-unused-imports";

const disabledReactRules = Object.fromEntries(
  nextCoreWebVitals.flatMap((entry) =>
    Object.keys(entry.rules ?? {})
      .filter((ruleName) => ruleName.startsWith("react/"))
      .map((ruleName) => [ruleName, "off"])
  )
);

const config = [
  ...nextCoreWebVitals,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      ...disabledReactRules,
      "unused-imports/no-unused-imports": 2,
    },
  },
];

export default config;
