import { Card as UICard, CardContent } from "./ui/card";

export function Card({ children }: { children: JSX.Element }) {
  return (
    <UICard>
      <CardContent>{children}</CardContent>
    </UICard>
  );
}
