"use client";
import { Button } from "@radix-ui/themes";
import {useState, useTransition } from "react";
import * as React from "react"

export default function DeleteButton({
  id,
  method,
}: {
  id: number;
  method: any;
}) {
  const [click, setClick] = useState(false);
  const [isPending, startTransition] = useTransition();

  const removeProduct = (id: number) => {
    setClick(true);
    startTransition(() => {
      method(id).then(() => {
        setClick(false);
      });
    });
  };

  return (
    <>
      <Button disabled={click} onClick={() => removeProduct(id)} color="red">
        Delete
      </Button>
    </>
  );
}
