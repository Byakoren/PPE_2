import { Tabs, useLocalSearchParams } from 'expo-router';

// Layout principal des onglets de l'application
export default function TabLayout() {
  // Récupération des paramètres utilisateur (prénom, rôle)
  const { prenom, role } = useLocalSearchParams();

  return (
    <Tabs>
      {/* Onglet Accueil */}
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Accueil',
          headerShown: false,
        }}
        initialParams={{ prenom, role }}
      />

      {/* Onglet Émargement : affiché différemment selon le rôle */}
      {role === "ROLE_INTERVENANT" ? (
        <>
          <Tabs.Screen
            name="(emargement)/emargement_intervenant"
            options={{ 
              title: 'Émarger',
              headerShown: false,
            }}
            initialParams={{ prenom, role }}
          />
          <Tabs.Screen
            name="(voiremarg)/voir_emargement.tsx"
            options={{ 
              title: 'Voir emargement',
              headerShown: true,
            }}
            //initialParams={{ prenom, role }}
          />
        </>
      ) : (
        <Tabs.Screen
          name="(emargement)/emargement_apprenant"
          options={{ title: 'Émarger' }}
          initialParams={{ prenom, role }}
        />
      )}
      
      {/* Onglet Historique */}
      <Tabs.Screen
        name="(historique)/historique"
        options={{ title: 'Historique' }}
        initialParams={{ prenom, role }}
      />
      {/* Onglet Profil */}
      <Tabs.Screen
        name="(profil)/profil"
        options={{ title: 'Profil' }}
        initialParams={{ prenom, role }}
      />
    </Tabs>
  );
}
