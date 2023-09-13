### Live Link: https://book-catalog-server-prisma.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/8261c5be-f3f8-4c22-907b-8db8e4767aa8 (Single GET) Include an id that is saved in your database
- api/v1/users/8261c5be-f3f8-4c22-907b-8db8e4767aa8 (PATCH)
- api/v1/users/8261c5be-f3f8-4c22-907b-8db8e4767aa8 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/206cae7f-19e7-4bda-b072-3d6e027374d0 (Single GET) Include an id that is saved in your database
- api/v1/categories/206cae7f-19e7-4bda-b072-3d6e027374d0 (PATCH)
- api/v1/categories/206cae7f-19e7-4bda-b072-3d6e027374d0 (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/f744677d-0172-4ab1-a475-6d8a8e24ae41/category (GET)
- api/v1/books/a95a1a03-f561-4b4d-b838-ce7e443f5caf (GET)
- api/v1/books/a95a1a03-f561-4b4d-b838-ce7e443f5caf (PATCH)
- api/v1/books/a95a1a03-f561-4b4d-b838-ce7e443f5caf (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/77bb6c98-9128-4bbe-978d-82426f58f8ec (GET)
