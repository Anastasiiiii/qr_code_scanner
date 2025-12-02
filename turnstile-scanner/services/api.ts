const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://unmocked-wackily-ivory.ngrok-free.dev';

export interface VisitData {
  token: string;
  timestamp?: string;
  deviceInfo?: {
    platform: string;
    version?: string;
  };
}

export interface VisitResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function sendVisitData(visitData: VisitData): Promise<VisitResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/passes/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: visitData.token,
        timestamp: visitData.timestamp || new Date().toISOString(),
        deviceInfo: visitData.deviceInfo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
      message: data.message || 'Відвідування успішно зареєстровано',
    };
  } catch (error) {
    console.error('Error sending visit data:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Помилка при відправці даних',
    };
  }
}

