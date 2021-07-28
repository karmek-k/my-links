import { PrismaClient } from '@prisma/client';
import { Strategy as LocalStrategy } from 'passport-local';
import { verify } from 'argon2';

const prisma = new PrismaClient();

export default new LocalStrategy((username, password, done) => {
  prisma.user
    .findFirst({
      where: {
        username
      }
    })
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      verify(user.password, password).then(valid => {
        return done(null, valid ? user : false);
      });
    })
    .catch(done)
    .finally(() => prisma.$disconnect());
});
