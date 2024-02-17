import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import { MockMethod } from "vite-plugin-mock";
import FileModule from "./module/file";
import Coledit from "./module/collection";
import User from "./module/user";
const mockModules: MockMethod[] = [...FileModule, ...Coledit, ...User];

export default function setupProdMockServer() {
  createProdMockServer([...mockModules]);
}
