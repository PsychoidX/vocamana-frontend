"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/button";
import Modal from "@/components/common/modal";
import { addNotation } from "@/api/notations";

type NotationFormValues = {
  notation: string
}

function NewNotationForm(
  props: {
    wordId: string,
    setIsActice: (isActive: boolean)=>void,
  }) {
  const { wordId, setIsActice } = props;
  const { register, handleSubmit } = useForm<NotationFormValues>();

  const onSubmit = async (data: NotationFormValues) => {
    const notation = data.notation;
    const success = await addNotation(wordId, notation);

    if(success) {
      setIsActice(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <label htmlFor="notation">新規表記揺れ:</label>
      <input {...register("notation", {required: true})} />
      <input type="submit" />
    </form>
  );
}

export default function NotationModalToggleButton(
  props: {
    wordId: string,
    children: React.ReactNode,
  }) {
  const { wordId, children } = props;
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <Button onClick={() => toggleActive()}>{ children }</Button>
      <Modal
        toggleIsActive={toggleActive}
        isActive={isActive}
      >
        <NewNotationForm
          wordId={wordId}
          setIsActice={setIsActive} 
        />
      </Modal>
    </>
  );
}
