import type { AnchorHTMLAttributes, ReactNode } from "react";

import { WHATSMENU_URL } from "@/lib/site-config";

type OrderLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  children: ReactNode;
};

/** Link único para o cardápio/pedido no WhatsMenu. Abre em nova aba. */
export function OrderLink({ children, ...props }: OrderLinkProps) {
  return (
    <a href={WHATSMENU_URL} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
