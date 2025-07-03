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
import { approveOrder } from "@/api/aprove-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

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

  function handleCacheUpdate(orderId: string, status: OrderStatus) {
    const orderListCached = queryCliente.getQueriesData<GetOrdersResponse>({
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
              status,
            };
          }
          return order;
        }),
      });
    });
  }

  const { mutateAsync: aproveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,

      onSuccess(_, { orderId }) {
        handleCacheUpdate(orderId, "processing");
      },
    });

  const { mutateAsync: deliveredOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,

      onSuccess(_, { orderId }) {
        handleCacheUpdate(orderId, "delivered");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,

      onSuccess(_, { orderId }) {
        handleCacheUpdate(orderId, "delivering");
      },
    });

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,

      onSuccess(_, { orderId }) {
        handleCacheUpdate(orderId, "canceled");
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isOpenDetails} onOpenChange={setIsOpenDetails}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
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
        {order.status === "pending" && (
          <Button
            onClick={() => aproveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
            variant="ghost"
            size="sm"
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Aprovar
          </Button>
        )}
        {order.status === "processing" && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
            variant="ghost"
            size="sm"
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Em entrega
          </Button>
        )}
        {order.status === "delivering" && (
          <Button
            onClick={() => deliveredOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
            variant="ghost"
            size="sm"
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="sm"
        >
          <X className="mr-2 h-3 w-3" /> Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
