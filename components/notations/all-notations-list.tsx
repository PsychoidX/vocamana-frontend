import { use } from "react"
import { getAllNotations } from "@/api/notations";
import NotationTagWithDeleteButton from "./notation-tag";

export default function AllNotationsList(prop: { wordId: string }) {
  const { wordId } = prop;
  const notations: Notation[] = use(getAllNotations(wordId));

  return(
    <>
      {notations.map((notation) => (
        <NotationTagWithDeleteButton notation={notation} />
      ))}
    </>
  );
}