# Authentication API Endpoints

Bu dokümanda authentication (kimlik doğrulama) ile ilgili tüm API endpoint'leri, süreçler ve adımlar detaylı olarak açıklanmıştır.

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Kullanıcı Rolleri](#kullanıcı-rolleri)
3. [API Endpoint'leri](#api-endpointleri)
4. [Süreçler ve Adımlar](#süreçler-ve-adımlar)
5. [Hata Kodları](#hata-kodları)
6. [Güvenlik Önlemleri](#güvenlik-önlemleri)

---

## 🔍 Genel Bakış

Authentication sistemi JWT (JSON Web Token) tabanlı çalışır ve üç farklı kullanıcı rolünü destekler:
- **ADMIN**: Yönetici paneli erişimi
- **SELLER**: Satıcı paneli erişimi
- **CUSTOMER**: Müşteri paneli erişimi

### 🔐 Token Yapısı

- **Access Token**: 15 dakika geçerli, API istekleri için
- **Refresh Token**: 7 gün geçerli, yeni access token almak için

---

## 👥 Kullanıcı Rolleri

### ADMIN
- Platform yönetimi
- Kullanıcı yönetimi
- Sistem ayarları
- Raporlama

### SELLER
- Ürün yönetimi
- Sipariş takibi
- Kampanya yönetimi
- Satış raporları

### CUSTOMER
- Ürün görüntüleme
- Sipariş verme
- Profil yönetimi
- Favori ürünler

---

## 🚀 API Endpoint'leri

### 1. Kullanıcı Kaydı

**Endpoint:** `POST /api/auth/register`

**Açıklama:** Yeni kullanıcı hesabı oluşturur ve email doğrulama linki gönderir.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+90 555 000 0000",
  "role": "customer"
}
```

**Response (201):**
```json
{
  "message": "Registration successful"
}
```

**Süreç Adımları:**
1. Email benzersizlik kontrolü
2. Şifre hash'leme (bcrypt, 12 salt rounds)
3. Kullanıcı oluşturma
4. Email doğrulama token'ı oluşturma (1234)
5. Doğrulama email'i gönderme
6. Başarı mesajı döndürme

---

### 2. Email Doğrulama

**Endpoint:** `GET /api/auth/verify-email`

**Açıklama:** Kullanıcının email adresini doğrular.

**Query Parameters:**
- `token`: Doğrulama kodu (1234)
- `email`: Doğrulanacak email adresi

**Request:**
```http
GET /api/auth/verify-email?token=1234&email=user@example.com
```

**Response (200):**
```json
{
  "message": "Email verified successfully"
}
```

**Süreç Adımları:**
1. Token kontrolü (1234)
2. Email ile kullanıcı bulma
3. Email doğrulama durumu kontrolü
4. Email'i doğrulanmış olarak işaretleme
5. Token'ları temizleme
6. Başarı mesajı döndürme

---

### 3. Kullanıcı Girişi

**Endpoint:** `POST /api/auth/login`

**Açıklama:** Kullanıcı girişi yapar ve JWT token'ları döndürür.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "platform": "customer"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "isEmailVerified": true
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Süreç Adımları:**
1. Email ile kullanıcı bulma
2. Şifre doğrulama (bcrypt compare)
3. Platform erişim kontrolü
4. JWT token'ları oluşturma
5. Kullanıcı bilgileri ve token'ları döndürme

---

### 4. Token Yenileme

**Endpoint:** `POST /api/auth/refresh`

**Açıklama:** Süresi dolmuş access token'ı yeniler.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Süreç Adımları:**
1. Refresh token doğrulama
2. Kullanıcı varlığı kontrolü
3. Yeni token çifti oluşturma
4. Token'ları döndürme

---

### 5. Şifre Sıfırlama İsteği

**Endpoint:** `POST /api/auth/forgot-password`

**Açıklama:** Şifre sıfırlama linki gönderir.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "If an account with this email exists, a password reset link has been sent"
}
```

**Süreç Adımları:**
1. Email ile kullanıcı bulma
2. Şifre sıfırlama token'ı oluşturma (1234)
3. Token geçerlilik süresi ayarlama (1 saat)
4. Şifre sıfırlama email'i gönderme
5. Güvenlik için her zaman başarı mesajı döndürme

---

### 6. Şifre Sıfırlama

**Endpoint:** `POST /api/auth/reset-password`

**Açıklama:** Şifre sıfırlama kodunu kullanarak yeni şifre belirler.

**Request Body:**
```json
{
  "token": "1234",
  "password": "newSecurePassword123",
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "Password reset successfully"
}
```

**Süreç Adımları:**
1. Token kontrolü (1234)
2. Email ve token ile kullanıcı bulma
3. Token geçerlilik süresi kontrolü
4. Yeni şifreyi hash'leme
5. Şifreyi güncelleme
6. Token'ları temizleme
7. Başarı mesajı döndürme

---

### 7. Email Doğrulama Yeniden Gönderme

**Endpoint:** `POST /api/auth/resend-verification`

**Açıklama:** Email doğrulama linkini yeniden gönderir.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "Verification email sent successfully"
}
```

**Süreç Adımları:**
1. Email ile kullanıcı bulma
2. Email doğrulama durumu kontrolü
3. Yeni doğrulama token'ı oluşturma
4. Doğrulama email'i gönderme
5. Başarı mesajı döndürme

---

### 8. Kullanıcı Çıkışı

**Endpoint:** `POST /api/auth/logout`

**Açıklama:** Kullanıcı çıkışı yapar ve token'ları geçersiz kılar.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body (opsiyonel):**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Süreç Adımları:**
1. Access token doğrulama
2. Token'ları blacklist'e ekleme
3. Kullanıcının son çıkış zamanını güncelleme
4. Başarı mesajı döndürme

---

## 🔄 Süreçler ve Adımlar

### Kullanıcı Kayıt Süreci

1. **Kayıt Formu Doldurma**
   - Email, şifre, ad, soyad girişi
   - Rol seçimi (customer/seller/admin)
   - Telefon numarası (opsiyonel)

2. **Backend Doğrulama**
   - Email format kontrolü
   - Şifre güvenlik kontrolü (min 6 karakter)
   - Email benzersizlik kontrolü

3. **Kullanıcı Oluşturma**
   - Şifre hash'leme
   - Kullanıcı veritabanına kaydetme
   - Email doğrulama token'ı oluşturma

4. **Email Gönderme**
   - Doğrulama linki oluşturma
   - Email servisi ile gönderme
   - Development'ta console'a yazdırma

5. **Kullanıcı Yönlendirme**
   - Başarı sayfasına yönlendirme
   - Email kontrolü için uyarı

### Email Doğrulama Süreci

1. **Email Kontrolü**
   - Kullanıcı email'ini kontrol eder
   - Doğrulama linkini bulur

2. **Link Tıklama**
   - Doğrulama linkine tıklar
   - Token ve email parametreleri alınır

3. **Backend Doğrulama**
   - Token kontrolü (1234)
   - Email ile kullanıcı bulma
   - Doğrulama durumu kontrolü

4. **Email Doğrulama**
   - Email'i doğrulanmış olarak işaretleme
   - Token'ları temizleme

5. **Başarı Sayfası**
   - Doğrulama başarı mesajı
   - Login sayfasına yönlendirme

### Giriş Süreci

1. **Giriş Formu**
   - Email ve şifre girişi
   - Platform seçimi (admin/seller/customer)

2. **Backend Doğrulama**
   - Email ile kullanıcı bulma
   - Şifre doğrulama
   - Platform erişim kontrolü

3. **Token Oluşturma**
   - Access token (15 dakika)
   - Refresh token (7 gün)

4. **Kullanıcı Yönlendirme**
   - İlgili platform'a yönlendirme
   - Token'ları localStorage'a kaydetme

### Şifre Sıfırlama Süreci

1. **Şifre Sıfırlama İsteği**
   - Email girişi
   - Şifre sıfırlama formu

2. **Backend İşlem**
   - Email ile kullanıcı bulma
   - Sıfırlama token'ı oluşturma
   - Email gönderme

3. **Email Kontrolü**
   - Sıfırlama linkini bulma
   - Linke tıklama

4. **Yeni Şifre Belirleme**
   - Yeni şifre girişi
   - Şifre tekrarı
   - Token kontrolü

5. **Şifre Güncelleme**
   - Yeni şifreyi hash'leme
   - Veritabanında güncelleme
   - Token'ları temizleme

---

## ❌ Hata Kodları

### 400 Bad Request
- Geçersiz email formatı
- Şifre çok kısa (min 6 karakter)
- Geçersiz token
- Eksik zorunlu alanlar

### 401 Unauthorized
- Geçersiz email/şifre
- Platform erişim yetkisi yok
- Geçersiz refresh token

### 409 Conflict
- Email zaten kayıtlı
- Email zaten doğrulanmış

### 429 Too Many Requests
- Rate limiting aşıldı
- Çok fazla istek

---

## 🔒 Güvenlik Önlemleri

### Şifre Güvenliği
- Bcrypt hash'leme (12 salt rounds)
- Minimum 6 karakter zorunluluğu
- Şifre sıfırlama token'ları 1 saat geçerli

### Token Güvenliği
- JWT token'ları
- Access token 15 dakika geçerli
- Refresh token 7 gün geçerli
- Token blacklisting

### Rate Limiting
- Tüm auth endpoint'leri için rate limiting
- Brute force saldırılarına karşı koruma

### Email Güvenliği
- Email doğrulama zorunluluğu
- Doğrulama token'ları 24 saat geçerli
- Güvenlik için email varlığı gizleme

### Platform Erişimi
- Rol tabanlı erişim kontrolü
- Platform bazlı yetkilendirme
- Admin: admin platformu
- Seller: seller platformu
- Customer: customer platformu

---

## 📱 Frontend Entegrasyonu

### Token Yönetimi
```javascript
// Token'ları localStorage'a kaydetme
localStorage.setItem('accessToken', response.accessToken);
localStorage.setItem('refreshToken', response.refreshToken);

// API isteklerinde token kullanma
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
};
```

### Token Yenileme
```javascript
// Access token süresi dolduğunda
if (response.status === 401) {
  const refreshToken = localStorage.getItem('refreshToken');
  const newTokens = await refreshTokens(refreshToken);
  // Yeni isteği tekrar gönder
}
```

### Çıkış İşlemi
```javascript
// Token'ları temizleme
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
// Login sayfasına yönlendirme
```

---

## 🧪 Test Senaryoları

### Başarılı Kayıt
1. Geçerli bilgilerle kayıt
2. Email doğrulama
3. Başarılı giriş

### Başarısız Kayıt
1. Mevcut email ile kayıt
2. Geçersiz email formatı
3. Kısa şifre

### Şifre Sıfırlama
1. Şifre sıfırlama isteği
2. Email kontrolü
3. Yeni şifre belirleme
4. Yeni şifre ile giriş

### Token Yenileme
1. Access token süresi dolması
2. Refresh token ile yenileme
3. Yeni token'ları kullanma

---

## 📝 Notlar

- **Development Modu**: Email'ler console'a yazdırılır
- **Static Token**: Test için 1234 kullanılır
- **Email Servisi**: Gerçek uygulamada email servisi entegrasyonu gerekir
- **Token Blacklisting**: Çıkış yapıldığında token'lar geçersiz kılınır
- **Rate Limiting**: Tüm auth endpoint'leri için koruma vardır
