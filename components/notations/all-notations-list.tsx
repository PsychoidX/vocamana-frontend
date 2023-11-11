import { use } from "react"
import { getAllNotations } from "@/api/notations";
import { Tag } from "../common/tag";

export default function AllNotationsList(prop: { wordId: string }) {
  const { wordId } = prop;
  const notations: Notation[] = use(getAllNotations(wordId));
  return(
    <div>
      {notations.map((notation) => (
        <Tag
          showDeleteButton={true}
        >
          { notation.notation }
        </Tag>
      ))}
    </div>
  );
}