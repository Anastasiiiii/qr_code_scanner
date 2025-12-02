# QR Code Scanner - Turnstile Scanner 👋

Додаток для сканування QR-кодів з токенами та відправки інформації про відвідування на сервер.

## Функціонал

- Сканування QR-кодів з токенами
- Автоматична відправка інформації про відвідування на бекенд
- Обробка помилок та повідомлення користувачу
- Підтримка iOS та Android

## Налаштування API

Для налаштування URL вашого бекенду, створіть файл `.env` в корені проєкту:

```
EXPO_PUBLIC_API_URL=https://your-backend.com/api
```

Або змініть значення за замовчуванням в файлі `services/api.ts`.

## API Endpoint

Додаток відправляє POST запити на `/passes/validate` з наступною структурою:

```json
{
  "token": "токен_з_qr_коду",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "deviceInfo": {
    "platform": "ios" | "android",
    "version": "17.0"
  }
}
```

## Деплой на GitHub Pages

Для публікації додатку на GitHub Pages, дивіться детальні інструкції в файлі [DEPLOY.md](./DEPLOY.md).

Коротко:
1. Налаштуйте GitHub Pages в Settings → Pages (Source: GitHub Actions)
2. Зробіть push в гілку `main`
3. Workflow автоматично збудує та задеплоїть додаток

⚠️ **Важливо**: QR-сканер на веб може працювати обмежено через обмеження браузерів. Для повної функціональності використовуйте мобільні версії.

---

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
