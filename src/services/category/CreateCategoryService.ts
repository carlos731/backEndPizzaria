import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({ name }: CategoryRequest){
        
        if(name === ''){
            throw new Error('Name invalid');
        }

        const category = await prismaClient.category.create({
            data:{
                name: name, 
            },
            select:{
                id: true,
                name: true,
                //created_at: true,
                //updated_at: true,
            }
        });

        return category;
    }
}

export { CreateCategoryService };