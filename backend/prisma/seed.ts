import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const seedContactsEmbaralhados:{nome:string,email:string,phone:string}[] = [
    {
        nome: "Daniel Pereira",
        email: "daniel.pereira@exemplo.com",
        phone: "+55 41 92020 2020",
    },
    {
        nome: "Júlio Ferreira",
        email: "julio.ferreira@exemplo.com",
        phone: "+55 11 98080 8080",
    },
    {
        nome: "Carla Souza",
        email: "carla.souza@exemplo.com",
        phone: "+55 31 90101 0101",
    },
    {
        nome: "Henrique Gomes",
        email: "henrique.gomes@exemplo.com",
        phone: "+55 81 96060 6060",
    },
    {
        nome: "Alice Silva",
        email: "alice.silva@exemplo.com",
        phone: "+55 11 98765 4321",
    },
    {
        nome: "Giovanna Alves",
        email: "giovanna.alves@exemplo.com",
        phone: "+55 71 95050 5050",
    },
    {
        nome: "Felipe Rocha",
        email: "felipe.rocha@exemplo.com",
        phone: "+55 61 94040 4040",
    },
    {
        nome: "Elisa Lima",
        email: "elisa.lima@exemplo.com",
        phone: "+55 51 93030 3030"
    },
    {
        nome: "Bruno Costa",
        email: "bruno.costa@exemplo.com",
        phone: "+55 21 91234 5678",
    },
    {
        nome: "Isabela Santos",
        email: "isabela.santos@exemplo.com",
        phone: "+55 91 97070 7070",
    },
];
async function main() {
  for (const contato of seedContactsEmbaralhados) {
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
