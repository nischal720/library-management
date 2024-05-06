import { Generator } from "../../../common/helpers/id.generator";
import { ResourceDto } from "../dto/resource.dto";

export class FileId {

    static getName(file: ResourceDto): string {
        const name = file.name?.substring(0, file.name?.lastIndexOf('.')) || file.name
        const oldName = this.getSlug(name ?? file.uid);
        return oldName + "-" + (Math.floor(Math.random() * 10000)).toString() + "." + this.getExtension(file.name);
    }

    static getTmpId(): string {
        return Generator.getId()
    }

    static getExtension(filename: string) {
        return filename.split('.').pop();
    }

    static getSlug(text: string) {
        let slug = "";
        // convert to lower case
        slug = text.toLowerCase();

        // remove special characters
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

        // replace spaces with dash symbols
        slug = slug.replace(/ /gi, "-");

        // remove consecutive dash symbols 
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');

        // remove the unwanted dash symbols at the beginning and the end of the slug
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return slug;
    }
}