# Переменные окружения

Для корректной работы серверной части необходимо настроить следующие переменные окружения:

| Переменная | Формат | Описание |
|------------|--------|----------|
| `DATABASE_URL` | `postgresql://<username>:<password>@<host>:<port>/<database>?schema=<schema>` | URL подключения к PostgreSQL базе данных |
| `PORT` | `<number>` | Порт, на котором будет запущен сервер |
| `DOMAIN` | `<string>` | Домен сервера |
| `PASSWORD_HASH_SECRET` | `<string>` | Секретный ключ для хеширования паролей |
| `ACCESS_SECRET` | `<string>` | Секретный ключ для подписи access токенов |
| `ACCESS_TOKEN_EXPIRATION` | `<number>` | Время жизни access токена в секундах |
| `REFRESH_SECRET` | `<string>` | Секретный ключ для подписи refresh токенов |
| `REFRESH_TOKEN_EXPIRATION` | `<number>` | Время жизни refresh токена в секундах |
| `AUTH_COOKIE` | `<string>` | Название cookie для хранения access токена |
| `REF_COOKIE` | `<string>` | Название cookie для хранения refresh токена |

Пример файла `.env`:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/publications?schema=public"
PORT=9999
DOMAIN=localhost
PASSWORD_HASH_SECRET=sadjnfsbikdnlasmvfsaFGSHDJGFXGDF
ACCESS_SECRET=nwjsekfnjdwesadm2j3nr1jendwmsak31dw
ACCESS_TOKEN_EXPIRATION=99999999
REFRESH_SECRET=1u34rhnqhfewdancshxzjNFDcjxi3q42nwejfdasx
REFRESH_TOKEN_EXPIRATION=99999999
AUTH_COOKIE=acc_token
REF_COOKIE=ref_token
