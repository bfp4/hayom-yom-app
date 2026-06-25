import { createNavigationContainerRef } from "@react-navigation/native"

export const navigationRef = createNavigationContainerRef()

export function navigateToToday() {
    if (navigationRef.isReady()) {
        navigationRef.navigate("Today")
    }
}
