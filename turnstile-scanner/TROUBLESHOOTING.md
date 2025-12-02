# Вирішення проблем з GitHub Pages

## Проблема: Показується README замість сканера

### Рішення 1: Перевірте налаштування GitHub Pages

1. Перейдіть в **Settings** → **Pages** вашого репозиторію
2. У розділі **Source** має бути вибрано: **GitHub Actions**
3. Якщо вибрано "Deploy from a branch" - змініть на **GitHub Actions**
4. Збережіть зміни

### Рішення 2: Перевірте, чи запустився workflow

1. Перейдіть в **Actions** вашого репозиторію
2. Перевірте, чи є workflow "Deploy to GitHub Pages"
3. Якщо workflow не запустився:
   - Переконайтеся, що файл `.github/workflows/deploy.yml` існує
   - Зробіть push в гілку `main`
4. Якщо workflow завершився з помилкою - перевірте логи

### Рішення 3: Запустіть workflow вручну

1. Перейдіть в **Actions**
2. Виберіть workflow "Deploy to GitHub Pages"
3. Натисніть **Run workflow**
4. Виберіть гілку `main`
5. Натисніть **Run workflow**

### Рішення 4: Перевірте структуру збірки

Якщо workflow завершується успішно, але сайт не працює:

1. Перевірте, чи створюється папка `web-build` після збірки
2. Перевірте, чи є файл `index.html` в `web-build`
3. Якщо файлів немає - перевірте логи збірки

### Рішення 5: Очистка кешу

1. Перейдіть в **Settings** → **Pages**
2. Натисніть **Clear cache** (якщо доступно)
3. Запустіть workflow знову

## Якщо нічого не допомагає

1. Переконайтеся, що всі файли закомічені та запушені:
   ```bash
   git status
   git add .
   git commit -m "Fix deployment"
   git push origin main
   ```

2. Перевірте, чи правильно налаштований `baseUrl` в `app.json`

3. Перевірте логи workflow в розділі **Actions**

