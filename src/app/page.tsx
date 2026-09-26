import { Deck } from "@/components/deck/deck";
import { slides } from "@/slides";

export default function Home() {
  return <Deck slides={slides} />;
}
