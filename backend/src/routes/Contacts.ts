import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();
router.post("/", async (req, res) => {
  const { nome, email, phone } = req.body;
  const contacts = await prisma.contact.findMany();
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
  const contact = await prisma.contact.create({
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
router.get("/", async (req, res) => {
  const { q, page = 1, pageSize = 10 } = req.query;

  const total = await prisma.contact.count({
    where: q
      ? {
          OR: [
            { nome: { contains: String(q), mode: "insensitive" } },
            { email: { contains: String(q), mode: "insensitive" } },
          ],
        }
      : {},
  });

  const contacts = await prisma.contact.findMany({
    where: q
      ? {
          OR: [
            { nome: { contains: String(q), mode: "insensitive" } },
            { email: { contains: String(q), mode: "insensitive" } },
          ],
        }
      : {},
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
  });

  res.json({
    data: contacts,
    page: Number(page),
    pageSize: Number(pageSize),
    total: total,
  });
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, phone } = req.body;
  if (!nome || !email || !phone) {
    return res.status(400).json({ error: "ValidationError" });
  }
  try {
    const contacts = await prisma.contact.findMany();
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
    const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: {
        nome: nome,
        email: email,
        phone: phone,
        updatedAt: new Date(),
      },
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "InternalError" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contact.delete({ where: { id: Number(id) } });
    res.json(`Contato de id ${id} deletado!`);
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(400).json({ error: "Not Found" });
    res.status(500).json({ error: "InternalError" });
  }
});
export default router;
