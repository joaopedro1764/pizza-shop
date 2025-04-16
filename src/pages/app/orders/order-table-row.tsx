import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order.status";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";

interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const queryCliente = useQueryClient();
  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,

    onSuccess(_, { orderId }) {
      const orderListCached =
        queryCliente.getQueriesData<GetOrdersResponse>({
          queryKey: ["orders"],
        });

      orderListCached.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return;
        }
        queryCliente.setQueryData(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: "canceled",
              };
            }
            return order;
          }),
        })
      });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isOpenDetails} onOpenChange={setIsOpenDetails}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isOpenDetails} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono">{order?.orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order?.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" /> Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={!["pending", "processing"].includes(order.status)}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" /> Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
