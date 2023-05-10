import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class RemoveOrderService {
    async execute({ order_id }: OrderRequest) {

        //Verificar se foi informado um id.
        if (!order_id) {
            throw new Error('Informe uma mesa.');
        }

        //Verificar se esse id já está cadastrado na tabela Order.
        const orderAlreadyExists = await prismaClient.order.findFirst({
            where: {
                id: order_id
            }
        });

        if (!orderAlreadyExists) {
            throw new Error('id informado não existe.');
        }

        const orderAlreadyExistsItem = await prismaClient.item.findFirst({
            where:{
                order_id: order_id,
            },
        });

        if(orderAlreadyExistsItem){
            throw new Error('Não foi possível deletar a mesa, pois ela possui pedidos.');
        }

        const order = await prismaClient.order.delete({
            where: {
                id: order_id,
            }
        });

        return order;
    }
}

export { RemoveOrderService };