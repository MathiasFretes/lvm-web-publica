// ─────────────────────────────────────────────
// useCheckForUpdates — Hook para verificar actualizaciones
// ─────────────────────────────────────────────

import { useState, useCallback } from 'react';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { checkForUpdates, ApkVersionInfo } from '../apk/apkVersionService';
import { Alert, Linking, Platform } from 'react-native';

interface UseCheckForUpdatesResult {
  checkForUpdate: () => Promise<void>;
  updateAvailable: boolean | null;
  latestVersion: ApkVersionInfo | null;
  currentVersion: string;
  isChecking: boolean;
  error: string | null;
}

export const useCheckForUpdates = (): UseCheckForUpdatesResult => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean | null>(null);
  const [latestVersion, setLatestVersion] = useState<ApkVersionInfo | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkForUpdate = useCallback(async () => {
    setIsChecking(true);
    setError(null);

    try {
      // Primero verificar con Expo Updates (para apps via Expo)
      if (Updates) {
        try {
          const update = await Updates.checkForUpdateAsync();

          if (update.isAvailable) {
            // Hay una actualización de Expo disponible
            setUpdateAvailable(true);
            await Updates.fetchUpdateAsync();

            Alert.alert(
              'Actualización disponible',
              'Se ha descargado una nueva versión. Reinicia la app para aplicar los cambios.',
              [
                { text: 'Reiniciar ahora', onPress: () => Updates.reloadAsync() },
                { text: 'Más tarde', style: 'cancel' },
              ]
            );
            setIsChecking(false);
            return;
          }
        } catch (updateError) {
          // Expo Updates no está disponible (app no publicada via EAS)
          console.log('Expo Updates not available, checking manual version');
        }
      }

      // Verificar manualmente desde Firestore (para APK directo)
      const result = await checkForUpdates();

      setUpdateAvailable(result.updateAvailable);
      setLatestVersion(result.latestVersion);
      setCurrentVersion(result.currentVersion);

      if (result.updateAvailable && result.latestVersion) {
        Alert.alert(
          `Nueva versión disponible: ${result.latestVersion.version}`,
          `Tu versión actual: ${result.currentVersion}\n\n${result.latestVersion.changelog.slice(0, 3).join('\n')}${result.latestVersion.changelog.length > 3 ? '\n...' : ''}`,
          [
            {
              text: 'Descargar',
              onPress: () => {
                if (result.latestVersion?.downloadUrl) {
                  Linking.openURL(result.latestVersion.downloadUrl);
                }
              }
            },
            { text: 'Más tarde', style: 'cancel' },
          ]
        );
      } else if (!result.updateAvailable && result.latestVersion === null) {
        // No se pudo obtener información de actualización
        console.log('No se pudo verificar actualizaciones');
      }
    } catch (err) {
      console.error('Error checking for updates:', err);
      setError('Error al verificar actualizaciones');
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    checkForUpdate,
    updateAvailable,
    latestVersion,
    currentVersion,
    isChecking,
    error,
  };
};

export default useCheckForUpdates;
