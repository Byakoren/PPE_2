import { Tabs, useLocalSearchParams } from 'expo-router';

export default function TabLayout() {
  const { prenom, role } = useLocalSearchParams();

  return (
    <Tabs>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Accueil',
          headerShown: false,
        }}
        initialParams={{ prenom, role }}
      />

      {role === "ROLE_INTERVENANT" ? (
        <Tabs.Screen
          name="(emargement)/emargement_intervenant"
          options={{ title: 'Émarger' }}
          initialParams={{ prenom, role }}
        />
      ) : (
        <Tabs.Screen
          name="(emargement)/emargement_apprenant"
          options={{ title: 'Émarger' }}
          initialParams={{ prenom, role }}
        />
      )}

      <Tabs.Screen
        name="(historique)/historique"
        options={{ title: 'Historique' }}
        initialParams={{ prenom, role }}
      />
      <Tabs.Screen
        name="(profil)/profil"
        options={{ title: 'Profil' }}
        initialParams={{ prenom, role }}
      />
    </Tabs>
  );
}
