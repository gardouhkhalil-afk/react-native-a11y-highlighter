# react-native-a11y-highlighter

DEV-only visual overlay that highlights accessibility issues directly in your React Native simulator. No need to open Xcode's Accessibility Inspector or Android's accessibility scanner.

## What it does

Drop `<A11yDevOverlay />` at the root of your app. In development mode, it draws colored borders around interactive elements:

- **Red** — Touch target smaller than 44×44dp (Apple HIG / WCAG 2.5.8)
- **Orange** — Missing `accessibilityLabel` or `accessibilityRole`
- **Green** — All checks pass

In production, it renders nothing. Zero overhead.

## Install

```sh
npm install react-native-a11y-highlighter
# or
yarn add react-native-a11y-highlighter
```

No native modules. Works with Expo out of the box.

## Quick start

```tsx
import { A11yDevOverlay, A11yCheck } from 'react-native-a11y-highlighter';

export default function App() {
  return (
    <A11yDevOverlay>
      {/* Wrap elements you want to audit */}
      <A11yCheck interactive name="Submit Button">
        <Pressable
          accessibilityLabel="Submit form"
          accessibilityRole="button"
          onPress={handleSubmit}
        >
          <Text>Submit</Text>
        </Pressable>
      </A11yCheck>
    </A11yDevOverlay>
  );
}
```

## API

### `<A11yDevOverlay>`

Wrap your app root. Activates the overlay in DEV mode.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `Partial<A11yOverlayConfig>` | — | Override default settings |
| `enabled` | `boolean` | `__DEV__` | Force enable/disable |

```tsx
<A11yDevOverlay
  config={{
    showPassingElements: true,    // Show green borders too
    minTouchTargetSize: 48,       // Use 48dp instead of 44dp
    showSummaryPanel: true,       // Floating badge with issue count
    borderWidth: 3,               // Thicker borders
    colors: {
      error: '#FF0000',
      warning: '#FFA500',
      pass: '#00FF00',
    },
  }}
>
  <App />
</A11yDevOverlay>
```

### `<A11yCheck>`

Wrap any element to register it for auditing.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `interactive` | `boolean` | auto-detected | Mark as interactive element |
| `name` | `string` | — | Display name in issue details |

```tsx
<A11yCheck interactive name="Close Button">
  <TouchableOpacity onPress={onClose} accessibilityLabel="Close" accessibilityRole="button">
    <Icon name="close" />
  </TouchableOpacity>
</A11yCheck>
```

When used outside of `<A11yDevOverlay>` (or in production), `<A11yCheck>` is a transparent passthrough — it returns children directly with no wrapper View.

### `useA11yRegister` hook

For cases where wrapping with `<A11yCheck>` isn't convenient:

```tsx
import { useA11yRegister } from 'react-native-a11y-highlighter';

function MyButton({ label }: { label: string }) {
  const { ref, onLayout } = useA11yRegister({
    a11yProps: { accessibilityLabel: label, accessibilityRole: 'button' },
    isInteractive: true,
    displayName: 'MyButton',
  });

  return (
    <Pressable
      ref={ref}
      onLayout={onLayout}
      accessibilityLabel={label}
      accessibilityRole="button"
      collapsable={false}
    >
      <Text>{label}</Text>
    </Pressable>
  );
}
```

## Checks

| Check | Severity | Condition |
|-------|----------|-----------|
| Touch target size | Error (red) | Width or height < 44dp on interactive elements |
| Accessibility label | Warning (orange) | Missing `accessibilityLabel` / `aria-label` on interactive elements |
| Accessibility role | Warning (orange) | Missing `accessibilityRole` on interactive elements |

## Summary panel

A floating badge appears in the top-right corner showing the issue count. Tap it to open a detail modal listing every issue with its element name and description.

## How it works

1. `<A11yDevOverlay>` creates a React Context (registry)
2. `<A11yCheck>` wrappers register elements via the context
3. `onLayout` + `measureInWindow()` provides absolute screen coordinates
4. The provider runs all checks against each element
5. `OverlayRenderer` reads from context and draws absolute-positioned colored borders
6. In production (`__DEV__ === false`): the overlay renders `<>{children}</>` — no context, no state, no measurement

## Compatibility

- React Native ≥ 0.70
- React ≥ 17
- Expo compatible
- Works on both Paper and Fabric architectures
- Pure JavaScript — no native modules

## License

MIT
