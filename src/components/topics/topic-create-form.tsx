"use client";

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions/create-topic";
import { startTransition, useActionState } from "react";
import FormButton from "../common/form-button";

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className=" flex flex-col gap-4 p-4 w-80">
            <h3 className=" text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(",")}
            />

            {formState.errors._form ? (
              <div className=" bg-red-200 rounded p-2  border border-red-400">
                {formState.errors._form?.join(",")}
              </div>
            ) : null}

            <FormButton isLoading={isPending}>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
