import { Router } from "express";
import * as z from "zod";
import { ContactService } from "../Service/ContactService";
const zodId = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number().int().positive());
const zodName = z
  .string()
  .max(100, { message: "Nome deve ter no máximo 100 caracteres." })
  .nonempty({ message: "Nome é obrigatório." });
const zodEmail = z
  .email()
  .max(254, { message: "Email deve ter no máximo 254 caracteres." });
const zodPhone = z.string().nonempty({ message: "Telefone é obrigatório." });
const zodQ = z.string().max(100);
const zodPageAndPageSize = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number().int().positive());

export const router = Router();
const cService = new ContactService();
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
  try {
    const contact = cService.createContact({
      nome: nome,
      email: email,
      phone: phone,
    });
    res.json(await contact);
  } catch (erro: any) {
    if (erro.message === "Email duplicado") {
      return res.status(409).json({ error: "Email duplicado!" });
    }
  }
});
router.get("/", async (req, res) => {
  const { q, page = 1, pageSize = 10 } = req.query;
  const qError = zodQ.safeParse(q);
  const pageError = zodPageAndPageSize.safeParse(page);
  const pageSizeError = zodPageAndPageSize.safeParse(pageSize);
  const validationErrors: { path: string; message: string }[] = [];
  if (!qError.success) {
    qError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "q", message: issue.message })
    );
  }
  if (!pageError.success) {
    pageError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "page", message: issue.message })
    );
  }
  if (!pageSizeError.success) {
    pageSizeError.error.issues.forEach((issue) =>
      validationErrors.push({ path: "pageSize", message: issue.message })
    );
  }
  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Falha na validação dos dados.",
      details: validationErrors,
    });
  }
  const contactsObj = cService.getContacts(
    String(q),
    Number(page),
    Number(pageSize)
  );
  res.json(await contactsObj);
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
    const contact = cService.putContact(Number(id), {
      nome: nome,
      email: email,
      phone: phone,
    });
    res.json(await contact);
  } catch (erro: any) {
    if (erro.message === "Email duplicado") {
      return res.status(409).json({ error: "Email duplicado!" });
    }
    if (erro.message === "InternalError") {
      return res.status(500).json({ error: "InternalError" });
    }
  }
});
