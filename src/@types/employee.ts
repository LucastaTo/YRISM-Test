export interface IPositionToolLanguageImage {
    id: number;
    cdnUrl: string;
    displayOrder: number;
}

export interface IPositionToolLanguage {
    id: number;
    toolLanguageResourceId: number;
    toolLanguageResourceName?: string
    displayOrder: number;
    from: number;
    to: number;
    description: string;
    images: IPositionToolLanguageImage[]
}

export interface IEmployeePosition {
    id: number;
    positionResourceId: number;
    positionResourceName?: string
    displayOrder: number;
    toolLanguages: IPositionToolLanguage[]
}

export interface IEmployee {
    id: number;
    name: string;
    positions: IEmployeePosition[]
}