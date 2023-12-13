# zj-assignment
ZJ assignment is to design apis for Fixtures.

# Setup
- clone .env.example to .env: cp -a .env.example .env
- install your own mysql db then update corressponding username and password in .env
- install dependencies: npm install
- run prisma migrate:
npm run migrate:deploy && npm run prisma:generate
or
npm run migrate:dev
- add seeds data: npx ts-node ./script/seeds.ts
- start app:
npm start
or
npm install pm2 -g
npm run start:dev (in background with pm2)
- api docs: http://localhost:3000/docs

# ERD
https://drive.google.com/file/d/1Rri5CLH5plEB4XNlN0DS8ktBVHlfJbzz/view?usp=sharing

# Test
- UT: npm run test
- e2e: npm run test:e2e

# deployment
- access api docs on dev env: http://13.229.105.145:3000/docs
