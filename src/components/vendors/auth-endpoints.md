# Auth Endpoints API Documentation

Bu dokümantasyon, kullanıcı kimlik doğrulama, kayıt, şifre sıfırlama ve email doğrulama işlemleri için API endpoint'lerini açıklar.

## Base URL

```
https://api.playablefactory.com/api/auth
```

## Authentication

Çoğu endpoint için authentication gerekmez. Sadece logout ve user-info endpoint'leri için JWT token gereklidir.

### Headers

```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN> (sadece gerekli endpoint'ler için)
```

---

## 🔐 Kimlik Doğrulama

### 1. Kullanıcı Kaydı

#### POST `/api/auth/register`

Yeni kullanıcı hesabı oluşturur ve email doğrulama kodu gönderir.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+905551234567",
  "role": "customer"
}
```

#### Request Example

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+905551234567",
  "role": "customer"
}
```

#### Response (201)

```json
{
  "message": "Kayıt başarılı. Email doğrulama kodu gönderildi."
}
```

#### Error Responses

- `400 Bad Request`: Geçersiz veri formatı
- `409 Conflict`: Email zaten kullanımda
- `429 Too Many Requests`: Rate limit aşıldı

---

### 2. Kullanıcı Girişi

#### POST `/api/auth/login`

Kullanıcı girişi yapar ve JWT token'ları döndürür.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "platform": "customer"
}
```

#### Request Example

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "platform": "customer"
}
```

#### Response (200)

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

#### Error Responses

- `400 Bad Request`: Geçersiz veri formatı
- `401 Unauthorized`: Geçersiz kimlik bilgileri
- `401 Unauthorized`: Yetersiz yetki (platform erişimi)
- `429 Too Many Requests`: Rate limit aşıldı

---

### 3. Token Yenileme

#### POST `/api/auth/refresh`

Access token'ı refresh token ile yeniler.

#### Request Body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Request Example

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response (200)

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses

- `400 Bad Request`: Geçersiz veri formatı
- `401 Unauthorized`: Geçersiz refresh token
- `429 Too Many Requests`: Rate limit aşıldı

---

### 4. Kullanıcı Çıkışı

#### POST `/api/auth/logout`

Kullanıcı çıkışı yapar ve token'ları geçersiz kılar.

#### Request Headers

```
Authorization: Bearer <JWT_TOKEN>
```

#### Request Body (Opsiyonel)

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Request Example

```bash
POST /api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response (200)

```json
{
  "message": "Başarıyla çıkış yapıldı"
}
```

#### Error Responses

- `401 Unauthorized`: Geçersiz token
- `429 Too Many Requests`: Rate limit aşıldı

---

### 5. Kullanıcı Bilgileri

#### GET `/api/auth/user-info`

Mevcut kullanıcının bilgilerini getirir.

#### Request Headers

```
Authorization: Bearer <JWT_TOKEN>
```

#### Request Example

```bash
GET /api/auth/user-info
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Response (200)

```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+905551234567",
  "role": "customer",
  "isEmailVerified": true,
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-20T15:30:00.000Z"
}
```

#### Error Responses

- `401 Unauthorized`: Geçersiz token

---

## 📧 Email Doğrulama

### 1. Email Doğrulama

#### GET `/api/auth/verify-email`

Email doğrulama token'ı ile email adresini doğrular.

#### Query Parameters

| Parametre | Tip    | Açıklama                |
| --------- | ------ | ----------------------- |
| `token`   | string | Email doğrulama token'ı |

#### Request Example

```bash
GET /api/auth/verify-email?token=verification-token-123
```

#### Response (200)

```json
{
  "message": "Email başarıyla doğrulandı"
}
```

#### Error Responses

- `400 Bad Request`: Geçersiz veya süresi dolmuş token

---

### 2. Email Doğrulama Tekrar Gönder

#### POST `/api/auth/resend-verification`

Email doğrulama kodunu tekrar gönderir.

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Request Example

```bash
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Response (200)

```json
{
  "message": "Doğrulama emaili gönderildi"
}
```

#### Error Responses

- `400 Bad Request`: Email zaten doğrulanmış veya kullanıcı bulunamadı
- `429 Too Many Requests`: Rate limit aşıldı

---

## 🔑 Şifre Sıfırlama

### 1. Şifre Sıfırlama İsteği

#### POST `/api/auth/forgot-password`

Şifre sıfırlama kodu gönderir.

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Request Example

```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Response (200)

```json
{
  "message": "Şifre sıfırlama kodu gönderildi"
}
```

#### Error Responses

- `400 Bad Request`: Geçersiz email formatı
- `429 Too Many Requests`: Rate limit aşıldı

---

### 2. Şifre Sıfırlama

#### POST `/api/auth/reset-password`

Şifre sıfırlama token'ı ile yeni şifre belirler.

#### Request Body

```json
{
  "token": "reset-token-123",
  "password": "newSecurePassword123"
}
```

#### Request Example

```bash
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-123",
  "password": "newSecurePassword123"
}
```

#### Response (200)

```json
{
  "message": "Şifre başarıyla sıfırlandı"
}
```

#### Error Responses

- `400 Bad Request`: Geçersiz veya süresi dolmuş token
- `429 Too Many Requests`: Rate limit aşıldı

---

## 🔧 Platform Türleri

| Platform   | Açıklama       | Gerekli Rol |
| ---------- | -------------- | ----------- |
| `admin`    | Admin paneli   | ADMIN       |
| `seller`   | Satıcı paneli  | SELLER      |
| `customer` | Müşteri paneli | CUSTOMER    |

---

## 📋 Kullanıcı Rolleri

| Rol        | Açıklama          | Platform Erişimi        |
| ---------- | ----------------- | ----------------------- |
| `ADMIN`    | Sistem yöneticisi | admin, seller, customer |
| `SELLER`   | Satıcı            | seller                  |
| `CUSTOMER` | Müşteri           | customer                |

---

## 🔐 Token Bilgileri

### Access Token

- **Süre**: 15 dakika
- **Kullanım**: API isteklerinde Authorization header'ında
- **Format**: `Bearer <token>`

### Refresh Token

- **Süre**: 7 gün
- **Kullanım**: Access token yenileme için
- **Güvenlik**: HTTP-only cookie veya secure storage

---

## 📧 Email Doğrulama Kodları

**⚠️ ÖNEMLİ NOT**: Email gönderme sistemi henüz aktif olmadığı için tüm doğrulama kodları **1234** olarak ayarlanmıştır.

### Email Doğrulama

- **Kod**: `1234`
- **Süre**: 24 saat
- **Kullanım**: Email doğrulama için

### Şifre Sıfırlama

- **Kod**: `1234`
- **Süre**: 1 saat
- **Kullanım**: Şifre sıfırlama için

---

## 📋 Veri Doğrulama Kuralları

### Kayıt İşlemi

- `email`: Zorunlu, geçerli email formatı, benzersiz olmalı
- `password`: Zorunlu, minimum 6 karakter
- `firstName`: Zorunlu, minimum 2 karakter
- `lastName`: Zorunlu, minimum 2 karakter
- `phoneNumber`: Opsiyonel, geçerli telefon formatı
- `role`: Opsiyonel, `admin`, `seller`, `customer` (varsayılan: `customer`)

### Giriş İşlemi

- `email`: Zorunlu, geçerli email formatı
- `password`: Zorunlu, minimum 6 karakter
- `platform`: Zorunlu, `admin`, `seller`, `customer`

### Şifre Sıfırlama

- `token`: Zorunlu, geçerli reset token
- `password`: Zorunlu, minimum 6 karakter

### Email Doğrulama

- `token`: Zorunlu, geçerli verification token

---

## 🚨 Hata Kodları

| HTTP Kodu | Açıklama                                         |
| --------- | ------------------------------------------------ |
| `200`     | Başarılı işlem                                   |
| `201`     | Başarılı oluşturma                               |
| `400`     | Bad Request - Geçersiz veri                      |
| `401`     | Unauthorized - Kimlik doğrulama gerekli          |
| `403`     | Forbidden - Yetersiz yetki                       |
| `404`     | Not Found - Kaynak bulunamadı                    |
| `409`     | Conflict - Çakışma (örn: email zaten kullanımda) |
| `429`     | Too Many Requests - Rate limit aşıldı            |
| `500`     | Internal Server Error - Sunucu hatası            |

---

## 🔒 Güvenlik Notları

### Rate Limiting

- **Login**: 5 istek/dakika per IP
- **Register**: 3 istek/dakika per IP
- **Forgot Password**: 3 istek/dakika per IP
- **Resend Verification**: 3 istek/dakika per IP

### Token Güvenliği

- Access token'lar kısa süreli (15 dakika)
- Refresh token'lar uzun süreli (7 gün)
- Token'lar blacklist'e alınabilir
- HTTPS zorunlu

### Şifre Güvenliği

- Minimum 6 karakter
- bcrypt ile hash'lenir (12 salt rounds)
- Şifre sıfırlama token'ları 1 saat geçerli

---

## 📝 Örnek Kullanım Senaryoları

### 1. Yeni Kullanıcı Kaydı

```bash
# 1. Kayıt ol
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "customer"
}

# 2. Email doğrula (kod: 1234)
GET /api/auth/verify-email?token=verification-token

# 3. Giriş yap
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123",
  "platform": "customer"
}
```

### 2. Şifre Sıfırlama

```bash
# 1. Şifre sıfırlama isteği
POST /api/auth/forgot-password
{
  "email": "user@example.com"
}

# 2. Yeni şifre belirle (kod: 1234)
POST /api/auth/reset-password
{
  "token": "reset-token",
  "password": "newPassword123"
}
```

### 3. Token Yenileme

```bash
# Access token süresi dolduğunda
POST /api/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🔧 Debug ve Test

### Email Doğrulama Testi

```bash
# Doğrulama kodu her zaman: 1234
GET /api/auth/verify-email?token=test-token
```

### Şifre Sıfırlama Testi

```bash
# Sıfırlama kodu her zaman: 1234
POST /api/auth/reset-password
{
  "token": "test-reset-token",
  "password": "newPassword123"
}
```

### Token Testi

```bash
# Geçerli token ile kullanıcı bilgileri
GET /api/auth/user-info
Authorization: Bearer <valid-token>
```

Bu dokümantasyon, auth endpoint'lerinin kullanımı için gerekli tüm bilgileri içerir. Email gönderme sistemi aktif olmadığı için tüm doğrulama kodları **1234** olarak ayarlanmıştır.
