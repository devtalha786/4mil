import CheckoutRepository from "./CheckoutRepository"
import BuilderRepository from "./BuilderRepository"
const repositories = {
  checkout:CheckoutRepository,
  builder:BuilderRepository,
};
export const RepositoryFactory = {
  get: (name) => repositories[name],
};
