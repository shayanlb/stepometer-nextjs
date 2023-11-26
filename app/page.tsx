import { WriteFBDB } from "./firebase";
export default function Home() {
  let man = WriteFBDB();

  return <main className="">Hello {man}</main>;
}
