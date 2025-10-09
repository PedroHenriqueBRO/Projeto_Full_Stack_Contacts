import { Router } from "express";
import { prisma } from "../prisma";
import * as z from "zod";
import { error } from "console";

const router = Router();

const zodId = z.number();
const zodName = z
  .string()
  .max(100, { message: "Nome deve ter no máximo 100 caracteres." })
  .nonempty({ message: "Nome é obrigatório." });
const zodEmail = z
  .email()
  .max(254, { message: "Email deve ter no máximo 254 caracteres." });
const zodPhone = z.string().nonempty({ message: "Telefone é obrigatório." });

router.post("/", async (req, res) => {
  const { nome, email, phone } = req.body;
  const nomeError: z.ZodSafeParseResult<string> = zodName.safeParse(nome);
  const emailError: z.ZodSafeParseResult<string> = zodEmail.safeParse(email);
  const phoneError: z.ZodSafeParseResult<string> = zodPhone.safeParse(phone);
  const validationErrors: { path: string; message: string }[] = [];

  if (!nomeError.success) {
    nomeError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "nome", message: issue.message })
    );
  }
  if (!emailError.success) {
    emailError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "email", message: issue.message })
    );
  }
  if (!phoneError.success) {
    phoneError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "phone", message: issue.message })
    );
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Falha na validação dos dados.",
      details: validationErrors,
    });
  }
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
      if (value.email === email) {
        return true;
      }
    }
  );
  if (emailDuplicado.length > 0) {
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
  const idError = zodId.safeParse(id);
  const nomeError = zodName.safeParse(nome);
  const emailError = zodEmail.safeParse(email);
  const phoneError = zodPhone.safeParse(phone);
  const validationErrors: { path: string; message: string }[] = [];
  if (!idError.success) {
    idError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "id", message: issue.message })
    );
  }
  if (!nomeError.success) {
    nomeError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "nome", message: issue.message })
    );
  }
  if (!emailError.success) {
    emailError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "email", message: issue.message })
    );
  }
  if (!phoneError.success) {
    phoneError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "phone", message: issue.message })
    );
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Falha na validação dos dados.",
      details: validationErrors,
    });
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
        if (value.email === email) {
          return true;
        }
      }
    );
    if (emailDuplicado.length > 0) {
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
  const idError = zodId.safeParse(id);
  const validationErrors: { path: string; message: string }[] = [];
  if (!idError.success) {
    idError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "id", message: issue.message })
    );
  }
  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Falha na validação dos dados.",
      details: validationErrors,
    });
  }
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
