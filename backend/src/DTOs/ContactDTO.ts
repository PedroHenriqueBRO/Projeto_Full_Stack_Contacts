export interface Contact {
  id: number;
  nome: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateContactDTO {
  nome: string;
  email: string;
  phone: string;
}

export interface PutContactDTO {
  nome?: string;
  email?: string;
  phone?: string;
}
