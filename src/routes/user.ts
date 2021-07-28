import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

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

  await prisma.$disconnect();

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  return res.json(user);
});

export default router;
