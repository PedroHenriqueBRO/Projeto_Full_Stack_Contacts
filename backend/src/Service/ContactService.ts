import { CreateContactDTO, Contact, PutContactDTO } from "../DTOs/ContactDTO";
import { prisma } from "../prisma";
import * as z from "zod";

export class ContactService {
  constructor() {}
  async createContact(data: CreateContactDTO): Promise<Contact> {
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
        if (value.email === data.email) {
          return true;
        }
      }
    );
    if (emailDuplicado.length > 0) {
      throw new Error("Email duplicado!");
    }
    const contact = await prisma.contact.create({
      data: {
        nome: data.nome,
        email: data.email,
        phone: data.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return contact;
  }
  async getContacts(q: string, page: number, pageSize: number) {
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
    return { data: contacts, page: page, pageSize: pageSize, total: total };
  }
  async putContact(id: number, putContact: PutContactDTO): Promise<Contact> {
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
          if (value.email === putContact.email) {
            return true;
          }
        }
      );
      if (emailDuplicado.length > 0) {
        throw new Error("Email duplicado");
      }
      const cleanData = Object.fromEntries(
        Object.entries(putContact).filter(([_, v]) => v !== undefined)
      );
      const contact = await prisma.contact.update({
        where: { id: Number(id) },
        data: {
          nome: cleanData.nome,
          email: cleanData.email,
          phone: cleanData.phone,
          updatedAt: new Date(),
        },
      });
      return contact;
    } catch (error) {
      throw new Error("InternalError");
    }
  }
}
