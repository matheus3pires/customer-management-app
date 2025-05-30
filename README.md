# Customer Management - Frontend

Este repositório contém apenas o **frontend** do desafio técnico da TOTVS para cadastro de clientes.

> **Atenção:** Este projeto **não possui Dockerfile** e depende do backend disponível em:  
> [https://github.com/matheus3pires/customer-management](https://github.com/matheus3pires/customer-management)

---

## Sobre o desafio

Desenvolvimento de uma interface web para gerenciamento de clientes, permitindo:

- Cadastro de clientes com os campos:
  - Nome (mínimo 10 caracteres)
  - CPF (válido e único)
  - Telefones (um ou mais, formato válido, não duplicado)
  - Endereços (um ou mais)

## Tecnologias

- Angular 17+
- PO-UI
- TypeScript
- HTML/CSS

---

## Development server

Para iniciar o servidor de desenvolvimento local, execute:

```bash
ng serve
```

Depois que o servidor estiver ativo, acesse [http://localhost:4200/](http://localhost:4200/).  
A aplicação irá recarregar automaticamente sempre que você modificar os arquivos-fonte.

---

## Projeto Fullstack

Se você deseja rodar a solução **completa** (backend, frontend e banco de dados) utilizando apenas o Docker, utilize o repositório abaixo:

- [https://github.com/matheus3pires/technical-challenge](https://github.com/matheus3pires/technical-challenge)

Neste repositório fullstack:

- Estão disponíveis **todos os Dockerfiles necessários** dentro da pasta de cada projeto `backend` e `frontend`.  
- O Docker Compose irá, primeiro, buildar o backend e o frontend usando os respectivos Dockerfiles presentes em cada pasta.
- Após o build, o Docker Compose irá subir o banco de dados, o backend e o frontend prontos para uso.

Basta executar:
```bash
docker-compose up
```

para rodar todo o sistema integrado.
