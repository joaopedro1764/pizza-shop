import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";



type NewOrderSquema = z.infer<typeof newOrderSquema>;

export function OrderTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control } = useForm<NewOrderSquema>({
    resolver: zodResolver(newOrderSquema),
    defaultValues: {
      customerName: customerName ?? "",
      orderId: orderId ?? "",
      status: status ?? "all",
    },
  });

  function handleFilter({ customerName, orderId, status }: NewOrderSquema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }
      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }
      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");

      return state;
    });
  }

  function handleClearFilter() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");
      return state;
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        {...register("orderId")}
        className="h-8 w-auto"
        placeholder="ID do pedido"
      />
      <Input
        {...register("customerName")}
        className="h-8 w-[320px]"
        placeholder="Nome do cliente"
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value, disabled, name } }) => (
          <Select
            onValueChange={onChange}
            disabled={disabled}
            name={name}
            value={value}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
        )}
      />
      <Button type="submit" variant="secondary" size="sm">
        <Search className="mr-2 h-4 w-4" /> Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilter}
        type="button"
        variant="outline"
        size="sm"
      >
        <X className="mr-2 h-4 w-4" /> Remover filtros
      </Button>
    </form>
  );
}
