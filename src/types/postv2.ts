// Base interface
interface BaseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// Media interface
interface IMedia {
    type: string;
    url: string;
    thumbnailUrl?: string;
    description?: string;
    size: number;
    duration?: number;
}

// Location interface
interface ILocation {
    type: string;
    coordinates: number[];
    placeName: string;
    address?: string;
}

// EditLog interface
interface IEditLog {
    content: string;
    media: IMedia[];
    tags: string[];
    location?: ILocation;
    editedAt: Date;
}

// Post interface
interface IPost extends BaseModel {
    userId: string;
    content: string;
    media: IMedia[];
    reactionCounts: { [key: string]: number };
    commentCount: number;
    subPostCount: number;
    tags: string[];
    location?: ILocation;
    visibility: string;
    shareCount: number;
    viewCount: number;
    isEdited: boolean;
    editHistory: IEditLog[];
}

// SubPost interface
interface ISubPost extends BaseModel {
    parentId: string;
    userId: string;
    content: string;
    media: IMedia[];
    reactionCounts: { [key: string]: number };
    commentCount: number;
    order: number;
}

// SubPostInput interface
interface ISubPostInput {
    content: string;
    media?: IMedia[];
    order: number;
}