
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import Input from "./ui/input";
import Select from "./ui/select";
import { teamSchema } from "../schemas/team";
import { useTeamStore } from "../stores/team";

export default function ProjectForm() {
  const add = useTeamStore((s) => s.add);
  const [, navigate] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      role: "usuario",
    },
  });

  const onSubmit = (data) => {
    add(data);
    navigate("/usuarios");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-2xl border flex flex-col gap-4 h-fit"
    >
      <h1 className="font-black text-xl">Ingresar a jscream</h1>

      <Input
        label="Nombre"
        placeholder="Tu nombre"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="Mínimo 6 caracteres"
        error={errors.password?.message}
        {...register("password")}
      />

      <Select label="Rol" error={errors.role?.message} {...register("role")}>
        <option value="usuario">Usuario</option>
        <option value="admin">Admin</option>
      </Select>

      <button
        type="submit"
        className="py-2.5 rounded-lg bg-black text-white font-bold hover:opacity-90"
      >
        Ingresar
      </button>
    </form>
  );
}
