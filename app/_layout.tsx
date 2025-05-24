import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'GeMargement',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      
      <Stack.Screen name="login" />
      
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      
    </Stack>
  );
}
