# Playable Factory Admin Panel

Modern ve kullanıcı dostu bir e-ticaret yönetim paneli. Bu admin paneli, kategoriler, kullanıcılar, satıcılar ve kampanyaları yönetmek için tasarlanmıştır.

## 🚀 Özellikler

### 📊 Dashboard
- Sistem sağlığı ve performans metrikleri
- Son aktiviteler ve istatistikler
- KPI kartları ve grafikler

### 👥 Kullanıcı Yönetimi
- Kullanıcı listesi görüntüleme ve filtreleme
- Kullanıcı detayları ve profil yönetimi
- Kullanıcı durumu (aktif/pasif) kontrolü
- Rol tabanlı yetkilendirme (admin, vendor, customer, moderator)

### 🏪 Satıcı Yönetimi
- Satıcı listesi ve detayları
- Satıcı onay süreçleri
- Satıcı performans takibi
- Satıcı hesap durumu yönetimi

### 📂 Kategori Yönetimi
- Kategori oluşturma ve düzenleme
- Kategori hiyerarşisi
- Kategori durumu kontrolü
- Toplu kategori işlemleri

### 📢 Kampanya Yönetimi
- Kampanya oluşturma ve düzenleme
- Kampanya durumu takibi
- Kampanya performans analizi
- Kampanya filtreleme ve arama

### 🔐 Güvenlik ve Kimlik Doğrulama
- JWT tabanlı kimlik doğrulama
- Şifre görünürlük kontrolü
- Oturum yönetimi
- Güvenli API iletişimi

## 🛠️ Teknoloji Stack'i

### Frontend
- **Next.js 15.4.2** - React framework
- **React 19.1.0** - UI kütüphanesi
- **TypeScript 5** - Tip güvenliği
- **Tailwind CSS 4** - CSS framework
- **Radix UI** - Erişilebilir UI bileşenleri
- **Lucide React** - İkon kütüphanesi

### State Management
- **Redux Toolkit** - State yönetimi
- **React Redux** - React-Redux entegrasyonu

### Form ve Validasyon
- **React Hook Form** - Form yönetimi
- **Zod** - Şema validasyonu
- **@hookform/resolvers** - Form resolver

### HTTP Client
- **Axios** - HTTP istekleri

### UI/UX
- **Sonner** - Toast bildirimleri
- **NProgress** - Yükleme göstergeleri
- **Next Themes** - Tema desteği

### Development Tools
- **ESLint** - Kod kalitesi
- **Prettier** - Kod formatı
- **TypeScript ESLint** - TypeScript linting

## 📋 Gereksinimler

- **Node.js** 18.0.0 veya üzeri
- **npm** 9.0.0 veya üzeri
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)

## 🚀 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd playable_factory_admin
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Yapılandırın

`.env.local` dosyası oluşturun:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Authentication
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-key
NEXT_PUBLIC_REFRESH_TOKEN_SECRET=your-refresh-token-secret

# Application
NEXT_PUBLIC_APP_NAME=Playable Factory Admin
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development
NODE_ENV=development
```

### 4. Uygulamayı Başlatın

#### Development Modu
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 👤 Demo Kullanıcı Bilgileri

### Admin Kullanıcısı
```
Email: admin@playablefactory.com
Password: admin123
```

### Test Kullanıcısı
```
Email: test@playablefactory.com
Password: test123
```

## 📚 API Dokümantasyonu

### Kimlik Doğrulama Endpoints

#### POST /api/auth/login
Kullanıcı girişi yapar.

**Request:**
```json
{
  "email": "admin@playablefactory.com",
  "password": "admin123",
  "rememberMe": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "admin@playablefactory.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin",
      "isActive": true
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### POST /api/auth/register
Yeni kullanıcı kaydı.

#### POST /api/auth/forgot-password
Şifre sıfırlama e-postası gönderir.

#### POST /api/auth/reset-password
Şifre sıfırlama işlemi.

### Kullanıcı Yönetimi Endpoints

#### GET /api/admin/users
Kullanıcı listesini getirir.

**Query Parameters:**
- `page`: Sayfa numarası
- `limit`: Sayfa başına kayıt sayısı
- `search`: Arama terimi
- `role`: Kullanıcı rolü
- `isActive`: Aktiflik durumu

#### GET /api/admin/users/:id
Kullanıcı detaylarını getirir.

#### PUT /api/admin/users/:id
Kullanıcı bilgilerini günceller.

#### DELETE /api/admin/users/:id
Kullanıcıyı siler.

### Satıcı Yönetimi Endpoints

#### GET /api/admin/vendors
Satıcı listesini getirir.

#### GET /api/admin/vendors/:id
Satıcı detaylarını getirir.

#### PUT /api/admin/vendors/:id
Satıcı bilgilerini günceller.

#### DELETE /api/admin/vendors/:id
Satıcıyı siler.

### Kategori Yönetimi Endpoints

#### GET /api/admin/categories
Kategori listesini getirir.

#### POST /api/admin/categories
Yeni kategori oluşturur.

#### PUT /api/admin/categories/:id
Kategori bilgilerini günceller.

#### DELETE /api/admin/categories/:id
Kategoriyi siler.

### Kampanya Yönetimi Endpoints

#### GET /api/admin/campaigns
Kampanya listesini getirir.

#### POST /api/admin/campaigns
Yeni kampanya oluşturur.

#### PUT /api/admin/campaigns/:id
Kampanya bilgilerini günceller.

#### DELETE /api/admin/campaigns/:id
Kampanyayı siler.

### Dashboard Endpoints

#### GET /api/admin/dashboard
Dashboard istatistiklerini getirir.

## 🚀 Deployment

### Vercel Deployment

1. **Vercel CLI Kurulumu**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

### Docker Deployment

1. **Dockerfile Oluşturun**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Docker Compose**
```yaml
version: '3.8'
services:
  admin-panel:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_BASE_URL=${API_BASE_URL}
```

## 🧪 Test

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
npm run format:check
```

### Build Test
```bash
npm run build
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Kimlik doğrulama sayfaları
│   ├── campaigns/         # Kampanya yönetimi
│   ├── categories/        # Kategori yönetimi
│   ├── users/            # Kullanıcı yönetimi
│   └── vendors/          # Satıcı yönetimi
├── components/            # React bileşenleri
│   ├── auth/             # Kimlik doğrulama bileşenleri
│   ├── campaigns/        # Kampanya bileşenleri
│   ├── categories/       # Kategori bileşenleri
│   ├── dashboard/        # Dashboard bileşenleri
│   ├── layout/           # Layout bileşenleri
│   ├── sidebar/          # Sidebar bileşenleri
│   ├── ui/               # UI bileşenleri
│   ├── users/            # Kullanıcı bileşenleri
│   └── vendors/          # Satıcı bileşenleri
├── features/             # Redux slice'ları
├── hooks/                # Custom React hooks
├── lib/                  # Yardımcı kütüphaneler
├── services/             # API servisleri
├── store/                # Redux store
├── types/                # TypeScript tip tanımları
└── utils/                # Yardımcı fonksiyonlar
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Email**: admin@playablefactory.com
- **Website**: https://playablefactory.com
- **Documentation**: https://docs.playablefactory.com

---

**Not**: Bu admin paneli sadece yetkili kullanıcılar tarafından kullanılmalıdır. Güvenlik önlemlerini göz ardı etmeyin ve düzenli güvenlik güncellemelerini yapın. 