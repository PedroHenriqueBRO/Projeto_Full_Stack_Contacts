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
}
