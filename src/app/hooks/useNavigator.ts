/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "app/navigation/types";

/**
 * Official app react hook for using react native navigation when moving between
 * different screens of the app
 * @see NativeStackNavigationProp
 * @see AppNavigation
 * @returns NativeStackNavigationProp of AppNavigation
 */
export const useNavigator = () => useNavigation<AppNavigation>();
