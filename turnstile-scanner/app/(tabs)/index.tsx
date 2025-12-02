import { StyleSheet } from 'react-native';
import QRScanner from '@/components/qr-scanner';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <QRScanner
        onScanSuccess={(data) => {
          console.log('QR код успішно скановано:', data);
        }}
        onScanError={(error) => {
          console.error('Помилка сканування:', error);
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
