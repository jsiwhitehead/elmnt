# Elmnt

### HTML elements reimagined with react.

```
yarn add elmnt
```

## Components

* **Div:** wrapper for flexbox-like layouts
* **Icon:** SVG icons
* **Txt:** static and dynamic text
* **Mark:** markdown renderer
* **Input:** flexible input control

## Overview

Elmnt is a small collection of stylable React components which can be used as the building blocks for complex, interactive, visually coherent UIs.

Div, Icon, Txt and Mark are all used for layout and static content, while Input provides a flexible control for boolean, int, float, date, string values (and multi-value equivalents).

## Styling

All components are stylable using inline css objects, with minor extensions for the Div component, and nested sub-styles for the others:

* **Div:** `CSSProps & { layout: 'stack' | 'bar' | 'grid', spacing: number }`
* **Txt:** `CSSProps & { placeholder: CSSProps }`
* **Mark:** `CSSProps & { em: CSSProps, st: CSSProps, link: CSSProps, heading: CSSProps, hr: CSSProps }`
* **Input:** `CSSProps & { invalid: CSSProps, focus: CSSProps, hover: CSSProps, active: CSSProps }`

Using [style-transform](https://github.com/kalambo/style-transform), these top-level style properties are efficiently (through memoization) broken down and transformed into individual inline styles for the actual DOM elements of each component.

This allows Elmnt components to be treated essentially like standard DOM elements, but with much more powerful and predictable behaviour in their treatment of CSS.
