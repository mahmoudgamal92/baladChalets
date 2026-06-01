# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start          # Start Expo dev server
yarn android        # Run on Android device/emulator (requires native build)
yarn ios            # Run on iOS simulator (requires native build)
```

EAS builds (requires `eas-cli`):
```bash
eas build --profile development   # Dev client build
eas build --profile preview       # Internal APK distribution
eas build --profile production    # Production build with auto-increment version
```

There is no test suite or linter configured.

## Architecture

**Entry point:** `App.tsx` — wraps the app in Redux `<Provider>` and `<NavigationContainer>`, loads custom fonts (Bold, Light, Regular, Medium, ExtraBold from `src/assets/fonts/`), forces RTL off globally.

**Navigation:** Single stack navigator defined in `src/navigation/AppStack.tsx`. All route names and their param types live in `AppStackParamList`. Every screen must type its props as:
```ts
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "<relative-path>/navigation/AppStack";

type Props = StackScreenProps<AppStackParamList, "RouteName">;
export const MyScreen = ({ route, navigation }: Props) => { ... };
```

**Screen flows:**
- `Splash` → `TabNavigator` (Home) — entry, loads fonts check
- `VersionUpgrade` — force-update gate
- Old flow: `ChaletsAndFarmsResult` (List) → `ChaletsAndFarmsPreOrder` (PreOrder) → `ChaletsAndFarmsConfirm` (ConfirmOrder)
- New flow: `ChaletsAndFarmsNewList` (NewList) → `MonthSelection` → `Offers` → `NewPreOrder` (NewPerOrder) → `NewChaletsAndFarmsConfirm` (NewConfirmOrder)

**Path aliases** (Babel + tsconfig):
- `@components` → `src/components` (atoms + molecules + templates, all re-exported from `src/components/index.ts`)
- `@screens` → `src/screens/ChaletsAndFarms`

**Components** follow atoms/molecules/templates hierarchy:
- `BaseLayout` — wraps every screen; sets status bar to `#51672D` (brand green)
- `Header` — screen header molecule
- Custom font names used in styles: `Bold`, `Light`, `Regular`, `Medium`, `ExtraBold`

**Network (`src/network/index.js`):** Axios instance pointing to `https://services.alhajz-alsarea.com/api/`. Auth token is hardcoded in `headers`. Functions: `getSlider`, `getCatigories`, `getChaletsByCity`, `GetAllChaletByFilter`, `GetAvaliableOffersByDate`, `sendChaletRequest`, `sendWhatsappMsg`, `sendHotelRequest`. All return `response.data` or throw.

**State management:** Redux Toolkit store at `src/store/index.js` with two slices:
- `tokenReducer` — stores Bearer token (`state.tokenReducer.token`)
- `userReducer` — user info

**Constants (`src/const/`):**
- `api.js` — `baseURL`, `mediaURL`, `offerTypes` (day/shift types in Arabic), `ArrivalTypes`, `cities`, `north_cities`
- `source.js` — additional constants

**Reactotron** is configured for dev (`ReactotronConfig` at repo root, loaded conditionally in App.tsx).
