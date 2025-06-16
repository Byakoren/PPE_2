import { Tabs, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet, Platform } from 'react-native';

export default function TabLayout() {

  // Récupération des paramètres utilisateur (prénom, rôle)
  const {id, prenom, role } = useLocalSearchParams();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#F24C27',
            tabBarInactiveTintColor: '#ffffff',
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          <Tabs.Screen
            name="(home)/index"
            options={{
              title: 'Accueil',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
            initialParams={{ prenom, role }}
          />

          {role === 'ROLE_INTERVENANT' ? (
            <Tabs.Screen
              name="(emargement)/emargement_intervenant"
              options={{
                title: 'Émarger',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="clipboard-outline" size={size} color={color} />
                ),
              }}
              initialParams={{ prenom, role }}
            />
          ) : (
            <Tabs.Screen
              name="(emargement)/emargement_apprenant"
              options={{
                title: 'Émarger',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="checkmark-circle-outline" size={size} color={color} />
                ),
              }}
              initialParams={{ prenom, role }}
            />
          )}

          <Tabs.Screen
            name="(historique)/historique"
            options={{
              title: 'Historique',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="time-outline" size={size} color={color} />
              ),
            }}
            initialParams={{id, prenom, role }}
          />

          <Tabs.Screen
            name="(profil)/profil"
            options={{
              title: 'Profil',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" size={size} color={color} />
              ),
            }}
            initialParams={{ prenom, role }}
          />
        </Tabs>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020024', 
  },
  tabBar: {
    backgroundColor: '#1b2a59',
    height: 70,
    paddingBottom: 8,
    paddingTop: 6,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'android' ? 50 : 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
    borderTopColor: '#000',
  },
});
