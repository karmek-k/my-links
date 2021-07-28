import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { hash } from 'argon2';

const router = Router();
const prisma = new PrismaClient();

router.get('/:username', async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      username: req.params.username
    },
    select: {
      username: true,
      links: true
    }
  });

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  return res.json(user);
});

router.post('/', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hash(req.body.password)
    },
    select: {
      username: true
    }
  });

  return res.status(201).json(user);
});

export default router;
