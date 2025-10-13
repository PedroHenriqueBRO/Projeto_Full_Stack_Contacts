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
const zodSort = z.string().optional();
const zodOrder = z.string().optional();
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
    if (erro.message === "Email duplicado!") {
      return res.status(409).json({ error: "Email duplicado!" });
    }
    if (erro.message === "Phone duplicado!") {
      return res.status(409).json({ error: "Phone duplicado!" });
    }
  }
});
router.get("/", async (req, res) => {
  const { q, page = 1, pageSize = 10, sort, order } = req.query;
  if (Object.keys(req.query).length !== 0) {
    const qError = zodQ.safeParse(q);
    const pageError = zodPageAndPageSize.safeParse(page);
    const pageSizeError = zodPageAndPageSize.safeParse(pageSize);
    const sortError = zodSort.safeParse(sort);
    const orderError = zodOrder.safeParse(order);
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
    if (!sortError.success) {
      sortError.error.issues.forEach((issue) =>
        validationErrors.push({ path: "sort", message: issue.message })
      );
    }
    if (!orderError.success) {
      orderError.error.issues.forEach((issue) =>
        validationErrors.push({ path: "order", message: issue.message })
      );
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: "Falha na validação dos dados.",
        details: validationErrors,
      });
    }
  }
  const contactsObj = cService.getContacts(
    String(q),
    Number(page),
    Number(pageSize),
    String(sort),
    String(order)
  );
  res.json(await contactsObj);
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, phone } = req.body;
  if (nome === "" && email === "" && phone === "") {
    return res.json("Nenhuma atualização foi necessária");
  }
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
    if (erro.message === "Email duplicado!") {
      return res.status(409).json({ error: "Email duplicado!" });
    }
    if (erro.message === "InternalError") {
      return res.status(500).json({ error: "InternalError" });
    }
  }
});
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
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
    cService.deleteContact(Number(idError.data));
    res.json(`Contato de id ${id} deletado`);
  } catch (erro: any) {
    if (erro.message === "Not Found") {
      return res.status(400).json({ error: "Not Found" });
    }
    if (erro.message === "") {
      return res.status(500).json({ error: "InternalError" });
    }
  }
});
