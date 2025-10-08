import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const seedContacts: { nome: string; email: string; phone: string }[] = [
  {
    nome: "Alice Silva",
    email: "alice.silva@exemplo.com",
    phone: "11987654321",
  },
  {
    nome: "Bruno Costa",
    email: "bruno.costa@exemplo.com",
    phone: "21912345678",
  },
  {
    nome: "Carla Souza",
    email: "carla.souza@exemplo.com",
    phone: "31901010101",
  },
  {
    nome: "Daniel Pereira",
    email: "daniel.pereira@exemplo.com",
    phone: "41920202020",
  },
  { nome: "Elisa Lima", email: "elisa.lima@exemplo.com", phone: "51930303030" },
  {
    nome: "Felipe Rocha",
    email: "felipe.rocha@exemplo.com",
    phone: "61940404040",
  },
  {
    nome: "Giovanna Alves",
    email: "giovanna.alves@exemplo.com",
    phone: "71950505050",
  },
  {
    nome: "Henrique Gomes",
    email: "henrique.gomes@exemplo.com",
    phone: "81960606060",
  },
  {
    nome: "Isabela Santos",
    email: "isabela.santos@exemplo.com",
    phone: "91970707070",
  },
  {
    nome: "Júlio Ferreira",
    email: "julio.ferreira@exemplo.com",
    phone: "11980808080",
  },
];
async function main() {
  for (const contato of seedContacts) {
    await prisma.contact.upsert({
      where: { email: contato.email },
      update: {},
      create: {
        nome: contato.nome,
        email: contato.email,
        phone: contato.phone,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
