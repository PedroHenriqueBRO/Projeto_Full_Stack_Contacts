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
