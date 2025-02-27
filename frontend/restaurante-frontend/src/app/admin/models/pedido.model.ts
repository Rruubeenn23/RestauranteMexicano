export interface Pedido {
  id: number;
  fecha_hora: string;   // ✅ Asegurarnos que existe en el modelo
  total: number;
  estado: string;
  direccion_envio?: string;   // ✅ Propiedad opcional
  cliente: number;  // ID del cliente (asociado al usuario)
  clienteNombre?: string;  // 🔥 Propiedad que añadiremos dinámicamente en el componente
}
