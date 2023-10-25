export interface Item {
    id: number;
    name: string;
    image_url: string;
    collection_id: number;
    red: number;
    blue: number;
    green: number;
    quantity?: number;
    popularity?: number;
}
