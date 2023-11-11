import { use } from "react"
import { getAllNotations } from "@/api/notations";

export default function AllNotationsList(prop: { wordId: string }) {
  const { wordId } = prop;
  const notations: Notation[] = use(getAllNotations(wordId));
  return(
    <div>
      {notations.map((notation) => (
        <span>{ notation.notation } </span>
      ))}
    </div>
  );
}