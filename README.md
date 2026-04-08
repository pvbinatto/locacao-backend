# LocaCar Management - Backend

A API robusta responsável por alimentar o ecossistema **LocaCar**. Este projeto é um serviço Backend desenvolvido como núcleo lógico para uma plataforma SaaS Multi-tenant desenhada especificamente para gestão de frotas e locadoras de carros.

## 🚀 Tecnologias e Arquitetura

O backend foi construído sob um modelo modular utilizando práticas de Clean Architecture e Decorators nativos providos pelo **NestJS**, provendo alta cobertura e segurança de tipos:

- **Node.js + NestJS**: Framework avançado e progressivo.
- **TypeScript**: Estrita segurança de tipografia para o motor lógico.
- **TypeORM**: ORM moderno e confiável comunicando de forma assíncrona.
- **MySQL / PostgreSQL Connectors**: Adaptação fácil do ambiente para o deploy relacional de alta volumetria.
- **JWT (JSON Web Keys) + Passport**: Criptografia de túnel, permitindo que cada tenant opere de maneira isolada com seus respectivos chaves.
- **Swagger Decorators**: Documentação e visualização automática de rotas visuais (`/api`).

## 🧱 Isolamento Multi-tenant

O coração deste backend gira em torno do design **Multi-tenant**. Toda criação, seja cliente, carro, locações ou manutenções inseridos no banco são automaticamente vinculadas a um `companyId`.

Decoradores customizados (como o `@GetUser('companyId')`) extraem imperativamente os dados da requisição (JWT Bearer) injetando o *tenant-id* na camada dos Controllers e repassando para o *Service Layer*, impossibilitando legalmente o vazamento de dados de veículos e frotas de uma locadora para a conta da outra.

## 📦 Estrutura de Domínios (`src/modules`)

A lógica foi fragmentada por módulos dedicados de escopo singular:
- **`auth/` & `user/`**: Cadastro da Locadora, encriptação hash com *bcrypt* e emissão do Auth Token.
- **`company/`**: Gestão dos blocos isolados por locadora inquilina.
- **`vehicle/`**: Inventário. Agregações e métricas (ex: *count* customizado de carros em manutenção em tempo real do BD).
- **`rental/`**: Controle da frota locada; regras de bloqueio se o veículo estiver em oficina e check-in/out.
- **`maintenance/`**: Custos e datas de reparos dos veículos, integrados dinamicamente modificando o status root do `Vehicle`.
- **`dashboard/`**: Agregação de estatísticas financeiras de alto nível consolidadas para os gráficos e KPI's da interface Frontend.

## ⚙️ Instalação e Execução (Desenvolvimento)

Certifique-se de configurar e provisionar o `.env` (inspirado no modelo).

1. **Instale as dependências**:
   ```bash
   npm install
   ```
2. **Execute o ambiente em watch mode**:
   ```bash
   npm run start:dev
   ```
   
## 🐳 Deploy via Coolify

A raiz deste repositório acompanha um `Dockerfile` preparado via multi-stage contendo mitigação de vulnerabilidades (uso da variante leve `-alpine`, exclusão das dependências de `dev` e rodando sob usuário `nestjs` sem permissões de root escaladas). Dispõe de Healthchecks integrados.

---

## 🔗 Links Úteis

* **Repositório Adicional / Frontend:** [https://github.com/pvbinatto/locacao-frontend](https://github.com/pvbinatto/locacao-frontend)
