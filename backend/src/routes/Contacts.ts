import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();
router.post("/", async (req, res) => {
  const { nome, email, phone } = req.body;
  const contacts = await prisma.contacts.findMany();
  const emailDuplicado = contacts.filter(
    (value: {
      id: any;
      nome: string;
      email: string;
      phone: string;
      createdAt: Date;
      updatedAt: Date;
    }) => {
      if (value.email == email) {
        return true;
      }
    }
  );
  if (emailDuplicado) {
    return res.status(409).json({ error: "Email duplicado!" });
  }
  const contact = await prisma.contacts.create({
    data: {
      nome: nome,
      email: email,
      phone: phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  res.json({ name: nome, email: email, phone: phone });
});

export default router;
