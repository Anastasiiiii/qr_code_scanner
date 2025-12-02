import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { sendVisitData } from '@/services/api';

interface QRScannerProps {
  onScanSuccess?: (data: string) => void;
  onScanError?: (error: string) => void;
  apiUrl?: string;
}

export default function QRScanner({ 
  onScanSuccess, 
  onScanError,
  apiUrl 
}: QRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setHasPermission(false);
    }
  };

  const handleBarCodeScanned = async ({ data }: BarCodeScannerResult) => {
    if (scanned || isLoading) return;

    setScanned(true);
    setIsLoading(true);

    try {
      // Відправляємо дані на сервер
      const result = await sendVisitData({
        token: data,
        timestamp: new Date().toISOString(),
        deviceInfo: {
          platform: Platform.OS,
          version: Platform.Version?.toString(),
        },
      });

      if (result.success) {
        Alert.alert(
          'Успіх',
          result.message || 'Відвідування успішно зареєстровано',
          [
            {
              text: 'OK',
              onPress: () => {
                setScanned(false);
                setIsLoading(false);
                onScanSuccess?.(data);
              },
            },
          ]
        );
      } else {
        throw new Error(result.message || 'Помилка при відправці даних');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Невідома помилка';
      Alert.alert(
        'Помилка',
        errorMessage,
        [
          {
            text: 'Спробувати знову',
            onPress: () => {
              setScanned(false);
              setIsLoading(false);
            },
          },
        ]
      );
      onScanError?.(errorMessage);
    }
  };

  if (hasPermission === null) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>Запит доступу до камери...</ThemedText>
      </ThemedView>
    );
  }

  if (hasPermission === false) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>Немає доступу до камери</ThemedText>
        <ThemedText style={styles.subMessage}>
          Будь ласка, надайте дозвіл на використання камери в налаштуваннях додатку
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
      {isLoading && (
        <View style={styles.overlay}>
          <ThemedView style={styles.loadingContainer}>
            <ThemedText style={styles.loadingText}>Обробка...</ThemedText>
          </ThemedView>
        </View>
      )}
      <View style={styles.instructionsContainer}>
        <ThemedText style={styles.instructions}>
          Наведіть камеру на QR-код для сканування
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    flex: 1,
    width: '100%',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

