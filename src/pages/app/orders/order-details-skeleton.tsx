import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OrderDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[164px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[140px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[200px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Realizado há
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[140px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Qtd.</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>

          {Array.from({ length: 2 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[140px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-5 w-3" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-5 w-12" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-5 w-12" />
              </TableCell>
            </TableRow>
          ))}
        </TableHeader>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
