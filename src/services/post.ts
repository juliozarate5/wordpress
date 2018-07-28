/**
 * clase de atributos (modelo)
 */
export class Post{
    constructor(
        public id: number,
        public author: number, 
        public date: string, 
        public content: string,
        public title: string, 
        public status: string,
        public comment_status: string,
        public link: string, 
        public type: string,
        public name: string){
    }
}