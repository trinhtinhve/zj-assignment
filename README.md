# zj-assignment
ZJ assignment is to design apis for Fixtures.

# Setup
- clone .env.example to .env: cp -a .env.example .env
- install your own mysql db then update corressponding username and password in .env
- install dependencies: npm install
- run prisma migrate: npm run migrate:deploy or npm run migrate:dev
- add seeds data: npx ts-node ./script/seeds.ts
- start app: npm start
- api docs: http://localhost:3000/docs

# Test
- UT: npm run test
- e2e: npm run test:e2e
