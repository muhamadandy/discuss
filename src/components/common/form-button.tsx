import { Button } from "@nextui-org/react";

interface formButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: formButtonProps) {
  return (
    <Button type="submit" isLoading={isLoading}>
      {children}
    </Button>
  );
}
