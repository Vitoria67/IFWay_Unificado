import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps'; // Importando o Marker para adicionar um marcador no mapa
import { StyleSheet, View} from 'react-native';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';
import * as Speech from 'expo-speech'; // Para a narração de voz

export default function App() {
  const [location, setLocation] = useState<any | null>(null); // Tipagem ajustada

  const mapRef = useRef<MapView>(null); // Tipagem correta da referência

  // Lista de pontos de interesse com coordenadas e descrições
  const pointsOfInterest = [
    {
      id: 1,
      latitude: -31.332431,
      longitude: -54.072554,
      title: "Fileira Lateral",
      description: "Primeira Fileira de Computadores.",
    },
    {
      id: 2,
      latitude: -31.332427,
      longitude: -54.072587,
      title: "Fileira Central",
      description: "Fileira de computadores central.",
    },
    {
      id: 3,
      latitude: -31.332442,
      longitude: -54.072631,
      title: "Fileira Lateral 2",
      description: "Última fileira de computadores",
    }
  ];

  // Função para solicitar permissão de localização e pegar a posição inicial
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition); // Define a localização inicial
      console.log('LOCALIZAÇÃO ATUAL =>', currentPosition);
    }
  }

  // Solicita as permissões assim que o componente for carregado
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  // Função para calcular a distância entre duas coordenadas (latitude e longitude)
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Raio da Terra em km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Retorna a distância em metros
  }

  // Função para detectar quando o usuário está perto de um ponto
  function checkProximityToPoint(userLocation: any) {
    pointsOfInterest.forEach((point) => {
      const distance = calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        point.latitude,
        point.longitude
      );

      // Se o usuário estiver dentro de um raio de 50 metros, narra a descrição
      if (distance < 50) {
        Speech.speak(point.description); // Narra a descrição
        console.log(`Usuário perto de ${point.title}: ${point.description}`);
      }
    });
  }

  // Monitorando mudanças de localização com watchPositionAsync
  useEffect(() => {
    const subscription = watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000, // Atualiza a cada 1 segundo
        distanceInterval: 1, // Atualiza a cada 1 metro
      },
      (response) => {
        setLocation(response); // Atualiza a localização no estado
        checkProximityToPoint(response); // Verifica proximidade com pontos de interesse

        // Se a referência do mapa estiver disponível, anima a câmera para a nova localização
        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: response.coords, // Ajusta a posição central
            pitch: 70, // Define o ângulo de visão do mapa
            zoom: 16, // Ajusta o zoom
          });
        }
      }
    );

    // Função de limpeza para parar o watchPositionAsync ao desmontar o componente
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef} // Referência ao MapView para animação
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005, // Define o zoom inicial
            longitudeDelta: 0.005,
          }}
        >
          {/* Marker para a localização atual do usuário */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Minha Localização"
            description="Aqui está sua posição."
          />

          {/* Marcadores adicionais de pontos de interesse */}
          {pointsOfInterest.map((point) => (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              title={point.title}
              description={point.description}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

// Estilos para o container e mapa
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});