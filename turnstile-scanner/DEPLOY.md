# Інструкції з деплою на GitHub Pages

## Крок 1: Налаштування GitHub Pages

1. Перейдіть в налаштування вашого репозиторію на GitHub
2. Перейдіть в розділ **Settings** → **Pages**
3. У розділі **Source** виберіть:
   - **Source**: `GitHub Actions`
   - Збережіть зміни

## Крок 2: Налаштування Secrets (опціонально)

Якщо потрібно налаштувати API URL через GitHub Secrets:

1. Перейдіть в **Settings** → **Secrets and variables** → **Actions**
2. Натисніть **New repository secret**
3. Додайте:
   - **Name**: `EXPO_PUBLIC_API_URL`
   - **Value**: ваш URL бекенду (наприклад: `https://your-backend.com/api`)

## Крок 3: Пуш коду

Просто зробіть push в гілку `main`:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

## Крок 4: Налаштування Base Path (якщо репозиторій в підпапці)

Якщо ваш репозиторій знаходиться в підпапці (наприклад, `qr_code_scanner/turnstile-scanner/`), потрібно налаштувати base path:

1. Відкрийте `app.json`
2. Додайте в секцію `web`:
```json
"web": {
  "output": "static",
  "favicon": "./assets/images/favicon.png",
  "bundler": "metro",
  "baseUrl": "/назва-репозиторію/turnstile-scanner"
}
```

**Приклад**: Якщо ваш репозиторій `github.com/username/qr_code_scanner`, то:
```json
"baseUrl": "/qr_code_scanner/turnstile-scanner"
```

## Крок 5: Перевірка деплою

1. Перейдіть в розділ **Actions** вашого репозиторію
2. Перевірте, що workflow `Deploy to GitHub Pages` запустився
3. Після успішного завершення, ваш сайт буде доступний за адресою:
   - Якщо репозиторій в корені: `https://ваш-username.github.io/назва-репозиторію/`
   - Якщо репозиторій в підпапці: `https://ваш-username.github.io/qr_code_scanner/turnstile-scanner/`

## Важливі примітки

⚠️ **QR-сканер на веб**: 
- На веб-версії QR-сканер може працювати обмежено через обмеження браузерів
- Для повної функціональності рекомендовано використовувати мобільні версії (iOS/Android)

⚠️ **Base Path**:
- Якщо ваш репозиторій знаходиться в підпапці (наприклад, `turnstile-scanner/`), потрібно налаштувати base path
- Для цього оновіть `app.json` і додайте `baseUrl` в секцію `web`

## Локальна збірка

Для тестування збірки локально:

```bash
cd turnstile-scanner
npm run build:web
```

Збірка буде в папці `web-build/`

