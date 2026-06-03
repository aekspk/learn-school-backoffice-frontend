import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { useCreateBranch, useDeleteBranch, useGetBranches, useUpdateBranch } from "./hooks/api";
import { branchSchema, type BranchFormValues } from "./schema";
import type { Branch } from "@/types/api";

function BranchFormDialog({ branch, trigger }: { branch?: Branch; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate: create, isPending: creating } = useCreateBranch();
  const { mutate: update, isPending: updating } = useUpdateBranch();
  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: { name: branch?.name ?? "" },
  });
  const onSubmit = (values: BranchFormValues) => {
    if (branch) {
      update({ id: branch.id, payload: values }, { onSuccess: () => setOpen(false) });
    } else {
      create(values, { onSuccess: () => { setOpen(false); form.reset(); } });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{branch ? "Edit Branch" : "New Branch"}</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Branch Name</FormLabel><FormControl><Input placeholder="Central Branch" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={creating || updating}>{creating || updating ? "Saving..." : "Save"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function BranchesPage() {
  const { data: branches = [], isLoading } = useGetBranches();
  const { mutate: deleteBranch, isPending: deleting } = useDeleteBranch();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Branches</h1>
        <BranchFormDialog trigger={<Button size="sm">New Branch</Button>} />
      </div>
      {isLoading ? <p className="text-sm text-gray-500">Loading...</p> : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Created</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center text-gray-400">No branches found.</TableCell></TableRow>
              ) : branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.id}</TableCell>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{new Date(branch.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <BranchFormDialog branch={branch} trigger={<Button size="sm" variant="outline">Edit</Button>} />
                      <DeleteConfirmDialog isPending={deleting} onConfirm={() => deleteBranch(branch.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
