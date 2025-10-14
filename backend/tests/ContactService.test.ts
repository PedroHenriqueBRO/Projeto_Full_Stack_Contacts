import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactService } from '../src/Service/ContactService';
import { prisma } from '../src/prisma';

vi.mock('../src/prisma', () => {
  const contacts: any[] = [];
  return {
    prisma: {
      contact: {
        findMany: vi.fn(async () => contacts),
        create: vi.fn(async ({ data }: any) => {
          const created = { id: contacts.length + 1, ...data };
          contacts.push(created);
          return created;
        }),
        update: vi.fn(async ({ where: { id }, data }: any) => {
          const idx = contacts.findIndex((c) => c.id === id);
          if (idx === -1) throw Object.assign(new Error('Not Found'), { code: 'P2025' });
          contacts[idx] = { ...contacts[idx], ...data };
          return contacts[idx];
        }),
        delete: vi.fn(async ({ where: { id } }: any) => {
          const idx = contacts.findIndex((c) => c.id === id);
          if (idx === -1) throw Object.assign(new Error('Not Found'), { code: 'P2025' });
          contacts.splice(idx, 1);
          return { id };
        })
      }
    }
  };
});

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    service = new ContactService();
  });

  it('cria contato quando email e phone são únicos', async () => {
    const result = await service.createContact({ nome: 'Alice', email: 'alice@example.com', phone: '123' });
    expect(result).toMatchObject({ nome: 'Alice', email: 'alice@example.com', phone: '123' });
  });

  it('lança erro quando email é duplicado', async () => {
    await service.createContact({ nome: 'Bob', email: 'dup@example.com', phone: '555' });
    await expect(service.createContact({ nome: 'Bob2', email: 'dup@example.com', phone: '666' })).rejects.toThrow('Email duplicado!');
  });
});


