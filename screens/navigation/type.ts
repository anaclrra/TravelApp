// navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  TripDetailsScreen: { tripId: string };
  Home: {tripId: string};
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TripDetailsScreen'>;
