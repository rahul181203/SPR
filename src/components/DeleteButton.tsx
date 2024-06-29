"use client";
import { Button } from "@radix-ui/themes";
import {useState, useTransition } from "react";

export default function DeleteButton({
  id,
  method,
}: {
  id: string;
  method: any;
}) {
  const [click, setClick] = useState(false);
  const [isPending, startTransition] = useTransition();

  const removeProduct = (id: string) => {
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
