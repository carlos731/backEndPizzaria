import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService{
    async execute({ order_id, product_id, amount}: ItemRequest){

        if(!order_id || !product_id || !amount){
            throw new Error("Prencha todos os campos.");
        }

        const orderAlreadyExists = await prismaClient.order.findFirst({
            where:{
                id: order_id,
            }
        });

        if(!orderAlreadyExists){
            throw new Error("A mesa informada não existe.");
        }

        const productAlreadyExists = await prismaClient.product.findFirst({
            where:{
                id: product_id,
            }
        });

        if(!productAlreadyExists){
            throw new Error("O produto informado não existe.");
        }

        const order = await prismaClient.item.create({
            data:{
                order_id: order_id,
                product_id: product_id,
                amount: amount,
            }
        });

        return order;

    }
}

export { AddItemService };