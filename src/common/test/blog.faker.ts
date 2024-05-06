import { faker } from "@faker-js/faker"
import { BlogDto } from "src/modules/admin/blog/dto/blog.dto"
import { Status } from "../enums/all.enum"

export const getNewBlog = () => {
    const blogname = faker.commerce.productName()
    return {
        author: faker.person.fullName(),
        cover_image: null,
        feature_image: null,
        description: faker.lorem.paragraph(),
        publish_date: faker.date.anytime() as any,
        title: blogname,
        short_title: faker.commerce.productName(),
        slug: faker.helpers.slugify(blogname),
        sort: 0,
        status: Status.ACTIVE
    } as BlogDto
}